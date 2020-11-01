import io from "socket.io-client";
import { updateThread } from "../components/messages/actions";
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
        console.log("WOW... I got it", thread)
    })
    return socket;

}

export const getSocket = () => {
    return socket;
}


