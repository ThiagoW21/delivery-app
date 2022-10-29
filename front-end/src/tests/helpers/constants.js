export const EMAIL_INPUT_TEST_ID = 'common_login__input-email';
export const PASSWORD_INPUT_TEST_ID = 'common_login__input-password';
export const VALID_EMAIL = 'alguem@email.com';
export const VALID_PASSWORD = '123456';
export const INVALID_EMAIL_0 = 'email';
export const INVALID_EMAIL_1 = 'email@com@';
export const INVALID_EMAIL_2 = 'emailcom@';
export const INVALID_EMAIL_3 = 'alguem@email.';
export const INVALID_PASSWORD = '23456';
export const VALID_NAME = 'Fulaninha De Tal';
export const INVALID_NAME = 'Fulana';
export const ADM_NAME_INPUT_TEST_ID = 'admin_manage__input-name';
export const ADM_EMAIL_INPUT_TEST_ID = 'admin_manage__input-email';
export const ADM_PASSWORD_INPUT_TEST_ID = 'admin_manage__input-password';
export const ADM_ROLE_SELECT_TEST_ID = 'admin_manage__select-role';
export const INVALID_LOGIN_MSG_TEST_ID = 'common_login__element-invalid-email';
export const INVALID_ADM_REGISTER_MSG_TEST_ID = 'admin_manage__element-invalid-register';
export const ADM_ROW_CELL_TEST_ID = 'admin_manage__element-user-table-item-number-0';
export const ADM_DELETE_BTN_TEST_ID = 'admin_manage__element-user-table-remove-0';
export const mockLoggedAdm = {
  id: 7,
  name: VALID_NAME,
  email: VALID_EMAIL,
  role: 'administrator',
};
export const mockLoggedSeller = {
  id: 7,
  name: VALID_NAME,
  email: VALID_EMAIL,
  role: 'seller',
};

export const mockLoggedCustomer = {
  id: 7,
  name: VALID_NAME,
  email: VALID_EMAIL,
  role: 'customer',
};
