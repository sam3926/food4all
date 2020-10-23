const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
// const passport = require("passport");

//IMPORT all routes

const userRoutes = require("./routes/api/users")
const uploadRoutes = require('./routes/upload')

const app = express();
const PORT = process.env.PORT || 8000

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));//statically serving images

app.use(cors())//Enabling CORS



app.get('/api/test', (req, res) => {//TEST ROUTE
    res.json({ "yes": "no" })
})


app.use('/upload', uploadRoutes)

// Passport middleware
// app.use(passport.initialize());

// Passport config
// require("./config/passport")(passport);

// Routes
app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {// Error Handling
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

//CONECTING TO MONGODB

const MONGO_URI = "mongodb+srv://arpit:arpit@cluster0.lr4ce.mongodb.net/techsite?retryWrites=true&w=majority" //-- ORIGINAL DB

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(res => {
    app.listen(PORT, () => {
        console.log('server started')
    })
}).catch(err => {
    console.log("error with connecting to db")
})

//app.listen(PORT, () => console.log(`Server up and running on port ${port} !`));
