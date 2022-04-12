let Order = require('../service/OrderService');
let sendTask = require('./sendTask.js')

let rabbitMQHost = "rapid-runner-rabbit:5672";
let queueOfOrder = "order-queue";

/**
 *  Get orders with "received" status
 *  push the order to the queue
 */

 module.exports.pushReceivedOrderToQueue = function() {
  Order.getOrderByStatus("received").then((orderData) => {
    console.log("pushReceivedOrderToQueue");
      for(let i = 0; i < orderData.length; i++) {
          let order = orderData[i];
          sendTask.addTask(rabbitMQHost, queueOfOrder, order);
      }
  });
};