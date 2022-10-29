import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import status from 'http-status';
import api from '../../utils/api';

function Register() {
  const navigate = useNavigate();

  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [registerFail, setRegisterFail] = useState(false);

  const validateForm = () => {
    const { email, password, name } = registrationForm;
    const minPassLength = 6;
    const minNameLength = 12;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return !(password.length >= minPassLength
    && email.match(validEmail)
    && name.length >= minNameLength);
  };

  const handleChange = ({ target: { name, value } }) => {
    setRegistrationForm({ ...registrationForm, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const { data } = await api('post', '/user', registrationForm);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/customer/products');
    } catch (error) {
      if (error.response.status === status.CONFLICT) {
        setRegisterFail(true);
      }
    }
  };

  return (
    <Container>
      <Grid
        sx={ {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        } }
        container
        className="MuiGrid-direction-xs-column"
      >
        <Typography
          sx={ {
            fontWeight: 500,
            fontSize: '34px',
            paddingBottom: '40px',
            textAlign: 'center',
          } }
          className="title"
        >
          Cadastro

        </Typography>
        <Grid item>
          <TextField
            name="name"
            value={ registrationForm.name }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'common_register__input-name' } }
            label="Nome"
          />
        </Grid>
        <Grid item sx={ { marginTop: '8px' } }>
          <TextField
            name="email"
            value={ registrationForm.email }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'common_register__input-email' } }
            label="Email"
          />
        </Grid>
        <Grid item sx={ { marginTop: '8px' } }>
          <TextField
            name="password"
            type="password"
            value={ registrationForm.password }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'common_register__input-password' } }
            label="Senha"
          />
        </Grid>
        <Grid item>
          <Button
            color="success"
            data-testid="common_register__button-register"
            sx={ {
              padding: '12px',
              fontWeight: '600',
              marginTop: '10px',
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
            <span data-testid="common_register__element-invalid_register">
              Usuário já cadastrado
            </span>)}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
