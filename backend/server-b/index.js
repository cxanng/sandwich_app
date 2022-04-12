'use strict';

const sendTask = require('./rabbit-utils/sendTask.js');
const receiveTask = require('./rabbit-utils/receiveTask.js');

//RabbitMQ Configuration
var rabbitMQHost = "rapid-runner-rabbit:5672";
var receivedOrderQueueName = "received-order-queue";
var completedOrderQueueName = "completed-order-queue";

// Send a message to completed queue
const sendMessage = function(msgBody) {
    console.log(" [x] Replying with '%s'", msgBody);  
    // Send a message to another queue
    sendTask.addTask(rabbitMQHost, completedOrderQueueName, msgBody);
};

//Start listening for received order queue
console.log("Receive sandwich orders from Server A in queue");
receiveTask.getTask(rabbitMQHost, receivedOrderQueueName, sendMessage);