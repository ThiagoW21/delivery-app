import { Button, Container, Grid, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import status from 'http-status';
import logoImg from '../logoImg.png';

function LoginForm() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [loginFail, setLoginFail] = useState(false);

  const validateForm = () => {
    const { email, password } = loginForm;
    const minPassLength = 6;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return !(password.length >= minPassLength && email.match(validEmail));
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`http://${process.env.REACT_APP_HOSTNAME}/login`, loginForm);
      localStorage.setItem('user', JSON.stringify(data));
      switch (data.role) {
      case 'administrator':
        navigate('/admin/manage');
        break;
      case 'seller':
        navigate('/seller/orders');
        break;
      default:
        navigate('/customer/products');
        break;
      }
    } catch (error) {
      if (error.response.status === status.NOT_FOUND) {
        setLoginFail(true);
      }
    }
  };

  return (
    <Container
      sx={ {
        display: 'flex',
        justify: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginRight: '200px',
        height: '100%',
      } }
    >
      <Box
        component="img"
        src={ logoImg }
        alt="logo grupo 2"
        sx={ {
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        } }
      />
      <Grid
        sx={ {
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          direction: 'row',
        } }
        container
        className="MuiGrid-direction-xs-column"
      >
        <Grid item>
          <TextField
            name="email"
            value={ loginForm.email }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'common_login__input-email' } }
            label="Email"
          />
        </Grid>
        <Grid
          item
          sx={ {
            marginTop: '8px',
          } }
        >
          <TextField
            name="password"
            type="password"
            value={ loginForm.password }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'common_login__input-password' } }
            label="Senha"
          />
        </Grid>
        <Grid item xs="auto">
          <Button
            data-testid="common_login__button-login"
            sx={ {
              display: 'flex',
              width: '240px',
              padding: '10px 40px',
              fontWeight: '600',
              marginRight: '2px',
              marginTop: '7px',
            } }
            variant="contained"
            disabled={ validateForm() }
            onClick={ handleLogin }
          >
            LOGIN
          </Button>
        </Grid>
        <Grid item>
          {loginFail
          && (
            <span data-testid="common_login__element-invalid-email">
              Usuário ou senha inválidos
            </span>)}
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;
