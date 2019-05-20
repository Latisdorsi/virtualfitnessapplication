const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const node_acl = require('acl')
const cookieParser = require('cookie-parser');

//Keys for Deployment
const config = require('./config/keys')

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

//Cookie Parser
app.use(cookieParser())

app.use('/admin', require('./routes/admin/index'))
app.use('/account', require('./routes/admin/account'))
app.use('/api/exercise', require('./routes/admin/exercise'))
app.use('/api', require('./routes/api/cycle'))
app.use('/api', require('./routes/api/measurement'))
app.use('/api', require('./routes/api/routine'))
app.use('/api', require('./routes/api/records'))
//app.use('/cycle', require('./routes/api/cycle'))

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Start Node.js Server
app.set('port', config.PORT)
app.listen(app.get('port'), () => {
    console.log(`Server Listening at Port '${config.PORT}'`);
})
