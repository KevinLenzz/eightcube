import { _decorator, Component, Node, director, Collider2D, Contact2DType, IPhysics2DContact, input, Input, EventKeyboard, KeyCode, tween, Vec3, ITweenOption, Tween, Quat, Sprite, loader, assetManager, resources, SpriteFrame, ParticleSystem2D } from 'cc';
import { leftStepsload } from './leftStepsload';
const { ccclass, property } = _decorator;

@ccclass('Move')
export default class Move extends Component{
    restartGame(){
        director.loadScene("bdy");
        this.gmov.active=false;
    }
    Rand = (Min: number, Max: number) => {
        switch (Min) {
            case 0: return Math.round(Math.random() * Max);
            case 1: return Math.ceil(Math.random() * Max);
            default: return Math.round(Math.random() * (Max - Min) + Min);
        }
    }
    score:number;
    leftSteps:number;
    @property(Node)
    gmov:Node;
    @property(Node)
    circle1:Node;
    name1:SpriteFrame[]=[];
    @property(Node)
    circle2:Node;
    name2:SpriteFrame[]=[];
    @property(Node)
    circle3:Node;
    name3:SpriteFrame[]=[];
    @property(Node)
    circle4:Node;
    name4:SpriteFrame[]=[];
    allow:boolean;
    point:number=7;
    @property(Node)
    cupa:Node;
    @property(Node)
    cupb:Node;
    @property(Node)
    cupc:Node;
    @property(Node)
    cupd:Node;
    @property(Node)
    cupe:Node;
    @property(Node)
    cupf:Node;
    @property(Node)
    cupg:Node;
    @property(Node)
    cuph:Node;
    onLoad () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.allow=true;
        this.score=0;
        this.leftSteps=40;
    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    async onKeyDown (event: EventKeyboard) {
        if(this.leftSteps>0){
        let tweenDuration: number = 0.5;
        switch(event.keyCode) {
            case KeyCode.KEY_D:
                if(this.point!=3&&this.point!=6&&this.point!=9&&this.allow==true){
                    this.allow=false;
                    tween(this.node)
                    .to(tweenDuration, { position: new Vec3(this.node.position.x+145, this.node.position.y, 0) ,angle:0}, {  // 这里以node的位置信息坐标缓动的目标 
                    easing: 'quintInOut'
                    })
                    .call(()=>{this.allow=true;}).start();                                             // 调用 start 方法，开启缓动
                    this.point+=1;
                    this.turn(tweenDuration);
                    this.leftSteps--;
                }
                break;
            case KeyCode.KEY_A:
                if(this.point!=1&&this.point!=4&&this.point!=7&&this.allow==true){
                    this.allow=false;
                    tween(this.node)
                    .to(tweenDuration, { position: new Vec3(this.node.position.x-145, this.node.position.y, 0) ,angle:0}, {  // 这里以node的位置信息坐标缓动的目标 
                    easing: 'quintInOut'
                    })
                    .call(()=>{this.allow=true;}).start();                                             // 调用 start 方法，开启缓动
                    this.point-=1;
                    this.turn(tweenDuration);
                    this.leftSteps--;
                }
                break;
            case KeyCode.KEY_W:
                if(this.point!=1&&this.point!=2&&this.point!=3&&this.allow==true){
                    this.allow=false;
                    tween(this.node)
                    .to(tweenDuration, { position: new Vec3(this.node.position.x, this.node.position.y+145, 0) ,angle:90}, {  // 这里以node的位置信息坐标缓动的目标 
                    easing: 'quintInOut'
                    })
                    .call(()=>{this.allow=true;}).start();                                             // 调用 start 方法，开启缓动
                    this.point-=3;
                    this.turn(tweenDuration);
                    this.leftSteps--;
                }
                break;
            case KeyCode.KEY_S:
                if(this.point!=7&&this.point!=8&&this.point!=9&&this.allow==true){
                    this.allow=false;
                    tween(this.node)
                    .to(tweenDuration, { position: new Vec3(this.node.position.x, this.node.position.y-145, 0) ,angle:90}, {  // 这里以node的位置信息坐标缓动的目标 
                    easing: 'quintInOut'
                    })
                    .call(()=>{this.allow=true;}).start();                                             // 调用 start 方法，开启缓动
                    this.point+=3;
                    this.turn(tweenDuration);
                    this.leftSteps--;
                }
                break;
        }
        }
    }
    start() {
        for(let i:number=0;i<8;i++){
            this.name1[i]=this.circle1.children[i].children[0].getComponent(Sprite).spriteFrame;
            this.name2[i]=this.circle2.children[i].children[0].getComponent(Sprite).spriteFrame;
            this.name3[i]=this.circle3.children[i].children[0].getComponent(Sprite).spriteFrame;
            this.name4[i]=this.circle4.children[i].children[0].getComponent(Sprite).spriteFrame;
        }
    }
    update(deltaTime: number) {
        if(this.leftSteps<=0){
            this.gmov.active=true;
        }
        if(this.name1[6]==this.name3[1]){
            this.score+=20;
            this.cupc.getComponent(ParticleSystem2D).enabled=true;
            this.cupc.getComponent(ParticleSystem2D).schedule(()=>{this.cupc.getComponent(ParticleSystem2D).enabled=false;},10,0.5,0.5);
            let ram1:number=this.Rand(0,7);
            this.name1[6]=this.name1[ram1];
            this.circle1.children[6].children[0].getComponent(Sprite).spriteFrame=this.name1[6];
            let ram2:number=this.Rand(0,7);
            this.name3[1]=this.name3[ram2];
            this.circle3.children[1].children[0].getComponent(Sprite).spriteFrame=this.name3[1];
        }
        if(this.name1[5]==this.name3[2]){
            this.score+=20;
            this.cupd.getComponent(ParticleSystem2D).enabled=true;
            this.cupd.getComponent(ParticleSystem2D).schedule(()=>{this.cupd.getComponent(ParticleSystem2D).enabled=false;},10,0.5,0.5);
            let ram1:number=this.Rand(0,7);
            this.name1[5]=this.name1[ram1];
            this.circle1.children[5].children[0].getComponent(Sprite).spriteFrame=this.name1[5];
            let ram2:number=this.Rand(0,7);
            this.name3[2]=this.name3[ram2];
            this.circle3.children[2].children[0].getComponent(Sprite).spriteFrame=this.name3[2];

        }
        if(this.name1[3]==this.name2[0]){
            this.score+=20;
            this.cupa.getComponent(ParticleSystem2D).enabled=true;
            this.cupa.getComponent(ParticleSystem2D).schedule(()=>{this.cupa.getComponent(ParticleSystem2D).enabled=false;},10,0.5,0.5);
            let ram1:number=this.Rand(0,7);
            this.name1[3]=this.name1[ram1];
            this.circle1.children[3].children[0].getComponent(Sprite).spriteFrame=this.name1[3];
            let ram2:number=this.Rand(0,7);
            this.name2[0]=this.name2[ram2];
            this.circle2.children[0].children[0].getComponent(Sprite).spriteFrame=this.name2[0];
        }
        if(this.name1[4]==this.name2[7]){
            this.score+=20;
            this.cupb.getComponent(ParticleSystem2D).enabled=true;
            this.cupb.getComponent(ParticleSystem2D).schedule(()=>{this.cupb.getComponent(ParticleSystem2D).enabled=false;},10,0.5,0.5);
            let ram1:number=this.Rand(0,7);
            this.name1[4]=this.name1[ram1];
            this.circle1.children[4].children[0].getComponent(Sprite).spriteFrame=this.name1[4];
            let ram2:number=this.Rand(0,7);
            this.name2[7]=this.name2[ram2];
            this.circle2.children[7].children[0].getComponent(Sprite).spriteFrame=this.name2[7];
        }
        if(this.name2[5]==this.name4[2]){
            this.score+=20;
            this.cupf.getComponent(ParticleSystem2D).enabled=true;
            this.cupf.getComponent(ParticleSystem2D).schedule(()=>{this.cupf.getComponent(ParticleSystem2D).enabled=false;},10,0.5,0.5);
            let ram1:number=this.Rand(0,7);
            this.name2[5]=this.name2[ram1];
            this.circle2.children[5].children[0].getComponent(Sprite).spriteFrame=this.name2[5];
            let ram2:number=this.Rand(0,7);
            this.name4[2]=this.name4[ram2];
            this.circle4.children[2].children[0].getComponent(Sprite).spriteFrame=this.name4[2];
        }
        if(this.name2[6]==this.name4[1]){
            this.score+=20;
            this.cupe.getComponent(ParticleSystem2D).enabled=true;
            this.cupe.getComponent(ParticleSystem2D).schedule(()=>{this.cupe.getComponent(ParticleSystem2D).enabled=false;},10,0.5,0.5);
            let ram1:number=this.Rand(0,7);
            this.name2[6]=this.name2[ram1];
            this.circle2.children[6].children[0].getComponent(Sprite).spriteFrame=this.name2[6];
            let ram2:number=this.Rand(0,7);
            this.name4[1]=this.name4[ram2];
            this.circle4.children[1].children[0].getComponent(Sprite).spriteFrame=this.name4[1];
        }
        if(this.name4[0]==this.name3[3]){
            this.score+=20;
            this.cupg.getComponent(ParticleSystem2D).enabled=true;
            this.cupg.getComponent(ParticleSystem2D).schedule(()=>{this.cupg.getComponent(ParticleSystem2D).enabled=false;},10,0.5,0.5);
            let ram1:number=this.Rand(0,7);
            this.name4[0]=this.name4[ram1];
            this.circle4.children[0].children[0].getComponent(Sprite).spriteFrame=this.name4[0];
            let ram2:number=this.Rand(0,7);
            this.name3[3]=this.name3[ram2];
            this.circle3.children[3].children[0].getComponent(Sprite).spriteFrame=this.name3[3];
        }
        if(this.name4[7]==this.name3[4]){
            this.score+=20;
            this.cuph.getComponent(ParticleSystem2D).enabled=true;
            this.cuph.getComponent(ParticleSystem2D).schedule(()=>{this.cuph.getComponent(ParticleSystem2D).enabled=false;},10,0.5,0.5);
            let ram1:number=this.Rand(0,7);
            this.name4[7]=this.name4[ram1];
            this.circle4.children[7].children[0].getComponent(Sprite).spriteFrame=this.name4[7];
            let ram2:number=this.Rand(0,7);
            this.name3[4]=this.name3[ram2];
            this.circle3.children[4].children[0].getComponent(Sprite).spriteFrame=this.name3[4];
        }
    }
    turn(tweenDuration:number){
        switch(this.point){
            case 1:
                tween(this.circle1)
                .to(tweenDuration, { angle: this.circle1.angle+90}, {  // 这里以node的位置信息坐标缓动的目标 
                easing: 'expoIn'
                }).call(()=>{
                    this.circle1.angle-=90
                    let tmp1:SpriteFrame=this.circle1.children[0].children[0].getComponent(Sprite).spriteFrame;
                    let tmp2:SpriteFrame=this.circle1.children[1].children[0].getComponent(Sprite).spriteFrame;
                    for(let j=0;j<6;j++){
                        this.name1[j]=this.name1[j+2];
                    }
                    this.name1[6]=tmp1;
                    this.name1[7]=tmp2;
                    for(let j=0;j<8;j++){
                        this.circle1.children[j].children[0].getComponent(Sprite).spriteFrame=this.name1[j];
                    }
                }).start();                                             // 调用 start 方法，开启缓动

                break;
            case 3:
                tween(this.circle2)
                .to(tweenDuration, { angle: this.circle2.angle+90}, {  // 这里以node的位置信息坐标缓动的目标 
                easing: 'expoIn'
                }).call(()=>{
                    this.circle2.angle-=90
                    let tmp1:SpriteFrame=this.circle2.children[0].children[0].getComponent(Sprite).spriteFrame;
                    let tmp2:SpriteFrame=this.circle2.children[1].children[0].getComponent(Sprite).spriteFrame;
                    for(let j=0;j<6;j++){
                        this.name2[j]=this.name2[j+2];
                    }
                    this.name2[6]=tmp1;
                    this.name2[7]=tmp2;
                    for(let j=0;j<8;j++){
                        this.circle2.children[j].children[0].getComponent(Sprite).spriteFrame=this.name2[j];
                    }
                }).start();                                             // 调用 start 方法，开启缓动
                break;
            case 7:
                tween(this.circle3)
                .to(tweenDuration, { angle: this.circle3.angle+90}, {  // 这里以node的位置信息坐标缓动的目标 
                easing: 'expoIn'
                }).call(()=>{
                    this.circle3.angle-=90
                    let tmp1:SpriteFrame=this.circle3.children[0].children[0].getComponent(Sprite).spriteFrame;
                    let tmp2:SpriteFrame=this.circle3.children[1].children[0].getComponent(Sprite).spriteFrame;
                    for(let j=0;j<6;j++){
                        this.name3[j]=this.name3[j+2];
                    }
                    this.name3[6]=tmp1;
                    this.name3[7]=tmp2;
                    for(let j=0;j<8;j++){
                        this.circle3.children[j].children[0].getComponent(Sprite).spriteFrame=this.name3[j];
                    }
                }).start();                                             // 调用 start 方法，开启缓动
                break;
            case 9:
                tween(this.circle4)
                .to(tweenDuration, { angle: this.circle4.angle+90}, {  // 这里以node的位置信息坐标缓动的目标 
                easing: 'expoIn'
                }).call(()=>{
                    this.circle4.angle-=90
                    let tmp1:SpriteFrame=this.circle4.children[0].children[0].getComponent(Sprite).spriteFrame;
                    let tmp2:SpriteFrame=this.circle4.children[1].children[0].getComponent(Sprite).spriteFrame;
                    for(let j=0;j<6;j++){
                        this.name4[j]=this.name4[j+2];
                    }
                    this.name4[6]=tmp1;
                    this.name4[7]=tmp2;
                    for(let j=0;j<8;j++){
                        this.circle4.children[j].children[0].getComponent(Sprite).spriteFrame=this.name4[j];
                    }
                }).start();                                             // 调用 start 方法，开启缓动
                break;
        }
    }
}