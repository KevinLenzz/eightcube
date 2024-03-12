import { _decorator, Component, Node, Label, Script } from 'cc';
import Move from './Move';
const { ccclass, property } = _decorator;

@ccclass('scoreload')
export class scoreload extends Component {
    @property(Node)
    player1:Node;
    start() {

    }

    update(deltaTime: number) {
        this.node.getComponent(Label).string=this.player1.getComponent(Move).score.toString();
    }
}


