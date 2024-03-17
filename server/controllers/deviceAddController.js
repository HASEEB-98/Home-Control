const mysql = require('mysql')

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    heat: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
})

exports.home = (req, res) => {
    const errors = new Array;
    res.render('device/add', { errors })
}

//  Helping Function
function isSpecialCharacter(str) {
    for (let i = 0; i < str.length; i++) {
        if ((str.charCodeAt(i) >= 33 && str.charCodeAt(i) <= 47) || (str.charCodeAt(i) >= 58 && str.charCodeAt(i) <= 64) || (str.charCodeAt(i) >= 91 && str.charCodeAt(i) <= 96) || (str.charCodeAt(i) >= 123 && str.charCodeAt(i) <= 126))
            return true;
    }
    return false;
}

//  Helping Function
function isInvalidTemperature(temperature) {
    if (temperature < 0 || temperature > 50) {
        return true;
    }
    return false;
}

//  Helping Function
function isValidFoodAmount(amount) {
    if (amount < 0 || amount > 3) {
        return true;
    }
    return false;
}

//  Helping Function
function isValidPercentage(value) {
    if (temperature < 0 || temperature > 100) {
        return true;
    }
    return false;
}

exports.addDevice = (req, res) => {
    const name = req.body.deviceName;
    const type = req.body.submit;
    let status = null, location = null, outside_air = 0, recirculated_air = 0, mode = null, actual_temperature = 0, requested_temperature = 0, actual_humidity = 0, requested_humidity = 0, closed = 0, direction = null, rotation = null, dim = 0, color = null, light_strength = 0, spray_strength = 0, food_amount = 0;
    let errors = new Array;
    let success = new Array;

    if (isSpecialCharacter(name)) {
        errors.push("Device Name must not contain any special character!!");
    }

    if (type === 'AirConditioner') {
        status = req.body.statusAirConditioner;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationAirConditioner;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }

        outside_air = req.body.outsideAir;
        recirculated_air = req.body.recirculatedAir;

        mode = req.body.modeAirConditioner;
        if (isSpecialCharacter(mode)) {
            errors.push("Mode must not contain any special character!!");
        }

        actual_temperature = req.body.actualTemperatureAirConditioner;
        if (isInvalidTemperature(actual_temperature)) {
            errors.push("Actual Temprature must between 0 and 50 Celcius");
        }

        requested_temperature = req.body.requestedTemperatureAirConditioner;
        if (isInvalidTemperature(requested_temperature)) {
            errors.push("Requested Temprature must between 0 and 50 Celcius");
        }
    }
    else if (type === 'Humidifier') {
        status = req.body.statusHumidifier;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationHumidifier;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }

        actual_humidity = req.body.actualHumidity;
        requested_humidity = req.body.requestedHumidity;
    }
    else if (type === 'AirPurifier') {
        status = req.body.statusAirPurifier;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationAirPurifier;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }

        mode = req.body.modeAirPurifier;
        if (isSpecialCharacter(mode)) {
            errors.push("Mode must not contain any special character!!");
        }
    }
    else if (type === 'WindowRollerShutters') {
        status = req.body.statusWindowRollerShutters;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationWindowRollerShutters;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }

        closed = req.body.closed;
        if (isValidPercentage(closed)) {
            errors.push("Closed value must between 0 and 100!!");
        }

    }
    else if (type === 'FloorHeating') {
        status = req.body.statusFloorheating;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationFloorheating;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }

        actual_temperature = req.body.actualTemperatureFloorheating;
        if (isInvalidTemperature(actual_temperature)) {
            errors.push("Actual Temprature must between 0 and 50 Celcius");
        }
        requested_temperature = req.body.requestedTemperatureFloorheating;
        if (isInvalidTemperature(requested_temperature)) {
            errors.push("Actual Temprature must between 0 and 50 Celcius");
        }
    }
    else if (type === 'Alarm') {
        status = req.body.statusAlarm;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

    }
    else if (type === 'Camera') {
        status = req.body.statusCamera;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationCamera;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }

        direction = req.body.directionCamera;
        if (isSpecialCharacter(direction)) {
            errors.push("Direction must not contain any special character!!");
        }

        rotation = req.body.rotationCamera;
        if (isSpecialCharacter(rotation)) {
            errors.push("Rotation must not contain any special character!!");
        }
    }
    else if (type === 'GarageDoor') {
        status = req.body.statusGarageDoor;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }
    }
    else if (type === 'RobotVacuumCleaner') {
        status = req.body.statusRobotVacuumCleaner;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationRobotVacuumCleaner;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }
    }
    else if (type === 'RobotWindowCleaner') {
        status = req.body.statusRobotWindowCleaner;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }
    }
    else if (type === 'WindowDimmer') {
        status = req.body.statusWindowDimmer;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationWindowDimmer;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }

        dim = req.body.dim;
        if (isValidPercentage(dim)) {
            errors.push("Dim value must between 0 and 100!!");
        }

    }
    else if (type === 'Lighting') {
        status = req.body.statusLighting;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        location = req.body.locationLighting;
        if (isSpecialCharacter(location)) {
            errors.push("Location must not contain any special character!!");
        }

        color = req.body.colorLighting;
        if (isSpecialCharacter(color)) {
            errors.push("Color must not contain any special character!!");
        }

        light_strength = req.body.lightningStrength;
        if (isValidPercentage(light_strength)) {
            errors.push("Light Sterngth value must between 0 and 100!!");
        }
    }
    else if (type === 'GardenWatering') {
        status = req.body.statusGardenWatering;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        spray_strength = req.body.sprayStrength;
        if (isValidPercentage(spray_strength)) {
            errors.push("Spray Sterngth value must between 0 and 100!!");
        }
    }
    else if (type === 'WaterFountain') {
        status = req.body.statusWaterFountain;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        color = req.body.colorWaterFountain;
        if (isSpecialCharacter(color)) {
            errors.push("Color must not contain any special character!!");
        }
    }
    else if (type === 'DogFeeder') {
        status = req.body.statusDogFeeder;
        if (isSpecialCharacter(status)) {
            errors.push("Status must not contain any special character!!");
        }

        food_amount = req.body.food;
        if (isValidFoodAmount(food_amount)) {
            errors.push("Status must not contain any special character!!");
        }
    }

    if (errors.length > 0) {
        res.render('device/add', { errors })
    }
    else {
        pool.getConnection((err, connection) => {
            if (err) throw err; // Something is wrong, not connected
            console.log('Connected to ID ' + connection.threadId);

            // Purpose: Insert the data of new device in the database
            // Input: All feature of particular device with null/0 to irrelevant fields
            // Output: Message (Whether Operation is a success or some error occured)
            connection.query('INSERT INTO device SET name = ?, type = ?, status = ?, location = ?, outside_air = ?, recirculated_air = ?, mode = ?, actual_temperature = ?, requested_temperature = ?, actual_humidity = ?, requested_humidity = ?, direction = ?, rotation = ?, dim = ?, color = ?, light_strength = ?, spray_strength = ?, food_amount = ?', [name, type, status, location, outside_air, recirculated_air, mode, actual_temperature, requested_temperature, actual_humidity, requested_humidity, direction, rotation, dim, color, light_strength, spray_strength, food_amount], (err, rows) => {
                // When done with the connection release it
                connection.release();

                success.push(name + ' device added successfuly')
                
                pool.getConnection((err, connection) => {
                    if (err) throw err; // Something is wrong, not connected
                    console.log('Connected to ID ' + connection.threadId);
                    // Purpose: Get data of all the devices in data base
                    // Input: None
                    // Output: Set of rows containing data about all features of each device it also include null/0 values to irrelevant fields along with Message (Whether Operation is a success or some error occured)
                    connection.query('SELECT * FROM device', (err, rows) => {
                        // When done with the connection release it
                        connection.release();

                        if (!err) {
                            res.render('device/status', {
                                rows,
                                success
                            })
                        } else {
                            console.log(err);
                        }
                    });
                })
            })
        });
    }

}