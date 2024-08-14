"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = __importDefault(require("./GameManager"));
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.default();
wss.on('connection', (ws) => {
    gameManager.addUser(ws);
    ws.on('error', (e) => {
        console.error(e);
    });
    ws.on('close', () => gameManager.removeUser(ws));
});
