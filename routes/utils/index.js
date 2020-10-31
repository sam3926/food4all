let io;


let onlineUsers = {}

module.exports.initiateSocket = (server) => {
    io = require("socket.io")(server);

    io.on('connection', socket => {
        let user = socket.handshake.query.user
        console.log("something brewing", socket.handshake.query.user);
        onlineUsers[user] = socket;
        console.log(Object.keys(onlineUsers).length)
    })

    io.on('disconnect', socket => {
        console.log("someone disconnected")
    })


    return io;
}

module.exports.getOnlineUsers = () => {
    return onlineUsers;
}


module.exports.getSocket = () => {
    return io;
}