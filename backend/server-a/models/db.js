const mongoose = require('mongoose');
let Sandwich = require('../service/SandwichService');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = function () {
    const db = 'mongodb://database:27017/sandwich_order';
    mongoose.connect(db)
    .then(() => {
        console.log(`Connected to ${db}...`);
        let defaultSandwichList = [
            {
                "name": "Chicken sandwich",
                "toppings": [
                    {
                        "name": "Chicken",
                        "id": 1
                    },
                    {
                        "name": "spinach",
                        "id": 2
                    }
                ],
                "breadType": "oat"
            },
            {
                "name": "Beacon sandwich",
                "toppings": [
                    {
                        "name": "Beacon",
                        "id": 3
                    },
                    {
                        "name": "lettuce",
                        "id": 4
                    },
                ],
                "breadType": "oat"
            },
            {
                "name": "Roast Beef sandwich",
                "toppings": [
                    {
                        "name": "Beef",
                        "id": 5
                    },
                    {
                        "name": "peas & mint",
                        "id": 6
                    },
                ],
                "breadType": "wheat"
            },
            {
                "name": "Grilled Cheese sandwich",
                "toppings": [
                    {
                        "name": "Cheese",
                        "id": 7
                    },
                    {
                        "name": "vegetables & pepper",
                        "id": 8
                    }
                ],
                "breadType": "rye"
            },
            {
                "name": "Ham sandwich",
                "toppings": [
                    {
                        "name": "Ham, grain mustard",
                        "id": 9
                    },
                ],
                "breadType": "wheat"
            },
            {
                "name": "Egg sandwich",
                "toppings": [
                    {
                        "name": "Egg",
                        "id": 10
                    }
                ],
                "breadType": "wheat"
            },
            {
                "name": "SeaFood sandwich",
                "toppings": [
                    {
                        "name": "Fired Fish",
                        "id": 11
                    },
                    {
                        "name": "lemon, cheese & spices",
                        "id": 12
                    }
                ],
                "breadType": "wheat"
            },
            {
                "name": "Nutella sandwich",
                "toppings": [
                    {
                        "name": "Nutella",
                        "id": 13
                    }
                ],
                "breadType": "wheat"
            }
        ];

        // Get all toppings from database
        Sandwich.getSandwiches().then((sandwiches) => {
            let sandwichList = sandwiches.map(function(item) {
                console.log('Sandwich list');
                return item.name;
            });

            defaultSandwichList.forEach((sandwich) => {
                let temp_name = sandwich.name;
                if(!sandwichList.includes(temp_name)){
                    Sandwich.addSandwich(sandwich)
                    .then(() => {
                        console.log('Sandwich saved successfully');
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            });
        }).catch();
    }).catch(err => console.log('Could not connect to MongooDB...', err));
};