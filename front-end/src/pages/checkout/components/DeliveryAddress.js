import { Button, Grid, TextField, Select, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { calcTotalPrice, clearCart, getCart } from '../../../utils/localStorage';
import api from '../../../utils/api'

function DeliveryAddress() {
  const navigate = useNavigate();
  const [detailsForm, setDetailsForm] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
    sellerId: '',
  });

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const getSellers = async () => {
      const { data } = await api('get', '/user/sellers');
      setSellers(data);
      setDetailsForm({ ...detailsForm, sellerId: data[0].id });
    };
    getSellers();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setDetailsForm({ ...detailsForm, [name]: value });
  };

  const handleSetSale = async () => {
    const cart = getCart();
    const products = cart.map(({ id, quantity }) => ({ productId: id, quantity }));
    const { data } = await api('post', '/sales', { ...detailsForm, products, totalPrice: calcTotalPrice() })
    clearCart();
    navigate(`/customer/orders/${data.saleId}`);
  };

  return (
    <Grid
      container
      sx={ {
        flexDirection: 'colunm',
        justifyContent: 'center',
      } }
    >
      <Typography
        sx={ {
          marginY: '50px',
          fontWeight: 500,
          fontSize: '36px',
          display: 'flex',
          alignItems: 'center',
          justifySelf: 'left',
          width: '100%',
          textAlign: 'left',
        } }
      >
        Detalhes e Endereço para Entrega
      </Typography>
      <Grid
        sx={ {
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '3px',
          width: '100%',
        } }
        container
      >
        <Grid
          item
          sx={ {
            marginRight: '10px',
          } }
        >
          <Select
            data-testid="customer_checkout__select-seller"
            name="sellerId"
            value={ detailsForm.sellerId }
            onChange={ handleChange }

          >
            {!!sellers.length && sellers.map(({ id, name }) => (
              <MenuItem key={ name } name="sellerId" value={ id }>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid
          item
          sx={ {
            marginRight: '10px',
            width: '60%',
          } }
        >
          <TextField
            name="deliveryAddress"
            value={ detailsForm.deliveryAddress }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'customer_checkout__input-address' } }
            label="Endereço"
            fullWidth
          />
        </Grid>
        <Grid
          item
          sx={ {
            marginRight: '10px',
          } }
        >
          <TextField
            name="deliveryNumber"
            value={ detailsForm.deliveryNumber }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'customer_checkout__input-address-number' } }
            label="Número"
          />
        </Grid>
      </Grid>
      <Grid
        sx={ {
          alignSelf: 'center',
        } }
        item
      >
        <Button
          color="success"
          data-testid="customer_checkout__button-submit-order"
          sx={ {
            marginTop: '30px',
            padding: '12px 80px',
            fontWeight: '600',
            backgroundColor: 'green',
            justifySelf: 'center',
            fontSize: '20px',
          } }
          variant="contained"
          onClick={ handleSetSale }
        >
          FINALIZAR PEDIDO
        </Button>
      </Grid>
    </Grid>

  );
}

export default DeliveryAddress;
