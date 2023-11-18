import { useUserGame } from "@/components/providers/UserGameProvider";
import { WS_FAIL, WsGame, WsGameOut } from "@/shared/ws-game";
import { isDef } from "@/technical/isDef";
import { Game } from "./Game";
import { useCallback, useEffect, useState } from "react";
import { emit, socket } from "@/providers/socketio";
import { GameEngineClient } from "@/pong/GameEngineClient";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Paths from "@/technical/Paths";

const PongContent = () => {
  const userGame = useUserGame();
  const navigate = useNavigate()

  useEffect(() => {
    if (!isDef(userGame) || !isDef(userGame.gameId)) {
      return;
    }
    navigate({
      pathname: Paths.Pong,
      search: createSearchParams({
        gameId: userGame.gameId
      }).toString()
    })
  }, [navigate, userGame])

  switch (userGame?.status) {
    case "SEARCHING":
      return "Search game..."
    case "PASSIVE":
      return <button onClick={() => emit(WsGame.search, undefined)}>search</button>
  }
  return "loading UserGame..."
}

const WrapGame = ({ gameId }: { gameId: string }) => {
  const [game, setGame] = useState<GameEngineClient | null>()
  const [joined, setJoined] = useState<boolean>(true)

  useEffect(() => {
    emit(WsGame.joinRoom, { gameId }, (data) => setJoined(data))
  }, [gameId])

  const handleInitGame = useCallback((gameData: WsGameOut<WsGame.metaGetGame>) => {
    if (gameData === WS_FAIL) {
      console.log("handleInitGame - inconsistent")
      return;
    }
    setGame(new GameEngineClient(gameData))
  }, [])
  useEffect(() => {
    socket.once(WsGame.metaGetGame, handleInitGame)
    emit(WsGame.metaGetGame, undefined)
  }, [handleInitGame])

  if (joined === false) {
    return "Can't join the room"
  }
  if (!isDef(game) || joined !== true) {
    return "loading game..."
  }
  return <Game game={game} />
}

export function Pong() {
  const [params] = useSearchParams()

  const gameId = params.get("gameId")
  return (
    <div>
      <h1>PONG</h1>
      <button onClick={() => { emit(WsGame.debug, undefined, (data) => console.log(data)) }}>DEBUG</button>
      <div>
        {
          !isDef(gameId) ? <PongContent /> : <WrapGame gameId={gameId} />
        }
      </div>
    </div>
  )
}