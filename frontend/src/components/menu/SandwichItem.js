import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsFillCartPlusFill } from 'react-icons/bs';

import '../../stylesheets/menu/sandwichItem.css';

const SandwichItem = ({
  breadType,
  toppings,
  name,
  img="",
}) => {
  return (
    <Card className='sandwich-item'>
      <Card.Img className='sandwich-item-img' variant='top' src={img} />
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
          <Button>
            <BsFillCartPlusFill className='sandwich-item-icon'/>
            <span>Add to cart</span>
          </Button>
        </div>  
      </Card.Body>
    </Card>
  )
}

export default SandwichItem