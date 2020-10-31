const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
// const passport = require("passport");

//IMPORT all routes

const userRoutes = require("./routes/users")
const uploadRoutes = require('./routes/upload')
const postRoutes = require("./routes/posts")
const commentRoutes = require("./routes/comment")
const messageRoutes = require("./routes/message");
const Thread = require('./models/Thread');
const { initiateSocket } = require('./routes/utils');
const app = express();
const server = require("http").createServer(app);
// const io = require("socket.io")(server);
const io = initiateSocket(server)


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
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/message", messageRoutes)

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
    useCreateIndex: true,
    useFindAndModify: false
}).then(res => {
    server.listen(PORT, () => {
        console.log('server started')
    })
}).catch(err => {
    console.log("error with connecting to db")
})
