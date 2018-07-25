var mysql = require('mysql')
var inquirer = require('inquirer')

//create the connection to the database we created

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

      // Your username
  user: "root",

  // Your password
  password: "Athlon64!!",
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
  });

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;   
        printTable(res);
        runSearch();
      });
};

function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Order a product"
         
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Order a product":
        enterOrderInfo();
          break;
        }
      });
  }

  function enterOrderInfo(){
    inquirer.prompt([
        {type: "input",
        name: "productID",
        message: "Please enter Product ID:"},

        {type: "input",
        name: "quantity",
        message: "Please enter quantity:"}
    ])
      .then(function(answer) {
          //console.log(`product ID: ${answer.productID}`);
          //console.log(`product quantity: ${answer.quantity}`)
          checkStock(answer);
      })
  }

  function printTable(res){
    for ( var x = 0 ; x < res.length ; x++){
        console.log("===============================================================================");
        console.log(
        "ID: " +
        res[x].item_id +
        " || Product: " +
        res[x].product_name +
        " || Department: " +
        res[x].dept_name +
        " || Price: " +
        res[x].price +  
        " || Stock: " +
        res[x].stock_quantity)
        console.log("===============================================================================");
        console.log("");
        }
     };

  function checkStock(answer){
    connection.query('SELECT * FROM `products` WHERE `item_id` = ?', [answer.productID], function (err, results, fields) {
        if (err) throw err;  
            //console.log(results)
        if ( results[0].stock_quantity > 0 ){
            //console.log(answer.productID)
            var orderQuant = answer.quantity
           placeOrder(results, orderQuant)
       };

        if ( results[0].stock_quantity === 0){
            console.log("Cannot place order due to insufficient quantity")  
            };
    });
  };

  function placeOrder(results, orderQuant){
    let itemIDD = results[0].item_id
    var updatedQuant = results[0].stock_quantity - parseInt(orderQuant) 
    console.log("order quant: " + orderQuant)
    console.log('stock:' ,  typeof  results[0].stock_quantity)
     console.log(results)
     console.log("updated stock should be: " + updatedQuant)
     console.log("this is the item D: " + itemIDD)

    var updateInfo = `UPDATE products SET stock_quantity = ? WHERE item_id = ?`
        connection.query(updateInfo, [ updatedQuant, itemIDD ], function (err, resultA) {
        if (err) throw err;
        console.log(resultA + " record(s) updated");
       displayProducts();
      })
  };