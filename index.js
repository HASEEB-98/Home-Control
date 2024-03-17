const express = require("express");
const expressLayouts = require('express-ejs-layouts')
const {check , validationResult } = require('express-validator');

const mysql = require('mysql')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Parsing middleware
app.use(express.urlencoded({ limit: '10mb', extended: false }))

// Parse application/json
app.use(express.json())

// Static Files
app.use(express.static('public'));

// EJS
app.set('view engine', 'ejs')

// Setting Directories
app.set('views', __dirname + '/view')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)

// Connection Pool
var pool = mysql.createPool({
    connectionLimit: 100,
    heat: process.env.DB_HOST,
    user: process.env.DB_USER,
})

// Connection Pool
pool = mysql.createPool({
    connectionLimit: 100,
    heat: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
})

pool.getConnection((err, connection) => {
    if (err) {
        console.log('Creating new Database')
        pool = mysql.createPool({
            connectionLimit: 100,
            heat: process.env.DB_HOST,
            user: process.env.DB_USER,
        })
        pool.getConnection((err, connection) => {
            if (err) throw err; // Something is wrong, not connected
            
            // Database Interaction:
            // Purpose: If database is not present create the database
            // Input: Name of the database
            // Output: Message (Whether Operation is a success or some error occured)
            connection.query('CREATE DATABASE ' + process.env.DB_NAME, (err, rows) => {

                connection.release();

                // Connection Pool
                pool = mysql.createPool({
                    connectionLimit: 100,
                    heat: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    database: process.env.DB_NAME,
                })

                pool.getConnection((err, connection) => {
                    if (err) throw err;

                    // Database Interaction:
                    // Purpose: Creating table to store the record
                    // Input: Name of the table along with all the features and checks on each feature
                    // Output: Message (Whether Operation is a success or some error occured)
                    connection.query('CREATE TABLE ' + process.env.DB_NAME +'.`device` (`id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(50) NOT NULL , `type` VARCHAR(20) NOT NULL , `status` VARCHAR(10) NULL , `location` VARCHAR(20) NULL , `outside_air` INT NULL , `recirculated_air` INT NULL , `mode` VARCHAR(20) NULL , `actual_temperature` INT NULL , `requested_temperature` INT NULL , `actual_humidity` INT NULL , `requested_humidity` INT NULL , `direction` VARCHAR(20) NULL , `rotation` VARCHAR(10) NULL , `dim` INT NULL , `color` VARCHAR(20) NULL , `light_strength` INT NULL , `spray_strength` INT NULL , `food_amount` INT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;', (err, rows) => {
                        // When done with the connection release it
                        connection.release();

                        if (err) {
                            console.log(err);
                        }
                    });
                });

            })
            console.log('Connected to ID ' + connection.threadId)
        })
    } // Something is wrong, not connected
    else
        console.log('Connected to ID ' + connection.threadId)
});

const routes = require('./server/routes/main');
app.use('/', routes);


app.listen(port, () => console.log(`Listening on port ${port}`));