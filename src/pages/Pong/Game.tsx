import { GameEngineClient } from "@/pong/GameEngineClient";
import { emit, on, socket } from "@/providers/socketio";
import { useCallback, useEffect, useRef, useState } from "react";
import { isDef } from "@/technical/isDef";
import { useAuth } from "@/components/providers/AuthProvider";
import { WS_FAIL, WsGame, WsGameOut } from "@/shared/ws-game";

export const Game = ({ game }: { game: GameEngineClient }) => {
	const { user } = useAuth()
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [, setTriggerRender] = useState({});

	const onUpdateGame = useCallback((data: WsGameOut<WsGame.metaGetGame>) => {
		if (data === WS_FAIL) {
			console.log("onupdategame - inconsistent")
			return;
		}
		game.ge = data;
		game.update();
		const ctx = canvasRef.current?.getContext("2d");
		if (isDef(ctx)) {
			game.draw(ctx)
		}
		setTriggerRender({});
	}, [game]);

	useEffect(() => {
		on(WsGame.metaGetGame, onUpdateGame);
		emit(WsGame.metaGetGame, undefined);
		return () => {
			socket.off("updateGame", onUpdateGame)
		};
	}, [onUpdateGame]);

	//key events
	const sendKey = useCallback((key: KeyboardEvent["key"], isUp: boolean) => {
		const payload = { key, isUp, gameId: game.gameId };
		emit(WsGame.sendKey, payload)
	}, [game])

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

	const player = !isDef(user) ? undefined : game.getPlayer(user.id)?.player;
	if (!isDef(player)) {
		return "An error occured"
	}
	return (
		<div>
			<div style={{ display: "flex" }}>
				{
					!player.isReady &&
					<button onClick={() => emit(WsGame.setReady, { gameId: game.gameId })}>
						{player.isReady ? "WAITING" : "READY"}
					</button>
				}
			</div>
			<h1>
				{
					game.getScores().map(p => (
						<div key={p.userId}>
							{p.userId} - {p.score}
						</div>
					))
				}
			</h1>
			<h2>{game.status}</h2>
			{
				game.status == "CLOSED" && game.closed_reason
			}
			<div>
				<canvas
					tabIndex={1}
					width={1000}
					height={1000 * (game.width / game.height)}
					style={{ width: "100%" }}
					ref={canvasRef}
				></canvas>
			</div>
		</div >
	);
};
