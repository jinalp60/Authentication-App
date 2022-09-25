
const express = require('express');
const app = express();
const cors = require('cors');

const fs = require('fs');
let users = [];
fs.readFile('./DB.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        // parse JSON string to JSON object
        users = JSON.parse(data);
        console.log("users", users);
    }

});

const bodyParser = require('body-parser');
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: 102410241024,
    extended: true
}));

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//  Connect all our routes to our application
app.post('/registerUser', (req, res, next) => {
    console.log("register user req:", req.body);
    users.push(req.body);
    const data = JSON.stringify(users);

    fs.writeFile('./DB.json', data, 'utf8', (err) => {

        if (err) {
            console.log(`Error writing file: ${err}`);
            res.status(200).json({ message: "error registering user" });
        } else {
            console.log(`File is written successfully!`);
            res.status(200).json({ message: "user registered" });
        }
    });

})

app.post('/userLogin', (req, res, next) => {
    console.log("user login req:", req.body);
    let flag = false;
    for (let user of users) {
        console.log("user:", user);
        if (req.body.name == user.name && req.body.password == user.password) {
            flag = true;
            console.log("true");
            res.status(200).json({ isLogIn: true });
        }
    }
    if (!flag) {
        res.status(200).json({ isLogIn: false });
    }

})

app.get('/getUserProfile/:name', (req, res, next) => {
    let flag = false;
    for (let user of users) {
        if (user.name == req.params.name) {
            flag = true;
            res.status(200).json(user);
            break;
        }
    }
    if (!flag) {
        res.status(200).json({ isUserFound: false });
    }
})

app.patch('/updateUserProfile', (req, res, next) => {
    console.log("register user req:", req.body);
    let flag = false;

    for (let user of users) {
        console.log("user:", user);
        if (req.body.name == user.name) {
            flag = true;
            console.log("true");
            user.password = req.body.password;
            user.bio = req.body.bio;
            user.email = req.body.email;
            user.phone = req.body.phone;
            break;
        }
    }

    if (flag) {
        console.log(users);
        const data = JSON.stringify(users);

        fs.writeFile('./DB.json', data, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(200).json({ message: "error registering user" });
            } else {
                console.log(`File is written successfully!`);
                res.status(200).json({ isUpdated: true });
            }
        });
    } else {
        console.log("user not found");
        res.status(200).json({ isUpdated: false });
    }


})

const server = app.listen(8000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})