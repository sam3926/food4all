const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

//IMPORT all routes

const authRoutes = require('./routes/auth')
// const donorRoutes = require('./routes/donor');
// const organisationRoutes = require('./routes/organisation');
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

app.use('/api/auth', authRoutes)
// app.use('/api/donor', donorRoutes);
// app.use('/api/organisation', organisationRoutes);
app.use('/upload', uploadRoutes)

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


