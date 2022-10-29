import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const { name, role } = JSON.parse(user);

      setUserName(name);
      setUserRole(role);
    }
  }, [location.pathname]);

  const logoutUser = () => {
    localStorage.removeItem('user');

    navigate('/');
  };

  return (
    <Box sx={ { width: '100vh' } }>
      <AppBar sx={ { backgroundColor: '#036B52' } }>
        <Toolbar sx={ { mx: -3 } }>
          { userRole === 'customer'
            && (
              <Box
                component="div"
                data-testid="customer_products__element-navbar-link-products"
                justifyContent="center"
                alignItems="center"
                onClick={ () => navigate('/customer/products') }
                sx={ {
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: location.pathname === '/customer/products' ? '#2FC18C' : '#036B52',
                  height: '65px',
                  width: '200px',
                  display: 'flex',
                  color: location.pathname === '/customer/products' ? 'black' : 'white',
                } }
              >
                PRODUTOS
              </Box>
            )}
          <Box
            component="div"
            justifyContent="center"
            alignItems="center"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => navigate(`/${userRole}/orders`) }
            sx={ {
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: location.pathname === `/${userRole}/orders` ? '#2FC18C' : '#036B52',
              height: '65px',
              width: '200px',
              display: 'flex',
              cursor: 'pointer',
              color: [`/${userRole}/orders`].includes(location.pathname) ? 'black' : 'white',
            } }
          >
            MEUS PEDIDOS
          </Box>

          <Typography sx={ { flexGrow: 1 } } />

          <Box
            component="div"
            data-testid="customer_products__element-navbar-user-full-name"
            justifyContent="center"
            alignItems="center"
            sx={ {
              fontSize: '21px',
              backgroundColor: '#421981',
              height: '65px',
              width: '230px',
              display: 'flex',
            } }
          >
            { userName }
          </Box>
          <Box
            component="div"
            data-testid="customer_products__element-navbar-link-logout"
            justifyContent="center"
            alignItems="center"
            onClick={ logoutUser }
            sx={ {
              fontSize: '20px',
              backgroundColor: '#056CF9',
              height: '65px',
              width: '120px',
              display: 'flex',
              cursor: 'pointer',
            } }
          >
            Sair
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ResponsiveAppBar;
