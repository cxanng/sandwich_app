'use strict';

let Order = require('../models/Order');
let Sandwich = require('../models/Sandwich');

let pushToRabbit = require('../rabbit-utils/pushToRabbit.js');

/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/
exports.addOrder = function(order) {
  return new Promise(function(resolve, reject) {
    Sandwich.Sandwich.findOne({id: order.sandwichId}, function (err, orderData) {
      if (err) {
          console.log(err);
          return;
      }
      if (isEmpty(orderData)) {
          reject('No sandwich order found for given ID...');
      } 
      else {
          // add order with status received
          const newOrder = new Order.Order({sandwichId: orderData.id, status: "received"});
          newOrder.save().then(() => {
              console.log('Order saved successfully');
              resolve(orderData);
              pushToRabbit.pushReceivedOrderToQueue();
          }).catch((err) => {
              console.log('Order not saved successfully');
              reject(err);
          });
      }
    });
  });
}

/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of the order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function(orderId) {
  return new Promise(function(resolve, reject) {
    Order.Order.findOne({id: orderId}, function (err, orderData) {
      if (err) {
          console.log(err)
          return;
      }
      if (isEmpty(orderData)) {
          reject('No sandwich order found for given ID...');
      } 
      else {
          console.log('getOrderById');
          Sandwich.Sandwich.findOne({id: orderData.sandwichId}, function (err, sandwichData) {
              if (err) {
                  console.log(err)
                  return;
              }
              if(!isEmpty(sandwichData)){
                  resolve({id: orderData.id, sandwichId: sandwichData.id, status: orderData.status});
              } 
              else {
                  reject('No sandwich order found for given ID...');
              }
          });
      }
    });
  });
}


/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = function() {
  return new Promise(function(resolve, reject) {
    Order.Order.find(function (err, orders) {
        if (err) {
            reject(err);
            return;
        }
        resolve(orders);
    });
  });
}

/**
 * Update an order by its ID
 * IDs must be positive integers
 *
 * Order of orderId will be updated
 * new order data will be in the 'body' parameter
 **/
 exports.updateOrder = function (orderId, body) {
  console.log('update order from A');
  return new Promise(function (resolve, reject) {
      Order.Order.findOneAndUpdate({id: orderId}, body, {new: true}, function (err, order) {
          if (err) {
              reject(err);
              return;
          }
          resolve(body);
      })
  });
};

/**
 * Find all order by a status
 * Status must be string
 *
 * returns array of Orders
 **/
 exports.getOrderByStatus = function(status) {
  return new Promise(function(resolve, reject) {
      Order.Order.find({status: status}, function (err, orders) {
          if (err) {
              console.log(err);
              return;
          }
          if (!orders.length) {
              reject('No sandwich order found for '+status+' status...');
          } 
          else {
              resolve(orders);
          }
      });
  });
};



/**
 *  Check object is Empty
 */
function isEmpty(obj) {
  for(let key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
