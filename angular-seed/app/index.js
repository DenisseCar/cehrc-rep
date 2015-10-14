var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	flash = require('connect-flash'),
	session = require('express-session'),
	less = require('less-middleware'),
	routes = express.Router(),
	app = express();
    app2 = express();


var config = {
  ODATA: {
    HOST: 'localhost',
    PORT: 8001
  },
  RDBMS: {
    ADMIN_USER: 'root',
    ADMIN_PASSWORD: '',
    DB_HOST: 'localhost',
    DB_PORT: '3306',
    DATABASE: 'employees',
    OPTIONS: { encrypt: false }
  }
};

var odataserver = require('odataserver');
var server = new odataserver(config);

/// Basic Setup
app.use(session({ 
	secret: 'keyboard cat',
	saveUninitialized: true,
	resave: true
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.init(app2);
// app.use(less(path.join(__dirname, 'ui')));


/// Serve UI files
app.use('/', express.static(path.join(__dirname, '/')))
// app.use(express.static(path.join(__dirname, 'ui')))

app.listen(8000);

app2.listen(config.ODATA.PORT, function() {
  console.log('OData Server listening at http://%s:%s',
              config.ODATA.HOST, config.ODATA.PORT);
});
