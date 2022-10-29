import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import detTableHeaders from './helpers';

function OrderTable({ data }) {
  return (
    <TableContainer
      sx={ { display: 'flex',
        flexDirection: 'column',
      } }
      container
      component={ Paper }
    >
      <Table sx={ { minWidth: 650 } } size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {detTableHeaders.map((title) => (
              <TableCell key={ title }>
                title
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.salesProducts && data.salesProducts.map((row, i) => (
            <TableRow
              key={ i }
              sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell
                component="th"
                data-testid={ `seller_order_details__element-order-table-name-${i}` }
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell
                data-testid={ `seller_order_details__element-order-table-quantity-${i}` }
                align="right"
              >
                {row.quantity}
              </TableCell>
              <TableCell
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${i}`
                }
                align="right"
              >
                {parseFloat(row.price).toFixed(2).replace('.', ',')}
              </TableCell>
              <TableCell
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${i}`
                }
                align="right"
              >
                {parseFloat((row.price * row.quantity)).toFixed(2).replace('.', ',')}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell data-testid={ `${role}_order_details__element-order-total-price` }>
              { parseFloat(data.totalPrice).toFixed(2).replace('.', ',')}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;

OrderTable.propTypes = {
  data: PropTypes.shape({
    salesProducts: PropTypes.arrayOf(PropTypes.string),
    totalPrice: PropTypes.number,
  }),
}.isRequired;
