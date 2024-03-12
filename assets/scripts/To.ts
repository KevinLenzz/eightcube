import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('To')
export class To extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
    startGame(){
        director.loadScene("bdy");
    }
}


