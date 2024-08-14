import { Square, PieceSymbol, Color, BLACK } from "chess.js";
import { useState } from "react";
import { MOVE, SQUARE_COORDINATES } from "../pages/messages";
import { Chess } from 'chess.js'

export const ChessBoard = ({ chess, setBoard, board, socket }: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][],
  socket: WebSocket,
  chess: Chess,
  setBoard: React.Dispatch<React.SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]>>
}) => {

  const [from, setFrom] = useState<Square | null>(null);

  return (
    <div>
      {
        board.map((row, i) => {
          return <div key={i} className="flex">
            {
              row.map((square, j) => {
                return <button onClick={() => {
                  const sc = SQUARE_COORDINATES[i][j];
                  if (!from) {
                    setFrom(sc);
                  } else {
                    try {
                      socket.send(JSON.stringify({
                        type: MOVE,
                        payload: {
                          from: from,
                          to: sc
                        }
                      }))
                      chess.move({
                        from: from,
                        to: sc
                      });
                    } catch (e) {
                      console.log(e);
                      setFrom(null);
                    }
                    console.log(chess.moveNumber());

                    console.log(chess.isCheckmate());

                    setBoard(chess.board());
                    setFrom(null);
                  }
                }} key={j} className={`w-16 h-16 font-bold text-black ${(i + j) % 2 === 0 ? 'bg-lime-100 focus:bg-lime-400' : 'bg-lime-600 focus:bg-lime-700'} focus:text-2xl flex justify-center items-center`}>
                  {
                    square ? <img className="h-12 w-12" src={`/${square.color === BLACK ? square.type : square.type.toUpperCase()}.png`} /> : null
                  }
                </button>
              })
            }
          </div>
        })
      }
    </div>
  )
}