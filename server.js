// const express = require('express');
//const pg = require('pg');

import 'dotenv/config'; 

import express from 'express';
const app = express();

import pg from 'pg';



const pool = new pg.Pool({
  user: 'postgres', // Assuming your username is postgres
  host: 'localhost',
  database: 'ecom_db',
  password: process.env.DB_PASSWORD,
  port: 5432
});


app.get('/', async (req, res) => {
  try {
      res.send(`
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
          rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
          crossorigin="anonymous">

          <div class="container my-5">
             <h1 class="text-center text-primary">Home Page</h1>
          </div>

          <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
          <script type="module" src="server.js"></script>
      
      `);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
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
  console.log(`Server on: \n http://localhost:3000/ \n and products on: \n  http://localhost:3000/products/`);
});