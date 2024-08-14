import { WebSocket } from "ws";
import Game from "./Game";
import { INIT_GAME, GAME_OVER, MOVE } from "./messages";

export default class GameManager {
  private games: Game[];
  private users: WebSocket[];
  private pendingUser: WebSocket | null;

  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUser = null;
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.messageHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
  }

  private messageHandler(socket: WebSocket) {
    socket.on('message', (data) => {

      const message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
        if (game) {
          game.makeMove(socket, message.payload);
        }
      }

    })
  }
}