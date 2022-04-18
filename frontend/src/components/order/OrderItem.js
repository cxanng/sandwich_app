import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Sandwich from '../../assets/sandwich.webp';


import '../../stylesheets/order/orderItem.css';


const OrderItem = ({
  orderId,
  item
}) => {

  return (
    <>
      {item && 
      <Card className='order-item'>
        <Card.Img className='order-item-img' variant='top' src={Sandwich} />
        <Card.Body className='order-item-body'>
          <Card.Title className='order-item-title'>Order no.{orderId}</Card.Title>
          <div className='order-item-text'>
            {item.name} <br/>
            Bread type: {item.breadType} <br/>
            Toppings:
            <ul>
              {item.toppings.map(topping => (
                <li key={`${orderId}-topping-${topping.id}`}>{topping.name}</li>
              ))}
            </ul>
          </div>
        </Card.Body>
      </Card>}
    </>
  )
}

export default OrderItem;