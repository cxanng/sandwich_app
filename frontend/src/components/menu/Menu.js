import React from 'react'
import SandwichItem from './SandwichItem';
import { defaultSandwichList } from '../../assets/dummyData';

import '../../stylesheets/menu/menu.css';

const Menu = () => {
  return (
    <div className="menu">
      <div className='menu-container'>
        {defaultSandwichList.map(item => 
          <SandwichItem 
            name={item.name}
            toppings={item.toppings}
            breadType={item.breadType}
            key={`item-${item.name}`}
          />
        )}
      </div>
    </div>
  )
}

export default Menu