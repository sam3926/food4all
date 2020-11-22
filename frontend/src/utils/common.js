import io from "socket.io-client";
import { updateThread } from "../components/messages/actions";
import { getSingleNotification, getUnreadMessage } from "../components/Navbar/actions"
import { store } from "../store";
// let server = "http://localhost:8000";
let server = "/"

let socket;



export const startConnection = () => {

    console.log("someone wants to start connection", socket)

    if (socket) {
        console.log("socket already there")
        return socket;
    }

    const user = store.getState().authReducer.user?.userId;

    socket = io(server, {
        query: `user=${user}`,
        reconnection: true
    });
    socket.on("output_message", thread => {
        // this.props.updateThread(thread);
        store.dispatch(updateThread(thread));
        store.dispatch(getUnreadMessage())
        console.log("WOW... I got it", thread)
    })


    socket.on("notification", notification => {
        store.dispatch(getSingleNotification(notification));
        console.log(notification)
    })

    return socket;

}

export const getSocket = () => {
    return socket;
}


