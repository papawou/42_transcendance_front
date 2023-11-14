import { socket } from "@/providers/socketio";
import { isDef } from "@/technical/isDef";
import { useCallback, useEffect, useState } from "react";
import { Game } from "./Game";
import { GameEngineClient } from "@/pong/client/GameEngineClient";
import { GameEngineData } from "../../pong/base/pong";

export const roomId = "test";

const Pong = () => {
  const [game, setGame] = useState<GameEngineClient | null>(null)

  const ackJoinRoom = useCallback((data: GameEngineData) => {
    setGame(new GameEngineClient(data))
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", roomId, ackJoinRoom);
    return () => {
      socket.emit("leaveRoom", roomId);
      setGame(null);
    };
  }, [ackJoinRoom]);

  return (
    <div>
      <h1>PONG</h1>
      <div>{isDef(game) ? <Game game={game} /> : "Loading..."}</div>
    </div>
  );
};

export default Pong;
