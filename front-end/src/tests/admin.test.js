import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import AdminManage from '../pages/admin';
import { tableHeaders } from '../pages/admin/helpers';

import renderWithRouterAndStore from './helpers/testConfig';

import {
  ADM_EMAIL_INPUT_TEST_ID,
  ADM_PASSWORD_INPUT_TEST_ID,
  ADM_NAME_INPUT_TEST_ID,
  ADM_ROLE_SELECT_TEST_ID,
  VALID_EMAIL,
  VALID_PASSWORD,
  INVALID_EMAIL_0,
  INVALID_EMAIL_1,
  INVALID_EMAIL_2,
  INVALID_PASSWORD,
  VALID_NAME,
  INVALID_NAME,
  INVALID_ADM_REGISTER_MSG_TEST_ID,
  mockLoggedCustomer,
  mockLoggedAdm,
  mockLoggedSeller,
  ADM_ROW_CELL_TEST_ID,
  ADM_DELETE_BTN_TEST_ID,
} from './helpers/constants';

jest.mock('axios');

afterEach(() => jest.clearAllMocks());

describe('Admin Page', () => {
  test('The admin should be able to enter name, email, role and password', () => {
    renderWithRouterAndStore(<AdminManage />);
    const email = screen.getByTestId(ADM_EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(ADM_PASSWORD_INPUT_TEST_ID);
    const name = screen.getByTestId(ADM_NAME_INPUT_TEST_ID);
    const role = screen.getByTestId(ADM_ROLE_SELECT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });

  test('There should be a register button', () => {
    renderWithRouterAndStore(<AdminManage />);

    const button = screen.getByRole('button', { name: /CADASTRAR/i });
    expect(button).toBeInTheDocument();
  });

  test('Disable/enable register btn', () => {
    renderWithRouterAndStore(<AdminManage />);

    const button = screen.getByRole('button', { name: /CADASTRAR/i });
    expect(button).toBeDisabled();

    const email = screen.getByTestId(ADM_EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(ADM_PASSWORD_INPUT_TEST_ID);
    const name = screen.getByTestId(ADM_NAME_INPUT_TEST_ID);

    userEvent.type(email, INVALID_EMAIL_0);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.clear(name);

    userEvent.type(email, INVALID_EMAIL_1);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.clear(name);

    userEvent.type(email, INVALID_EMAIL_2);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.clear(name);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, INVALID_PASSWORD);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.clear(name);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.type(name, INVALID_NAME);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.clear(name);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeEnabled();
  });
  test('Table headers', () => {
    renderWithRouterAndStore(<AdminManage />);
    tableHeaders.forEach((header) => {
      expect(screen.getByRole('rowheader', { name: header })).toBeInTheDocument();
    });
  });
  test('Table row', () => {
    renderWithRouterAndStore(<AdminManage />);
    expect(screen.getAllByRole('rowgroup')).toHaveLength(2);
  });
});

describe('Registration Complete Flow', () => {
  describe('on success', () => {
    const payloadMock = {
      status: 200,
      data: jest.fn(),
    };

    it('should return the correct payload', async () => {
      axios.post.mockResolvedValueOnce(payloadMock);
      axios.get.mockResolvedValue({
        status: 200,
        data: [mockLoggedAdm, mockLoggedSeller, mockLoggedCustomer],
      });
      renderWithRouterAndStore(<AdminManage />);
      const button = screen.getByRole('button', { name: /cadastrar/i });

      const email = screen.getByTestId(ADM_EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(ADM_PASSWORD_INPUT_TEST_ID);
      const name = screen.getByTestId(ADM_NAME_INPUT_TEST_ID);

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
      userEvent.type(name, VALID_NAME);
      userEvent.click(button);

      expect(axios.post).toHaveBeenCalled();
    });
  });

  describe('on failure', () => {
    const payloadMock = { response: {
      status: 409,
    } };
    it('should load an error message', async () => {
      axios.post.mockRejectedValueOnce(payloadMock);
      renderWithRouterAndStore(<AdminManage />);
      const button = screen.getByRole('button', { name: /cadastrar/i });

      const email = screen.getByTestId(ADM_EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(ADM_PASSWORD_INPUT_TEST_ID);
      const name = screen.getByTestId(ADM_NAME_INPUT_TEST_ID);

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
      userEvent.type(name, VALID_NAME);
      userEvent.click(button);

      await waitFor(() => expect(axios.post).toHaveBeenCalled());

      expect(screen.getByTestId(INVALID_ADM_REGISTER_MSG_TEST_ID)).toBeInTheDocument();
    });
  });

  describe('Table rows', () => {
    jest.clearAllMocks();
    const payloadMock = {
      status: 200,
      data: [mockLoggedAdm, mockLoggedSeller, mockLoggedCustomer],
    };
    beforeEach(() => {
      axios.get.mockResolvedValueOnce(payloadMock);
    });

    it('should render users on the table', async () => {
      renderWithRouterAndStore(<AdminManage />);
      await waitFor(() => expect(axios.get).toHaveBeenCalled());

      expect(screen.getByTestId(ADM_ROW_CELL_TEST_ID)).toBeInTheDocument();
    });
  });
});

describe('Deleting one user', () => {
  jest.clearAllMocks();
  const payloadMock = {
    status: 201,
  };

  it('should return the correct payload', async () => {
    axios.delete.mockResolvedValueOnce(payloadMock);
    axios.get.mockResolvedValue({
      status: 200,
      data: [mockLoggedAdm, mockLoggedSeller, mockLoggedCustomer],
    });
    renderWithRouterAndStore(<AdminManage />);
    const button = await screen.findByTestId(ADM_DELETE_BTN_TEST_ID);
    userEvent.click(button);

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3001/user', { data: { source: VALID_EMAIL } });
  });
});
