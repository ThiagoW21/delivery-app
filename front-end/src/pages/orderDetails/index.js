import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import api from '../../utils/api';
import detTableHeaders from './components/helpers';

const IN_TRANSIT = 'Em Trânsito';

function Orders() {
  const [buttonCheckDisable, setButtonCheckDisable] = useState(false);
  const [role, setRole] = useState();

  const [data, setData] = useState(false);

  const { pathname } = window.location;
  const id = pathname[pathname.length - 1];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setRole(user.role);

    async function getOrderDetails() {
      const orderDetails = await api('get', `/sales/${id}`);
      const inTransit = orderDetails.data.status === IN_TRANSIT;
      const delivered = orderDetails.data.status === 'Entregue';
      const pending = orderDetails.data.status === 'Pendente';

      setData(orderDetails.data);

      if (user.role === 'customer') {
        setButtonCheckDisable(!inTransit);
      } else {
        setButtonCheckDisable(pending || delivered || inTransit);
      }
    }

    getOrderDetails();
  }, []);

  async function handleOrder(status = null) {
    await api('patch', `/sales/${id}`, { status });

    const newData = { ...orderDetails, status };

    setData(newData);
  }

  return (
    <>
      <Typography
        sx={ {
          marginX: 45,
          fontWeight: 500,
          fontSize: '36px',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '80px',
          paddingBottom: '20px',
        } }
      >
        Detalhes do Pedido
      </Typography>
      <Container
        sx={ {
          border: 1,
          borderRadius: '5px',
          paddingBottom: '10px',
          borderColor: 'whitesmoke',
          height: '72vh',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        } }
      >
        <Grid
          sx={ { display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'space-between',
            padding: '20px',
            backgroundColor: '#EAF1EF',
            border: 0,
            boxShadow: 'none',
          } }
          container
          component={ Paper }
        >
          <Grid
            item
            sx={ {
              fontWeight: 700,
              fontSize: 22,
              display: 'flex',
              alignItems: 'center',
            } }
            data-testid={
              `${role}_order_details__element-order-details-label-order-id`
            }
          >
            { `PEDIDO ${data.id}` }
          </Grid>
          {
            role === 'customer' && (
              <Grid
                item
                align="right"
                data-testid={ 'customer_order_details__element'
                    + '-order-details-label-seller-name' }
                sx={ {
                  fontSize: 20,
                  display: 'flex',
                  alignItems: 'left',
                } }
              >
                { `P. Vendedora: ${data.sellerName}` }
              </Grid>
            )
          }
          <Grid
            item
            sx={ {
              fontSize: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            } }
            data-testid={
              `${role}_order_details__element-order-details-label-order-date`
            }
          >
            Data:
            {' '}
            { moment(data.saleDate).format('DD/MM/YYYY')}
          </Grid>
          <Grid
            item
            sx={ {
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 540,
              backgroundColor: data.status === 'Entregue'
                ? 'rgba(0, 204, 155, 0.75)'
                : 'rgba(204, 184, 0, 0.75)',
              borderRadius: '5px',
              padding: '10px',
            } }
            data-testid={
              `${role}_order_details__element-order-details-label-delivery-status`
            }
          >
            { data?.status?.toUpperCase() }
          </Grid>
          { role === 'seller'
                  && (
                    <Grid item align="right">
                      <Button
                        variant="contained"
                        color="success"
                        sx={ { fontSize: 18, backgroundColor: '#2FC18C' } }
                        onClick={ () => handleOrder('Preparando') }
                        data-testid="seller_order_details__button-preparing-check"
                        disabled={ data.status !== 'Pendente' }
                      >
                        PREPARAR PEDIDO
                      </Button>
                    </Grid>
                  )}
          { data
                && (
                  <Grid
                    item
                    align="right"
                  >
                    <Button
                      variant="contained"
                      color="success"
                      sx={ { fontSize: 18 } }
                      data-testid={ `${role}_order_details__button-${
                        role === 'seller' ? 'dispatch' : 'delivery'}-check` }
                      onClick={ () => handleOrder(role === 'seller'
                        ? IN_TRANSIT : 'Entregue') }
                      disabled={ buttonCheckDisable }
                    >
                      { role === 'seller' ? 'SAIU PARA ENTREGA' : 'MARCAR COMO ENTREGUE'}
                    </Button>
                  </Grid>
                )}
        </Grid>
        <TableContainer
          sx={ {
            display: 'flex',
            flexDirection: 'column',
          } }
          container
          component={ Paper }
        >
          <Table
            sx={ {
              minWidth: 650,
            } }
            size="large"
            aria-label="a product table"
          >
            <TableHead>
              <TableRow>
                {detTableHeaders.map((title) => (
                  <TableCell
                    key={ title }
                    align="center"
                    sx={ {
                      fontSize: '20px',
                      fontWeight: 550,
                    } }
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.salesProducts && data.salesProducts.map((row, i) => (
                <TableRow
                  key={ i }
                  sx={ {
                    border: 0,
                    borderStartEndRadius: '5px',
                  } }
                >
                  <TableCell
                    component="td"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#2FC18C',
                    } }
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell
                    data-testid={ `seller_order_details__element-order-table-name-${i}` }
                    component="td"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#EAF1EF',
                    } }
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    data-testid={
                      `seller_order_details__element-order-table-quantity-${i}`
                    }
                    component="td"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#036B52',
                      color: 'white',
                    } }
                  >
                    {row.quantity}
                  </TableCell>
                  <TableCell
                    data-testid={
                      `seller_order_details__element-order-table-unit-price-${i}`
                    }
                    component="td"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#421981',
                      color: 'white',
                    } }
                  >
                    {parseFloat(row.price).toFixed(2).replace('.', ',')}
                  </TableCell>
                  <TableCell
                    data-testid={
                      `seller_order_details__element-order-table-sub-total-${i}`
                    }
                    component="td"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#056CF9',
                      color: 'white',
                    } }
                  >
                    {parseFloat((row.price * row.quantity)).toFixed(2).replace('.', ',')}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow />
            </TableBody>
          </Table>
        </TableContainer>
        <TableCell
          data-testid={ `${role}_order_details__element-order-total-price` }
          sx={ { position: 'relative',
            bottom: -230,
            left: 960,
            backgroundColor: '#036B52',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',
            borderRadius: '5px',
          } }
        >
          {'TOTAL: R$ '}
          { parseFloat(data.totalPrice).toFixed(2).replace('.', ',')}
        </TableCell>
      </Container>
    </>
  );
}

export default Orders;
