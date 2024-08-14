import { WebSocket } from "ws";
import { Chess, WHITE, BLACK } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export default class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();

    this.player1.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        color: WHITE
      }
    }));

    this.player2.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        color: BLACK
      }
    }));
  }

  makeMove(socket: WebSocket, move: { from: string, to: string }) {
    if ((this.board.turn() === WHITE && socket !== this.player1) || (this.board.turn() === BLACK && socket !== this.player2)) {
      return;
    };

    try {
      this.board.move(move);
    } catch (error) {
      console.log(error);
      return;
    }

    if (this.board.isGameOver()) {
      const payload = JSON.stringify({
        type: GAME_OVER,
        winner: this.board.turn() === WHITE ? BLACK : WHITE
      })
      this.player1.send(payload);
      this.player2.send(payload);
      return;
    }

    if (this.board.turn() === WHITE) {
      this.player1.send(JSON.stringify({
        type: MOVE,
        payload: move
      }))
    } else {
      this.player2.send(JSON.stringify({
        type: MOVE,
        payload: move
      }))
    }
  }
}