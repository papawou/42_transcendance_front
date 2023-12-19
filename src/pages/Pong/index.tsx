import { useUserGame } from "@/components/providers/UserGameProvider";
import { WS_FAIL, WsGame, WsGameOut } from "@/shared/ws-game";
import { isDef } from "@/technical/isDef";
import { Game } from "./Game";
import { useCallback, useEffect, useState } from "react";
import { emit, socket } from "@/services/socketio";
import { GameEngineClient } from "@/pong/GameEngineClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "@/services/AxiosInstance";
import Paths from "@/technical/Paths";

const WrapGame = ({ gameId }: { gameId: string }) => {
  const [game, setGame] = useState<GameEngineClient | null>()
  const [joined, setJoined] = useState<boolean>(true)

  useEffect(() => {
    emit(WsGame.joinRoom, { gameId }, (data) => setJoined(data))
  }, [gameId])

  const handleInitGame = useCallback((gameData: WsGameOut<WsGame.metaGetGame>) => {
    if (gameData === WS_FAIL) {
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
  const userGame = useUserGame();
  const navigate = useNavigate()

  const gameId = params.get("gameId")

  useEffect(() => {
    const tmpId = userGame?.gameId
    if (!isDef(gameId) && isDef(tmpId)) {
      navigate({
        pathname: Paths.Pong,
        search: `?gameId=${tmpId}`
      })
    }
  }, [gameId, navigate, userGame?.gameId])

  if (!isDef(userGame)) {
    return <span>Chargement du profil de jeu...</span>
  }

  return (
    <div>
      {
        isDef(gameId) ? <WrapGame gameId={gameId} /> :
          <>
            <button onClick={() => emit(WsGame.debug, {gameId: true})}>
              debug
            </button>
            <button onClick={() => axiosInstance.post(userGame.search ? "/games/search/cancel" : "/games/search/start")}>
              {userGame.search ? "Annuler la recherche" : "Rechercher une partie"}
            </button>
          </>
      }
    </div >
  )
}