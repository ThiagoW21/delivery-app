import { Button,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../redux/actions';
import { tableHeaders } from '../helpers';
import '../style/UserTable.css';

function UsersTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const users = useSelector((state) => state.adm.users);

  const handleDelete = async ({ currentTarget: { id } }) => {
    await axios.delete(`http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}/user`, {
      data: {
        source: id,
      },
    });
    dispatch(fetchUsers());
  };

  return (
    <TableContainer
      className="table"
      sx={ {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      } }
    >
      <Table
        sx={ { width: '95%', border: 0 } }
        size="small"
        aria-label="users table"
      >
        <TableHead>
          <TableRow>
            {tableHeaders.map((head) => (
              <TableCell
                key={ head }
                component="th"
                scope="row"
                sx={ { fontSize: '20px' } }
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, name, email, role }, index) => (
            <TableRow
              key={ id }
              sx={ { border: 0 } }
            >
              <TableCell
                className="id"
                sx={ { '&:last-child td': { border: 0 },
                  borderBottomLeftRadius: '10px',
                  borderTopLeftRadius: '10px',
                  fontSize: '16px' } }
                component="td"
                scope="row"
                align="center"
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {id}
              </TableCell>
              <TableCell
                className="name"
                component="td"
                scope="row"
                sx={ { fontSize: '16px' } }
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {name}
              </TableCell>
              <TableCell
                sx={ { color: 'white', fontSize: '16px' } }
                className="email"
                component="td"
                scope="row"
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {email}
              </TableCell>
              <TableCell
                sx={ { color: 'white', fontSize: '16px' } }
                className="roleTable"
                component="td"
                scope="row"
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {role}
              </TableCell>
              <TableCell
                component="td"
                scope="row"
                sx={ {
                  backgroundColor: '#056CF9',
                  borderBottomRightRadius: '10px',
                  borderTopRightRadius: '10px',
                  width: '40px',
                  fontSize: '16px',
                } }
              >
                <Button
                  className="buttonExcluir"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  fullWidth
                  sx={ {
                    padding: '5px 0',
                    fontWeight: '600',
                    width: '100%',
                    backgroundColor: '#056CF9',
                    border: 0,
                    boxShadow: 0,
                  } }
                  variant="contained"
                  id={ email }
                  onClick={ handleDelete }
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
