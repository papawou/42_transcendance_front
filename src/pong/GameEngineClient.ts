import { isDef } from "@/technical/isDef";
import { GameObjectClient } from "./GameObjectClient";
import { GameEngine } from "@/shared/pong/GameEngine";
import { GameEngineData } from "@/shared/pong/pong";
import Scene from "@/shared/pong/Scene";
import { Physics } from "@/shared/pong/physics/Physics";
import { Player } from "@/shared/pong/Player";

export class GameEngineClient extends GameEngine<GameObjectClient> {
    ctx?: CanvasRenderingContext2D | null = null;
    postLoop?: (() => void) | null = null;
    ge?: GameEngineData;

    constructor(ge: GameEngineData) {
        const scene = new Scene(ge.sc.objs.map(obj => new GameObjectClient(obj.body, obj.id, obj.prevState)))
        const physics = new Physics(1 / 60, ge.physics.currentTime, ge.physics.accumulator)
        super(ge.roomId, ge.width, ge.height, scene, physics)
        this.ge = ge;
        this.update()
    }

    start(ctx?: CanvasRenderingContext2D | null, postLoop?: (() => void)) {
        this.ctx = ctx;
        this.postLoop = postLoop
        super.start()
    }

    stop() {
        super.stop();
        this.postLoop = null;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.sc.objs.forEach(obj => obj.draw(ctx))
    }

    loop() {
        super.loop()
        if (isDef(this.ctx)) {
            this.draw(this.ctx)
        }
        this.update();
        this.postLoop?.()
    }

    getScores(): Player[] {
        return Array.from(this.players.values()).filter(isDef)
    }

    update() {
        if (!isDef(this.ge)) {
            return;
        }

        this.sc.objs = this.ge.sc.objs.map(obj => new GameObjectClient(obj.body, obj.id, obj.prevState))
        this.width = this.ge.width
        this.height = this.ge.height
        this.status = this.ge.status

        this.players.clear()
        this.playersBar.clear()

        this.ge.players.forEach(p => {
            const userPlayer = isDef(p.user) ? new Player(p.user.userId, p.user.score, p.user.isReady) : undefined
            this.players.set(p.playerId, userPlayer)
            if (isDef(p.barId)) {
                this.playersBar.set(p.playerId, p.barId)
            }
        })

        this.ge = undefined;
    }
}