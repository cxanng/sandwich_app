'use strict';
const mongoose = require('mongoose');
let Sandwich = require('../models/Sandwich');

/**
 * Add a new sandwich to the store. Needs an API key.
 *
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addSandwich = function(body) {
  return new Promise(function(resolve, reject) {
    const newSandwich = new Sandwich.Sandwich(body);
    newSandwich.save().then(() => {
        resolve(body);
    }).catch((err) => {
        console.log('Sandwich not saved successfully');
        reject(err)
    });
  });
}


/**
 * Deletes a sandwich
 *
 * sandwichId Long Sandwich id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteSandwich = function(sandwichId,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find sandwich by ID
 * Returns a single sandwich
 *
 * sandwichId Long ID of sandwich to return
 * returns Sandwich
 **/
exports.getSandwichById = function(sandwichId) {
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
 * Get a list of all sandwiches. Empty array if no sandwiches are found.
 *
 * returns ArrayOfSandwiches
 **/
exports.getSandwiches = function() {
  return new Promise(function(resolve, reject) {
    Sandwich.Sandwich.find(function (err, sandwiches) {
        if (err) {
            reject(err);
            return;
        }
        resolve(sandwiches);
    });
  });
}


/**
 * Updates a sandwich in the store with JSON in body
 *
 * sandwichId Long ID of sandwich to return
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.updateSandwich = function(sandwichId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

