const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const node_acl = require('acl')
const cookieParser = require('cookie-parser');

//Keys for Deployment
const config = require('./config/keys')
const { ensureAuthenticated } = require('./config/auth')

let app = express()

//Passport Config
require('./config/passport')(passport)


let acl;
mongoose.connect(config.MONGODB_URI,
    { useCreateIndex: true, useNewUrlParser: true },
    (err, db) => {
        if (err) throw err
        acl = new node_acl(new node_acl.mongodbBackend(db, 'acl_'));
        acl.allow([{
            role: 'admin',
            allows: [{
                resources: '/',
                permissions: '*'
            }]
        }]);
    })
    .then(() => {
        console.log('Database Connected');
    })
    .catch(err => console.error(err));
mongoose.set('useFindAndModify', false)


// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3001', 'http://localhost:8081']
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// Then pass them to cors:
app.use(cors());

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')
//app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

//Cookie Parser
app.use(cookieParser())



// Connect Flash
app.use(flash())

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin/index'))
app.use('/account', require('./routes/admin/account'))
app.use('/api', require('./routes/admin/exercise'))
app.use('/api', require('./routes/api/cycle'))
app.use('/api', require('./routes/api/measurement'))
app.use('/api', require('./routes/api/routine'))
app.use('/api', require('./routes/api/records'))
//app.use('/cycle', require('./routes/api/cycle'))

// Start Node.js Server

app.set('port', config.PORT)
app.listen(app.get('port'), () => {
    console.log('Up and running!');
    //mongoose.connect(
    //  config.MONGODB_URI, { useNewUrlParser: true }
    //);
})













/*

// Boot Server
const boot = () => {
    app.listen(app.get('port'), ()=> {
        mongoose.connect(
            config.MONGODB_URI, { useNewUrlParser: true }
        );
    })
}

const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})

// Shutdown Server
const shutdown = () => {
    server.close()
}

/*
*   Boot object depending on either test or run
if(require.main == module){
    boot()
} else{
    console.info('Running app as module')
    exports.boot = boot
    exports.shutdown = shutdown
    exports.port = app.get('port')
}
*/