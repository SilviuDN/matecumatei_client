import React from 'react';
// import { useState } from 'react'
// import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../icons';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import RemoveItem from './trash-svgrepo-com.svg'
// import classes from './CartPage.module.css';

const CartItemCard = (props) => {
  const { title, imageUrl, price, _id,} = props;
  // const product = { title, imageUrl, price, _id, description };

  // const [itemCoupon, setCouponInput] = useState({ couponName: '' })

  const handleInputChange = e => { console.log('handleInputChange under construction')}
  const handleFormSubmit = e => { console.log('handleFormSubmit under construction')}


  return (
    <Card className='cart-item'>
      <Row className='align-items-center'>

        <Col xs={12} md={3} className='text-center text-md-left'>
          <div className='item-image'>
            <Card.Img src={imageUrl} alt='product' className='w-100 h-100'/>
          </div>
        </Col>
        <Col xs={12} md={3} className='text-center text-md-left'>
          <div className='name-price'>
            <h4>{title}</h4>
            {/* <p>{price} RON</p> */}
          </div>
        </Col>
        <Col xs={12} md={2} className='text-center'>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="couponName">
                <Form.Label>Cupon: </Form.Label>
                <Form.Control type="text" value='' onChange={handleInputChange} name="couponName" />
            </Form.Group>
            <Button style={{ marginTop: '20px', width: '100%'}} variant="dark" type="submit" disabled>Aplică reducerea</Button>
          </Form>
        </Col>
        <Col xs={12} md={2} className='text-center'>
          <div className='price'>
            <p>{`Price: ${price}`}</p>
            <p>{`Discounted price: ${price}`}</p>
          </div>
        </Col>
        <Col xs={12} md={2} className='text-center'>
              <Button variant='light' className='m-5' onClick={() => props.removeItem(_id)}>
                <img src={RemoveItem} className='w-100 h-100' alt='trash can pic'/>
              </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default CartItemCard;
