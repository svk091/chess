import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess, WHITE } from "chess.js";
import { INIT_GAME, MOVE, GAME_OVER } from "./messages";

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState<Chess>(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setIsGameStarted(true);
          break;

        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;

        case GAME_OVER:
          message.winner === WHITE ? alert('White wins the game') : alert('Black Wins the game')
          console.log('game over')
          console.log(message.winner);

          window.location.reload()
          break;
      }
    }
  }, [socket])

  if (!socket) return <div>Connecting.......</div>;
  return <div>
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
      <div className="col-span-9 flex justify-center items-center">
        <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} />
      </div>
      <div className="col-span-3 flex items-center">
        {!isGameStarted && <Button onClick={() => {
          socket.send(JSON.stringify({ type: INIT_GAME }))
        }}>
          Play Now
        </Button>}
      </div>
    </div>
  </div>
}