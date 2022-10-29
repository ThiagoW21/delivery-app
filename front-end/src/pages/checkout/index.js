import { Container, Grid } from '@mui/material';
import React from 'react';
import DeliveryAddress from './components/DeliveryAddress';
import ProductsTable from './components/ProductsTable';

function Checkout() {
  return (
    <Container
      sx={ {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '100px',
      } }
    >
      <Grid
        container
      >
        <ProductsTable />
        <DeliveryAddress />
      </Grid>

    </Container>
  );
}

export default Checkout;
