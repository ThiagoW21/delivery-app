import { Container } from '@mui/material';
import React from 'react';
import UserRegisterForm from './components/UserRegisterForm';
import UsersTable from './components/UsersTable';

function AdminManage() {
  return (
    <Container
      container
      sx={ {
        paddingTop: '100px',
        height: '100vh',
      } }
    >
      <UserRegisterForm item />
      <UsersTable
        item
        sx={ {
          alignItems: 'center',
          justifyContent: 'center',
        } }
      />
    </Container>
  );
}

export default AdminManage;
