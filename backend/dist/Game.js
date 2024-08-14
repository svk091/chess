"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: chess_js_1.WHITE
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: chess_js_1.BLACK
            }
        }));
    }
    makeMove(socket, move) {
        if ((this.board.turn() === chess_js_1.WHITE && socket !== this.player1) || (this.board.turn() === chess_js_1.BLACK && socket !== this.player2)) {
            return;
        }
        ;
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
            return;
        }
        if (this.board.isGameOver()) {
            const payload = JSON.stringify({
                type: messages_1.GAME_OVER,
                winner: this.board.turn() === chess_js_1.WHITE ? chess_js_1.BLACK : chess_js_1.WHITE
            });
            this.player1.send(payload);
            this.player2.send(payload);
            return;
        }
        if (this.board.turn() === chess_js_1.WHITE) {
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
    }
}
exports.default = Game;
