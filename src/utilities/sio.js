import io from "socket.io-client";

const sio = io(`http://${location.hostname}:65432`);

export default sio;