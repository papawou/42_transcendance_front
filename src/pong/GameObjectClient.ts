import { GameObject } from "@/shared/pong/GameObject";
import { BodyRigid } from "@/shared/pong/physics/rigid/BodyRigid";
import { drawCircle, drawRect } from "./utils/draw";

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