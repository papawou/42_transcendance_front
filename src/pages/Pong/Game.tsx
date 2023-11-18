import { GameEngineClient } from "@/pong/GameEngineClient";
import { emit, on, socket } from "@/providers/socketio";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { roomId } from ".";
import { isDef } from "@/technical/isDef";
import { useAuth } from "@/components/providers/AuthProvider";
import { WsGame, WsGameEvents } from "@/shared/ws-game";

export const Game = ({ game }: { game: GameEngineClient }) => {
  const { user } = useAuth()
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setTriggerRender] = useState(false);

  //main loop
  const physicsLoop = useCallback(() => {
    setTriggerRender((prev) => !prev);
  }, []);

  const onUpdateGame = useCallback((data: WsGameEvents["updateGame"]["out"]) => {
    game.ge = data;
    game.update();
    const ctx = canvasRef.current?.getContext("2d");
    if (isDef(ctx)) {
      game.draw(ctx)
    }
    physicsLoop();
  }, [game, physicsLoop]);

  useEffect(() => {
    on(WsGame.update, onUpdateGame);
    return () => {
      socket.off("updateGame", onUpdateGame)
    };
  }, [onUpdateGame]);

  //key events
  const sendKey = useCallback((key: KeyboardEvent["key"], isUp: boolean) => {
    const payload = { key, isUp, roomId };
    emit(WsGame.sendKey, payload);
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    sendKey(e.key, false)
  }, [sendKey]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    sendKey(e.key, true)
  }, [sendKey]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, handleKeyUp]);

  const player = useMemo(() => {
    if (!isDef(user)) {
      return undefined
    }
    return game.getPlayer(user.id)?.player;
  }, [game, user])


  if (!isDef(player)) {
    return "An error occured"
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        {
          game.status !== "RUNNING" &&
          <button onClick={() => !player.isReady && socket.emit("setReady", roomId)}>
            {player.isReady ? "WAITING" : "READY"}
          </button>
        }
      </div>
      <h1>
        {
          game.getScores().map(p =>
            <Fragment key={p.userId}>
              {p.userId} - {p.score}
            </Fragment>
          )
        }
      </h1>
      <div>
        <canvas
          tabIndex={1}
          ref={canvasRef}
          width={game.width}
          height={game.height}
          style={{ border: "1px solid red" }}
        ></canvas>
      </div>
    </div >
  );
};
