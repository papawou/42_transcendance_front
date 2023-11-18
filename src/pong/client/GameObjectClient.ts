import { BodyRigid } from "../base/physics/rigid/BodyRigid";
import { drawCircle, drawRect } from "../utils/draw";
import { GameObject } from "@/pong/base/GameObject";

export class GameObjectClient<T extends BodyRigid = BodyRigid> extends GameObject<T> {

    draw(ctx: CanvasRenderingContext2D) {
        switch (this.prevState.shape) {
            case "circle":
                ctx.fillStyle = "blue"
                drawCircle(this.prevState, ctx);
                break;
            case "box":
                ctx.fillStyle = "green"
                drawRect(this.prevState, ctx);
                break;
        }
    }
}