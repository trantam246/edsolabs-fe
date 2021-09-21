const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true }));
const router = jsonServer.router('db.json');
server.use(middlewares);

server.use('/login', (req, res, next) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'demo') {
    res.send({
      token: '123',
    });
    next();
  } else {
    res.send({
      token: '404',
    });
  }
});

server.use(router);
server.listen(8080, () =>
  console.log('API is running on http://localhost:8080/')
);
