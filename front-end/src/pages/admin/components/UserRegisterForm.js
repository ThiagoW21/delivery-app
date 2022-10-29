import { Button, Container, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import status from 'http-status';
import { useDispatch } from 'react-redux';
import { userTypes } from '../helpers';
import { fetchUsers } from '../../../redux/actions';
import '../style/UserRegister.css';

function UserRegisterForm() {
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [registerFail, setRegisterFail] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    const { email, password, name } = newUserForm;
    const minPassLength = 6;
    const minNameLength = 12;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return !(password.length >= minPassLength
    && email.match(validEmail)
    && name.length >= minNameLength);
  };

  const handleChange = ({ target: { name, value } }) => {
    setNewUserForm({ ...newUserForm, [name]: value });
  };

  const handleRegister = async () => {
    const localUser = JSON.parse(localStorage.getItem('user')) || '';
    try {
      await axios.post(`http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}/user/admin`, { ...newUserForm, logged: localUser.role }, {
        headers: {
          authorization: localUser.token,
        },
      });
      dispatch(fetchUsers());
    } catch (error) {
      if (error.response.status === status.CONFLICT) {
        setRegisterFail(true);
      }
    }
  };

  return (
    <Container
      sx={ {
        width: '100%',
      } }
    >
      <Typography
        sx={ {
          fontWeight: 500,
          fontSize: '36px',
          display: 'flex',
          alignItems: 'center',
          justifySelf: 'left',
          width: '100%',
          textAlign: 'left',
          paddingTop: '40px',
        } }
        className="title"
      >
        Cadastrar novo usuário

      </Typography>
      <Grid
        className="registerUser"
        sx={ { alignItems: 'center',
          justifyContent: 'center',
          minHeight: '20vh',
          width: '100%',
        } }
        container
      >
        <Grid item sx={ { marginRight: '8px' } }>
          <TextField
            name="name"
            value={ newUserForm.name }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'admin_manage__input-name' } }
            label="Nome"
          />
        </Grid>
        <Grid item sx={ { marginRight: '8px' } }>
          <TextField
            name="email"
            value={ newUserForm.email }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'admin_manage__input-email' } }
            label="Email"
          />
        </Grid>
        <Grid item sx={ { marginRight: '8px' } }>
          <TextField
            name="password"
            value={ newUserForm.password }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'admin_manage__input-password' } }
            label="Senha"
          />
        </Grid>
        <Grid item sx={ { marginRight: '8px' } }>
          <Select
            className="role"
            data-testid="admin_manage__select-role"
            name="role"
            value={ newUserForm.role }
            onChange={ handleChange }
          >
            {userTypes.map(({ value, label }) => (
              <MenuItem key={ value } name="role" value={ value }>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Button
            className="buttonCadastrar"
            color="success"
            data-testid="admin_manage__button-register"
            sx={ {
              marginLeft: '14px',
              padding: '12px',
              fontWeight: '600',
              marginRight: '14px',
              backgroundColor: '#036B52',
            } }
            variant="contained"
            disabled={ validateForm() }
            onClick={ handleRegister }
          >
            CADASTRAR
          </Button>
        </Grid>
        <Grid item>
          {registerFail
          && (
            <span data-testid="admin_manage__element-invalid-register">
              Usuário já cadastrado
            </span>)}
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserRegisterForm;
