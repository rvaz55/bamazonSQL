#Creating Bamazon on SQL

##The Project Does:
This project is called Bamazon and it is a mock-up of a Amazon-esue inventory system. The program accesses a table on my local server containing 11 'items' in  a 'products' table. When the program is 'run', it displays the current inventory and then gives the client the option to 'purchase' any listed item. If a client decides to 'purchase' an item the program then communicates with the database hosting the table and decreases the inventory to reflect the client's purchase. Immediately after the 'purchase'/inventory adjustment, the program displays a table of the current inventory.

##This project is useful because:
To create this project I had to:
    * Setup a local-host server to store my SQL data
    * Used Javascript/Node to access and manipulate SQL data
    * Used a keys JS file to store the database apssword and then placed the file in a .gitignore file to keep the password private

By using these techniques I expanded my JS knowledge and am now able to interact with and manipulate SQL data. 