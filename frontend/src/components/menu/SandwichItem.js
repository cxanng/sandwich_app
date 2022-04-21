import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import { BsFillCartPlusFill } from 'react-icons/bs';

import '../../stylesheets/menu/sandwichItem.css';
import Sandwich from '../../assets/sandwich.webp';

const SandwichItem = ({
  sandwichId,
  breadType,
  toppings,
  name,
  img="",
  loading,
  handleOpenModal,
}) => {

  const handleOrderButton = () => {
    handleOpenModal(sandwichId);
  }

  return (
    <Card className='sandwich-item'>
      <Card.Img className='sandwich-item-img' variant='top' src={Sandwich} />
      <Card.Body className='sandwich-item-body'>
        <Card.Title className='sandwich-item-title'>{name}</Card.Title>
        <div className='sandwich-item-text'>
          Bread type: {breadType} <br/>
          Toppings:
          <ul>
            {toppings.map(item => (
              <li key={`${name}-topping-${item.id}`}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className='sandwich-item-action'>
          <Button onClick={handleOrderButton} disabled={loading}>
            {loading ? 
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> :
              <>
                <BsFillCartPlusFill className='sandwich-item-icon'/>
                <span>Order</span>
              </>
          }
          </Button>
        </div>  
      </Card.Body>
    </Card>
  )
}

export default SandwichItem