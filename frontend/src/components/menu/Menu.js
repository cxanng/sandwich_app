import React, { useEffect, useState } from 'react'
import SandwichItem from './SandwichItem';
import { getAllSandwich } from '../../services/sandwich';
import Spinner from 'react-bootstrap/Spinner';

import '../../stylesheets/menu/menu.css';

const Menu = () => {
  const [ sandwichList, setSandwichList ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    getSandwichList();
  }, []);

  const getSandwichList = async () => {
    try {
      setLoading(true);
      const data = await getAllSandwich();
      setSandwichList(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="menu">
      {loading && <Spinner animation='border' />}
      <div className='menu-container'>
        {sandwichList.map(item => 
          <SandwichItem 
            sandwichId={item.id}
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