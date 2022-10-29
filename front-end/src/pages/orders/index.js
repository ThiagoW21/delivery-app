import {
  CardActionArea, CardContent, Container, Grid, Typography
} from '@mui/material';
import Card from '@mui/material/Card';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './index.css';

function Orders() {
  const navigate = useNavigate();

  const data = useFetch('get', '/sales');

  const { role } = JSON.parse(localStorage.getItem('user'));

  function getStatusColor(order) {
    switch (order.status) {
    case 'Entregue':
      return 'rgba(0, 204, 155, 0.75);;';
    case 'Preparando':
      return 'rgba(102, 204, 0, 0.75);;';
    default:
      return 'rgba(204, 184, 0, 0.75);';
    }
  }

  function renderCard(order) {
    return (
      <Grid
        sx={ {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',

        } }
        item
      >
        <CardActionArea>
          <Card
            variant="outlined"
            sx={ {
              display: 'flex',
              direction: 'row',
              height: 190,
              width: 440,
              marginBottom: 5,
              marginLeft: 4,
              boxShadow: '4px 4px 5px lightgrey',
            } }
            key={ order.id }
            id={ order.id }
            onClick={ () => navigate(`/${role}/orders/${order.id}`) }
          >
            <CardContent
              sx={ { display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' } }
            >
              <Typography
                sx={ { fontSize: 20 } }
                data-testid={ `${role}_orders__element-order-id-${order.id}` }
                color="text.primary"
              >
                { `Pedido ${order.id}` }
              </Typography>
              <Typography
                sx={ {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px 10px 40px 10px',
                  borderRadius: '7%',
                  width: '130px',
                  margin: '10px',
                  fontSize: 23,
                  fontWeight: 600,
                  backgroundColor: getStatusColor(order),
                } }
                color="text.secondary"
                gutterBottom
              >
                <span
                  className="orderStatus"
                  data-testid={ `${role}_orders__element-delivery-status-${order.id}` }
                >
                  { order.status }
                </span>
              </Typography>
              <Grid
                item
                sx={ {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'start',
                } }
              >
                <Typography
                  sx={ { fontSize: 14 } }
                  color="text.secondary"
                  gutterBottom

                >
                  <span
                    className="saleDate"
                    data-testid={ `${role}_orders__element-order-date-${order.id}` }
                  >
                    {' '}
                    { moment(order.saleDate).format('DD/MM/YYYY') }
                  </span>

                </Typography>
                <Typography
                  sx={ { fontSize: 17, fontWeight: 600 } }
                  color="text.secondary"
                  gutterBottom
                >
                  R$
                  {' '}
                  <span
                    className="saleDate"
                    data-testid={ `${role}_orders__element-card-price-${order.id}` }
                  >
                    { parseFloat(order.totalPrice).toFixed(2).replace('.', ',') }
                  </span>
                </Typography>
                <Typography
                  className="addresStyle"
                  sx={ { fontSize: 14 } }
                  color="text.secondary"
                  gutterBottom
                >
                  <span data-testid={ `${role}_orders__element-card-address-${order.id}` }>
                    { order.deliveryAddress }
                  </span>
                </Typography>
                <Typography
                  className="addresStyle"
                  sx={ { fontSize: 14 } }
                  color="text.secondary"
                  gutterBottom
                >
                  { order.deliveryNumber }
                </Typography>
              </Grid>

            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>

    );
  }

  return (
    <Container
      sx={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
      } }
      maxWidth="sm"
      data-testid="customer_checkout__select-seller"
    >
      {
        data.map((order) => renderCard(order))
      }

    </Container>
  );
}

export default Orders;
