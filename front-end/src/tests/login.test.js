import React from 'react';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../pages/login';

import renderWithRouterAndStore from './helpers/testConfig';

import {
  EMAIL_INPUT_TEST_ID,
  PASSWORD_INPUT_TEST_ID,
  VALID_EMAIL,
  VALID_PASSWORD,
  INVALID_EMAIL_0,
  INVALID_EMAIL_1,
  INVALID_EMAIL_2,
  INVALID_EMAIL_3,
  INVALID_PASSWORD,
  mockLoggedAdm,
  mockLoggedSeller,
  mockLoggedCustomer,
  INVALID_LOGIN_MSG_TEST_ID,
} from './helpers/constants';

jest.mock('axios');
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Login Page', () => {
  afterEach(() => jest.clearAllMocks());

  test('The user should be able to enter their email and password', () => {
    renderWithRouterAndStore(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('There should be a LOGIN button', () => {
    renderWithRouterAndStore(<Login />);

    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeInTheDocument();
  });

  test('There should be a register button', () => {
    renderWithRouterAndStore(<Login />);

    const button = screen.getByRole('button', { name: /ainda não tenho conta/i });
    expect(button).toBeInTheDocument();
  });

  test('Realize as seguintes verificações nos campos de email, password e botão:', () => {
    renderWithRouterAndStore(<Login />);

    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeDisabled();

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, INVALID_EMAIL_0);
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);

    userEvent.type(email, INVALID_EMAIL_1);
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);

    userEvent.type(email, INVALID_EMAIL_2);
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, INVALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);

    userEvent.type(email, INVALID_EMAIL_3);
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });
});

describe('Login Complete Flow', () => {
  describe('on success', () => {
    const payloadMock = {
      status: 200,
      data: jest.fn(),
    };
    beforeEach(() => {
      axios.post.mockResolvedValueOnce(payloadMock);
    });

    it('should return the correct payload', async () => {
      renderWithRouterAndStore(<Login />);
      const button = screen.getByRole('button', { name: /login/i });

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
      userEvent.click(button);

      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/login', { email: VALID_EMAIL, password: VALID_PASSWORD });
    });
  });

  describe('on failure', () => {
    const payloadMock = { response: {
      status: 404,
    } };
    it('should load an error message', async () => {
      axios.post.mockRejectedValueOnce(payloadMock);
      renderWithRouterAndStore(<Login />);
      const button = screen.getByRole('button', { name: /login/i });

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
      userEvent.click(button);

      await waitFor(() => expect(axios.post).toHaveBeenCalled());

      expect(screen.getByTestId(INVALID_LOGIN_MSG_TEST_ID)).toBeInTheDocument();
    });
  });

  describe('logged as administrator', () => {
    const payloadMock = {
      status: 200,
      data: mockLoggedAdm,
    };
    beforeEach(() => {
      axios.post.mockResolvedValueOnce(payloadMock);
    });

    it('should redirect to the /admin/manage page', async () => {
      renderWithRouterAndStore(<Login />);
      const button = screen.getByRole('button', { name: /login/i });

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
      userEvent.click(button);

      await waitFor(() => expect(axios.post).toHaveBeenCalled());

      expect(navigate).toHaveBeenCalledWith('/admin/manage');
    });
  });

  describe('logged as seller', () => {
    const payloadMock = {
      status: 200,
      data: mockLoggedSeller,
    };
    beforeEach(() => {
      axios.post.mockResolvedValueOnce(payloadMock);
    });

    it('should redirect to the /seller/orders page', async () => {
      renderWithRouterAndStore(<Login />);
      const button = screen.getByRole('button', { name: /login/i });

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
      userEvent.click(button);

      await waitFor(() => expect(axios.post).toHaveBeenCalled());

      expect(navigate).toHaveBeenCalledWith('/seller/orders');
    });
  });

  describe('logged as customer', () => {
    const payloadMock = {
      status: 200,
      data: mockLoggedCustomer,
    };
    beforeEach(() => {
      axios.post.mockResolvedValueOnce(payloadMock);
    });

    it('should redirect to the /customer/products page', async () => {
      renderWithRouterAndStore(<Login />);
      const button = screen.getByRole('button', { name: /login/i });

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
      userEvent.click(button);

      await waitFor(() => expect(axios.post).toHaveBeenCalled());

      expect(navigate).toHaveBeenCalledWith('/customer/products');
    });
  });
});
