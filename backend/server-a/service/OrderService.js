'use strict';

let Order = require('../models/Order');
let Sandwich = require('../models/Sandwich');

let rabbitMQHost = "rapid-runner-rabbit:5672";
let queueOfOrder = "order-queue";

var sendTask = require('../rabbit-utils/sendTask.js')

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
          reject('No sandwich found for given ID...');
      } else {
          const newOrder = new Order.Order({sandwichId: orderData.id, status: "received"});
          newOrder.save().then(() => {
              console.log('Order saved successfully');
              resolve(orderData);
              sendTask.addTask(rabbitMQHost, queueOfOrder, orderData);
          }).catch((err) => {
              console.log('Order saved successfully');
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
    var examples = {};
    examples['application/json'] = {"empty": false};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
 *  Check object is Empty
 */
function isEmpty(obj) {
  for(let key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
