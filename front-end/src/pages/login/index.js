import { Button, Container, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';

function Login() {
  const navigate = useNavigate();
  return (
    <Container
      sx={ {
        direction: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        paddingTop: '200px',
      } }
    >
      <Grid
        sx={ {
          direction: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        } }
        container
        className="MuiGrid-direction-xs-column"
      >

        <Grid item xs={ 3 }>
          <LoginForm />
          <Button
            color="success"
            data-testid="common_login__button-register"
            sx={ {
              marginLeft: '24px',
              padding: '10px 0',
              fontWeight: '600',
              marginRight: '24px',
              width: 'calc(100% - 44px)',
              marginTop: '7px',
              backgroundColor: '#036B52',
            } }
            variant="contained"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho conta
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
