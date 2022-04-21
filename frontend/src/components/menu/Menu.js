import React, { useEffect, useState } from 'react'
import SandwichItem from './SandwichItem';
import { getAllSandwich } from '../../services/sandwich';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Sandwich from '../../assets/sandwich.webp';
import Alert from 'react-bootstrap/Alert';

import { placeNewOrder } from '../../services/order';

import '../../stylesheets/menu/menu.css';

const Menu = () => {
  const [ sandwichList, setSandwichList ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ currentSandwich, setCurrentSandwich ] = useState({});
  const [ noti, setNoti ] = useState({
    type: 'noti' || 'error',
    message: ''
  });

  useEffect(() => {
    getSandwichList();
  }, []);

  const setNotificationMessage = (type, message) => {
    setNoti({ type, message });
    setTimeout(() => setNoti({ type: 'noti', message: '' }), 3000);
  }

  const getSandwichList = async () => {
    try {
      setLoading(true);
      const data = await getAllSandwich();
      setSandwichList(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setNotificationMessage('error', 'Cannot get the menu.');
    }
  };

  const handleOpenModal = (sandwichId) => {
    setLoading(true);
    setCurrentSandwich(sandwichList.find(item => item.id === sandwichId));
    setModalOpen(true);
    setLoading(false);
  }

  const handlePlaceOrder = async (sandwichId) => {
    try {
      setLoading(true);
      await placeNewOrder(sandwichId);
      setLoading(false);
      setModalOpen(false);
      setNotificationMessage('noti', 'Ordered successfully!');
    } catch (err) {
      console.log(err);
      setNotificationMessage('error', 'Order failed. Please try again!');
    }
  }

  return (
    <div className="menu">
      {loading && <Spinner animation='border' />}
      {noti.message && 
        <Alert variant={noti.type === 'noti' ? 'success' : 'danger'} style={{marginTop: '10px', width: '50%'}}>
          {noti.message}
        </Alert>
      }
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>You are ordering one {currentSandwich?.name}. Do you wish to confirm your order?</div>
          <div className='modal-sandwich-container'>
            <Card className='modal-sandwich-item'>
              <Card.Img className='modal-sandwich-item-img' variant='top' src={Sandwich} />
              <Card.Body className='modal-sandwich-item-body'>
                <Card.Title className='modal-sandwich-item-title'>{currentSandwich?.name}</Card.Title>
                <div className='modal-sandwich-item-text'>
                  Bread type: {currentSandwich?.breadType} <br/>
                  Toppings:
                  <ul>
                    {currentSandwich?.toppings?.map(item => (
                      <li key={`${currentSandwich?.name}-topping-${item.id}`}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlePlaceOrder(currentSandwich?.id)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='menu-container'>
        {sandwichList.map((item, idx) => 
          <SandwichItem 
            sandwichId={item.id}
            name={item.name}
            toppings={item.toppings}
            breadType={item.breadType}
            key={`item-${item.name}-${idx}`}
            loading={loading}
            handleOpenModal={handleOpenModal}
          />
        )}
      </div>
    </div>
  )
}

export default Menu