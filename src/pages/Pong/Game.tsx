import { GameEngineClient } from "@/pong/client/GameEngineClient";
import { socket } from "@/providers/socketio";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { roomId } from ".";
import { isDef } from "@/technical/isDef";
import { GameEngineData } from "../../pong/base/pong";


const userId = "a"

export const Game = ({ game }: { game: GameEngineClient }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setTriggerRender] = useState(false);

  //main loop
  const physicsLoop = useCallback(() => {
    setTriggerRender((prev) => !prev);
  }, []);

  const onUpdateGame = useCallback((data: GameEngineData) => {
    game.ge = data;
    game.update();
    const ctx = canvasRef.current?.getContext("2d");
    if (isDef(ctx)) {
      game.draw(ctx)
    }
    physicsLoop();
  }, [game, physicsLoop]);

  useEffect(() => {
    socket.on("updateGame", onUpdateGame);
    return () => {
      socket.off("updateGame", onUpdateGame)
    };
  }, [onUpdateGame]);

  //key events
  const sendKey = useCallback((key: KeyboardEvent["key"], isUp: boolean) => {
    socket.emit("sendKey", { roomId, event: { key, isUp } });
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

  const player = game.getPlayer(userId)?.player;
  if (!isDef(player)) {
    return "Inconsistency detected"
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
