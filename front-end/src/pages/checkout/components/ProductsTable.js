import { Button, Grid,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { calcTotalPrice, getCart, removeProductCart } from '../../../utils/localStorage';
import { tableHeaders } from '../helpers';

function ProductsTable() {
  const [products, setProducts] = useState([]);

  const handleCartItems = () => getCart().map((item) => ({
    ...item,
    subTotal: Number(item.price) * Number(item.quantity),
  }));

  useEffect(() => {
    const cartItems = handleCartItems();
    setProducts(cartItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = ({ currentTarget: { name } }) => {
    removeProductCart(name);
    setProducts(handleCartItems());
  };

  return (
    <Grid container flexDirection="row">
      <Typography
        sx={ {
          marginY: 5,
          marginBottom: 10,
          fontWeight: 500,
          fontSize: '36px',
          display: 'flex',
          alignItems: 'center',
        } }
      >
        Detalhes do Pedido
      </Typography>
      <TableContainer>
        <Table sx={ { minWidth: 650 } } size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((head) => (
                <TableCell
                  key={ head }
                  component="th"
                  align="center"
                  sx={ {
                    fontSize: '20px',
                    fontWeight: 550,
                  } }
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!products.length && products
              .map(({ id, name, quantity, price, subTotal }, index) => (
                <TableRow
                  key={ id }
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
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    component="td"
                    align="left"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#EAF1EF',
                    } }
                    data-testid={ `customer_checkout__element-order-table-name-${index}` }
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    component="td"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#036B52',
                      color: 'white',
                    } }
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {quantity}
                  </TableCell>
                  <TableCell
                    component="td"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#421981',
                      color: 'white',
                    } }
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {price.replace('.', ',')}
                  </TableCell>
                  <TableCell
                    component="td"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#056CF9',
                      color: 'white',
                    } }
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {subTotal.toFixed(2).replace('.', ',')}
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    align="center"
                    sx={ {
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#2FC18C',
                    } }
                  >
                    <Button
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                      sx={ {
                        padding: '5px 0',
                        fontWeight: '600',
                        backgroundColor: 'inherit',
                        color: 'white',
                      } }
                      name={ id }
                      onClick={ handleDelete }
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Grid
          item
          sx={ {
            justifySelf: 'end',
            alignSelf: 'flex-end',
          } }
        >
          <Typography
            variant="h4"
            sx={ {
              position: 'relative',
              marginTop: 4,
              left: 970,
              backgroundColor: '#036B52',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
              borderRadius: '5px',
              width: 'fit-content',
              padding: '10px',
            } }
            data-testid="customer_checkout__element-order-total-price"
          >
            {'TOTAL: R$ '}
            {calcTotalPrice().toFixed(2).replace('.', ',')}
          </Typography>
        </Grid>
      </TableContainer>
    </Grid>
  );
}

export default ProductsTable;
