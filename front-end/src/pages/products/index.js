import React, { useEffect, useState } from 'react';
import { Box, Container, Fab, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import ProductCard from '../../components/ProductCard';
import { calcTotalPrice } from '../../utils/localStorage';
import './index.css';

function Products() {
  const navigate = useNavigate();
  const [price, setPrice] = useState();

  const data = useFetch('get', '/products', 'SET_PRODUCTS');
  const totalPrice = useSelector((state) => state.products.totalPrice);

  useEffect(() => {
    setPrice(calcTotalPrice());
  }, [totalPrice]);

  return (
    <Container className="main">
      <Box sx={ { '& > :not(style)': { m: 1 } } }>
        <Fab
          variant="extended"
          disabled={ !price }
          data-testid="customer_products__button-cart"
          sx={ { position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#036B52',
            color: 'white',
            fontWeight: 'bold',
          } }
          onClick={ () => navigate('/customer/checkout') }
        >
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {'R$ '}
            { parseFloat(price).toFixed(2).replace('.', ',') }

          </span>

        </Fab>
      </Box>
      <Grid
        container
        columns={ { xs: 2, sm: 8, md: 7 } }
        sx={ { alignItems: 'center', justifyContent: 'start' } }
      >
        {
          data && data.map((product, i) => <ProductCard product={ product } key={ i } />)
        }
      </Grid>
    </Container>
  );
}

export default Products;
