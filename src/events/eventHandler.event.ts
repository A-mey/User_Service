import { Socket } from "socket.io";
import { events } from "../enums/events.enum";
import EventCallBack from "./getEventCall.event";

class EventHandler {
    handleEvent = async (socket: Socket) => {
        const eventKeys = Object.keys(events);
        eventKeys.forEach((event: string) => {
            socket.on(event, (message) => {
                let response = EventCallBack.process(socket, event, message);
                const keyOfEvents: (keyof typeof events) = event as (keyof typeof events);
		        socket.emit(events[keyOfEvents], response);
            });
        });
    }
}

export default new EventHandler();