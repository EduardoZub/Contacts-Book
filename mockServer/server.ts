const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mockServer/data.json');
const middlewares = jsonServer.defaults();
const db = require('./data.json');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWTSecretKey = 'eduardo-app';
const TOKEN_HEADER_KEY = 'x-access-token';

function readUsers() {
    const dbRaw = fs.readFileSync('mockServer/users.json');
    const users = JSON.parse(dbRaw).users;
    return users;
}

function decode(token) {
    return jwt.verify(token, JWTSecretKey, function (err, decoded) {
        if (decoded) {
            return true;
        } else {
            return false;
        }
    });
}

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res, next) => {
    const users = readUsers();
    const user = users.filter(u => u.username === req.body.username && u.password === req.body.password)[0];
    const userData = {
        id: user.id,
        username: user.username,
        permissions: user.permissions
    }

    if (user) {
        const token = jwt.sign(user, JWTSecretKey);
        res.send({
            user: userData,
            token: token
        });
    } else {
        res.status(401).send('Incorrect username or password');
    }
});

server.post('/contacts', (req, res, next) => {
    const accessToken = req.get(TOKEN_HEADER_KEY);
    req.body.id = uuidv4();
    if (decode(accessToken)) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

server.put('/contacts/:id', (req, res, next) => {
    const accessToken = req.get(TOKEN_HEADER_KEY);
    if (decode(accessToken)) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

server.use(function (req, res, next) {
    if (req.method !== 'POST' && req.method !== 'DELETE' && req.method !== 'PUT') {
        setTimeout(next, 2000);
        return;
    }
    next();
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
