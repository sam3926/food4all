const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// const passport = require("passport");

//IMPORT all routes

const userRoutes = require("./routes/users")
const uploadRoutes = require('./routes/upload')
const postRoutes = require("./routes/posts")
const commentRoutes = require("./routes/comment")
const app = express();
const PORT = process.env.PORT || 8000

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));//statically serving images

app.use(cors())//Enabling CORS

const { Chat } = require("./models/Chat");

app.use('/api/chat', require('./routes/chat'));

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
app.use("/api/comment",commentRoutes);

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

//app.listen(PORT, () => console.log(`Server up and running on port ${port} !`));

io.on("connection", socket => {

    socket.on("Input Chat Message", msg => {
  
      connect.then(db => {
        try {
            let chat = new Chat({ message: msg.chatMessage, sender:msg.userId, type: msg.type })
  
            chat.save((err, doc) => {
              console.log(doc)
              if(err) return res.json({ success: false, err })
  
              Chat.find({ "_id": doc._id })
              .populate("sender")
              .exec((err, doc)=> {
  
                  return io.emit("Output Chat Message", doc);
              })
            })
        } catch (error) {
          console.error(error);
        }
      })
     })
  
  })


// const multer = require("multer");
// const fs = require("fs");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`)
//   },
//   // fileFilter: (req, file, cb) => {
//   //   const ext = path.extname(file.originalname)
//   //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
//   //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
//   //   }
//   //   cb(null, true)
//   // }
// })
 
// var upload = multer({ storage: storage }).single("file")

// app.post("/api/chat/uploadfiles", auth ,(req, res) => {
//   upload(req, res, err => {
//     if(err) {
//       return res.json({ success: false, err })
//     }
//     return res.json({ success: true, url: res.req.file.path });
//   })
// });