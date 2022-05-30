import { io } from "socket.io-client";
const socket = io('http://localhost:2333')
export default socket