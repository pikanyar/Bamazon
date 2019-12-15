var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Hacettepe/20259572/",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});


function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");

        displayPurchase(res);
    });
}




//function which prompts the user for what action they should take
function displayPurchase(stock) {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to buy?",

            },
            {
                name: "units",
                type: "input",
                message: "How many units of the product you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            let choice = stock.find(item => item.item_id === parseInt(answer.id))
            // Subtract thhe amount that I want from the amount that I have
            let new_quant = choice.stock_quantity - answer.units
            // If I have enough to give, give it and update
            if (new_quant >= 0) {
                // Amount chosen times unit price
                let total = choice.price * answer.units
                console.log("You spend : $" + parseFloat(total, 2));
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                    `UPDATE bamazon.products SET stock_quantity = ${new_quant} WHERE item_id =${answer.id}`,
                    function (err) {
                        if (err) throw err;
                        console.log("Your purchase was created successfully!");
                        // re-prompt the user for if they want to bid or post
                        start();
                    }
                );
            } else {
                console.log("Insuficient amount!")
                start();
            }
        });

}












