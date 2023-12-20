import { GameEngineClient } from "./GameEngineClient";

export const getSidePlayer = (game: GameEngineClient, side: "left" | "right") => {
    for (const [playerId, player] of game.players) {
        if (playerId === side) {
            return player
        }
    }
    return undefined
}