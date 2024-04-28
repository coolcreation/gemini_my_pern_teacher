## Learning P.E.R.N. stack with the help of Gemini

```html
 git add . 
 git commit -m "some message"
 git branch -M main
 git remote add origin https://github.com/coolcreation/gemini_my_pern_teacher.git
 git push -u origin main 
```

________________________________________

### Task 1

1. Using pgAdmin Create a new PostgreSQL database called "ecom_db" 
2. In "ecom_db", use SQL commands ( tools > query tool ) to create two tables:
    * Products Table:
    ```sql
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      image_url VARCHAR(255)
    );
    ```
    * Leave the second table empty for now. We'll create it later to handle user accounts and orders.

---------------------------------

### Task 2

Creating the database tables is a great first step. Now we can move on to building a Node.js server to handle product data and interact with the PostgreSQL database.

1. Project Initialization: <br>  Open your terminal, navigate to your project directory, and run `npm init -y` to create a basic `package.json` file for your project.
2. Installing Dependencies: <br> We'll use the Express.js framework for building the server and the `pg` library to interact with the PostgreSQL database. Install them using npm with the following command:

```bash
npm install express pg
```

**Now comes the puzzle piece:**

We'll create a basic Node.js server using Express and establish a connection to your PostgreSQL database. Here's a starting point (replace `<password>` with your actual PostgreSQL password):

```javascript
const express = require('express');
const app = express();
const pg = require('pg');

// Replace '<password>' with your actual PostgreSQL password
const pool = new pg.Pool({
  user: 'postgres', // Assuming your username is postgres
  host: 'localhost',
  database: 'ecom_db',
  password: '<password>',
  port: 5432
});

app.get('/products', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM products');
    const products = result.rows;
    res.json(products);
    client.release();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

**Save this code as `server.js` in your project directory.**

This code defines a simple route (`/products`) that retrieves all products from the database and sends them as JSON data in the response. 

**Understanding the code:**

* We require the necessary modules (Express, pg).
* We create a connection pool to our PostgreSQL database using the `pg` library.
* We define a route (`/products`) that responds to GET requests.
* Inside the route handler:
    * We connect to the database using the connection pool.
    * We execute a query to select all products from the database.
    * We send the retrieved products as JSON data in the response.
    * We handle any errors that might occur during the process.
* We start the server and listen for incoming requests on port 3000.


http://localhost:3000/  
http://localhost:3000/products/

-------------------------
