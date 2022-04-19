import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../services/order";
import { getAllSandwich } from "../../services/sandwich";
import OrderItem from "./OrderItem";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { BsSearch } from 'react-icons/bs';
import { GrRefresh } from 'react-icons/gr';
import '../../stylesheets/order/order.css';


const Order = () => {
  const [ orderList, setOrderList ] = useState([]);
  const [ sandwichList, setSandwichList ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ filter, setFilter ] = useState('ready');
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    getOrderList();
    getSandwichList();
  }, []);

  const getOrderList = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrderList(data);
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="order">
      {loading && <Spinner animation='border' />}
      <div className="order-action">
        <div className="order-button-group">
          <Button 
            onClick={() => setFilter('ready')}
            disabled={filter === 'ready'}
          >
            Ready
          </Button>
          <Button 
            onClick={() => setFilter('received')}
            disabled={filter === 'received'}
          >
            Received
          </Button>
          <Button 
            onClick={() => setFilter('inQueue')}
            disabled={filter === 'inQueue'}
          >
            In queue
          </Button>
          <Button 
            onClick={() => setFilter('ordered')}
            disabled={filter === 'ordered'}
          >
            Ordered
          </Button>
          <Button 
            onClick={() => setFilter('failed')}
            disabled={filter === 'failed'}
          >
            Failed
          </Button>
        </div>
        <div className="order-search-group">
          <InputGroup >
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="order id"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button 
              onClick={() => getOrderList()}
              disabled={loading}
          >
            <GrRefresh />
          </Button>
        </div>
      </div>
      <div className="order-container">
        <h1 className="order-type">
          {filter === 'inQueue' 
          ? 'In queue' 
          : filter.charAt(0).toUpperCase() + filter.slice(1)}
        </h1>
        {
          orderList.some(item => item.status === filter && item.id.toString().toUpperCase().includes(search.toUpperCase())) ?
          <div className="order-list">
            {orderList.filter(item => item.status === filter && item.id.toString().toUpperCase().includes(search.toUpperCase()))
              .map(item => (
                <OrderItem 
                  orderId={item.id}
                  item={sandwichList.find(sandwich => sandwich.id === item.sandwichId)}
                  key={`order-${item.id}`}
                />
            ))}
          </div> :
          <div>
            No order found
          </div>
        }
        
      </div>
    </div>
  )
}

export default Order;