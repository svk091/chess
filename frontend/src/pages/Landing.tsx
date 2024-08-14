import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="flex justify-center items-center">
        <img className="h-4/5" src={"/chessboard.jpeg"} alt="" />
      </div>
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Play chess like a champion, online now</h1>
        <Button onClick={() => navigate("/game")}>Play Online</Button>
      </div>
    </div>
  )
}