const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const methodOverride = require('method-override')
const path = require('path')

// apply routes
const indexRoutes = require('./routes/index')
const adminRoutes = require('./routes/admin')
const eventRoutes = require('./routes/classes')

// apply middleware
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method'))
app.locals.moment = require('moment')

// connect database
const url = process.env.DATABASEURL || 'mongodb://localhost/quiz'
mongoose.connect(url, {useMongoClient: true})

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Once again Rusty wins cutest dog!',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', indexRoutes)
app.use('/admin', adminRoutes)
app.use('/admin/class', eventRoutes)

// port config
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
