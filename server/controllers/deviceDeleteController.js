const mysql = require('mysql')

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    heat: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
})

exports.home = (req, res) => {

    const success = new Array;

    pool.getConnection((err, connection) => {
        if (err) throw err; // Something is wrong, not connected
        console.log('Connected to ID ' + connection.threadId)

        // Database Interaction:
        // Purpose: Get data of all the devices in data base
        // Input: None
        // Output: Set of rows containing data about all features of each device it also include null/0 values to irrelevant fields along with Message (Whether Operation is a success or some error occured)
        connection.query('SELECT * FROM device', (err, rows) => {
            // When done with the connection release it
            connection.release();

            if (!err) {
                res.render('device/delete', {
                    rows,
                    success
                })
            } else {
                console.log(err);
            }
        })
    })


}

exports.find = (req, res) => {

    const success = new Array;

    pool.getConnection((err, connection) => {
        if (err) throw err; // Something is wrong, not connected
        console.log('Connected to ID ' + connection.threadId);

        let searchTerm = req.body.search;

        // Database Interaction:
        // Purpose: Get data of particular device
        // Input: Search Term
        // Output: Rows containing data about all features of device which name or type match with search term it also include null/0 values to irrelevant fields along with Message (Whether Operation is a success or some error occured)
        connection.query('SELECT * FROM device WHERE name LIKE ? OR type LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection release it
            connection.release();

            if (!err) {
                res.render('device/delete', {
                    rows,
                    success
                })
            } else {
                console.log(err);
            }
        })
    })


}

exports.deleteDevice = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; // Something is wrong, not connected
        console.log('Connected to ID ' + connection.threadId);

        let id = req.params.id;

        let success = new Array;

        // Database Interaction:
        // Purpose: Delete device from the database with particular id
        // Input: Device ID
        // Output: Message (Whether Operation is a success or some error occured)
        connection.query('DELETE FROM device WHERE id = ?', [id], (err, rows) => {
            // When done with the connection release it
            connection.release();

            success.push('Device Deleted Successfully!!!')

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; // Something is wrong, not connected
                    console.log('Connected to ID ' + connection.threadId)

                    // Database Interaction:
                    // Purpose: Get data of all the devices in data base
                    // Input: None
                    // Output: Set of rows containing data about all features of each device it also include null/0 values to irrelevant fields along with Message (Whether Operation is a success or some error occured)
                    connection.query('SELECT * FROM device', (err, rows) => {
                        // When done with the connection release it
                        connection.release();

                        if (!err) {
                            res.render('device/delete', {
                                rows,
                                success
                            })
                        } else {
                            console.log(err);
                        }
                    })
                })
            } else {
                console.log(err);
            }
        })
    })


}