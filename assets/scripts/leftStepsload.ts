import { _decorator, Component, Node, Label } from 'cc';
import Move from './Move';
const { ccclass, property } = _decorator;

@ccclass('leftStepsload')
export class leftStepsload extends Component {
    @property(Node)
    player1:Node;
    start() {

    }

    update(deltaTime: number) {
        this.node.getComponent(Label).string=this.player1.getComponent(Move).leftSteps.toString();
    }
}


