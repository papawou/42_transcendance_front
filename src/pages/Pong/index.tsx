import { emit } from "@/providers/socketio";
import { isDef } from "@/technical/isDef";
import { useCallback, useEffect, useState } from "react";
import { Game } from "./Game";
import { GameEngineClient } from "@/pong/GameEngineClient";
import { WS_FAIL, WsGame, WsGameOut } from "@/shared/ws-game";

export const roomId = "game:test";

const Pong = () => {
  const [game, setGame] = useState<GameEngineClient | null>(null)

  const ackJoinRoom = useCallback((data: WsGameOut<WsGame.joinRoom>) => {
    if (data === WS_FAIL) {
      console.warn("joinRoom");
      return;
    }
    setGame(new GameEngineClient(data))
  }, []);

  useEffect(() => {
    emit(WsGame.joinRoom, { roomId }, ackJoinRoom);
    return () => {
      emit(WsGame.leaveRoom, { roomId });
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
