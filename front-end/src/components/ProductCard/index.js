import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, Input } from '@mui/material';
import { useDispatch } from 'react-redux';
import { findProductInStorage,
  updateProductQuantity, calcTotalPrice } from '../../utils/localStorage';

function ProductCard(data) {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(0);

  const { product } = data;
  const { name, price, urlImage, id } = product;

  useEffect(() => {
    const productInStorage = findProductInStorage(id);

    if (productInStorage) {
      setInputValue(productInStorage.quantity);

      const newPrice = productInStorage.quantity * price;

      dispatch({ type: 'UPDATE_TOTAL_PRICE', totalPrice: newPrice });
    }
  }, []);

  function handleClick(target) {
    if (target.name === '+') {
      const newInputValue = Number(inputValue) + 1;
      const newPrice = newInputValue * price;

      setInputValue(newInputValue);

      dispatch({ type: 'SET_TOTAL_PRICE', price: newPrice });

      updateProductQuantity(product, newInputValue);
    } else if (target.name === '-' && Number(inputValue)) {
      setInputValue(inputValue - 1);

      dispatch({ type: 'RM_TOTAL_PRICE', price });

      updateProductQuantity(product, inputValue - 1);
    }

    const productInStorage = findProductInStorage(id);

    if (productInStorage) {
      setInputValue(productInStorage.quantity);

      const newPrice = productInStorage.quantity * price;

      dispatch({ type: 'UPDATE_TOTAL_PRICE', totalPrice: newPrice });
    }
  }

  function changeInput({ value }) {
    if (Number(value) >= 0) {
      setInputValue(value);
      updateProductQuantity(product, Number(value));
    } else {
      updateProductQuantity(product, 0);
    }

    dispatch({ type: 'UPDATE_TOTAL_PRICE', totalPrice: calcTotalPrice() });
  }

  return (
    <Card
      variant="outlined"
      sx={ {
        dense: 'true',
        display: 'flex',
        width: '310px',
        height: '370px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '12px',
        boxShadow: '4px 4px 5px lightgrey',
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center' } }
      >
        <CardContent
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center' } }
        >
          <CardMedia
            component="img"
            sx={ { width: 151, height: 240, marginBottom: '2px' } }
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            image={ urlImage }
          />
          <Typography
            marginBottom="5px"
            component="div"
            variant="h6"
            fontFamily="Helvetica"
            fontWeight="600"
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            { name }
          </Typography>
          <Typography
            marginBottom="5px"
            variant="subtitle1"
            data-testid={ `customer_products__element-card-price-${id}` }
            component="div"
            fontFamily="Helvetica"
            fontWeight="400"
          >
            { String(`R$ ${price}`).replace('.', ',') }
          </Typography>

          <ButtonGroup
            marginBottom="5px"
            disableElevation
            variant="contained"
            onClick={ ({ target }) => handleClick(target) }

          >
            <Button
              size="small"
              name="-"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
            >
              -

            </Button>
            <Input
              sx={ { width: '44px' } }
              value={ inputValue }
              onChange={ ({ target }) => changeInput(target) }
              inputProps={ {
                'data-testid': `customer_products__input-card-quantity-${id}`,
              } }
            />
            <Button
              size="small"
              name="+"
              data-testid={ `customer_products__button-card-add-item-${id}` }
            >
              +

            </Button>
          </ButtonGroup>
        </CardContent>
        <Box sx={ { display: 'flex', alignItems: 'center', pl: 1, pb: 1 } } />
      </Box>
    </Card>
  );
}

export default ProductCard;
