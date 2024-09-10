import { Container, Sprite, Text, Graphics } from "pixi.js";
import { EventEmitter } from "events";


export default class StartScreen extends Container {

    constructor(option) {
        super();

        this.name = 'startScreen';
        this.game = option.game;
        this.sceneScale = option.scale;
        this._emitter = new EventEmitter();
        
        this.countdownValue = this.game.waitAt;
        this.soundFlag = 'off';
        this.zIndex = 8;
        this.startScreen();
    }

    get emitter() {
        return this._emitter;
    }

    startScreen() {

        this.screenContainer = new Container();
        this.addChild(this.screenContainer);

        this.timerCont = new Container();
        this.screenContainer.addChild(this.timerCont);
                
        this.countdownText = new Text({ 
            text: `${this.countdownValue}`, 
            style: {
                fontSize: 70,
                fontFamily: 'pixel',
                fill: 0x9d0000,
                fontWeight: 'bold'
            }
        });
        this.timerCont.addChild(this.countdownText);

        this.btnCont = new Container();
        this.btnCont.y = this.countdownText.height + 60;
        this.btnCont.cursor = 'pointer';

        this.screenContainer.addChild(this.btnCont);

        this.btn = new Graphics();
        this.btn.label = 'btn';
        this.btn.rect(0, 0, 200, 50);
        this.btn.fill(0x16b300);

        this.btnCont.on('pointerup', ()=>{
            this.btnCont.interactive = false;
            this.countdown();
        });

        this.btnText = new Text({
            text: 'Start game',
            style: {
                fontSize: 20,
                fill: 0xffffff,
                fontWeight: 'bold'
            }
        });
        this.btnText.x = (this.btn.width - this.btnText.width) / 2;
        this.btnText.y = (this.btn.height - this.btnText.height) / 2;
    }

    start() {
        this.btnCont.interactive = false;
        this.countdown();
    }

    restart() {
        this.countdownText.visible = true;
        this.checkCounter(this.countdownValue);
        this.emitter.emit('restart');
        this.countdownText.visible = true;
        this.countdown();
    }

    restartScreen() {
        this.countdownText.visible = false;
        this.checkCounter(this.countdownValue);
        this.btnCont.on('pointerup', ()=>{
            this.countdownText.visible = true;
            this.emitter.emit('restart');
            this.btnCont.on('pointerup', ()=>{
                this.btnCont.interactive = false;
                this.countdown();
            });
        });

        this.btnText.text = 'Restart Game'
        this.btnText.x = (this.btn.width - this.btnText.width) / 2;
        this.btnText.y = (this.btn.height - this.btnText.height) / 2;
    }

    countdown() {
        let timePassed = this.countdownValue;
        let timer = setInterval(()=> {
            timePassed--;
            this.checkCounter(timePassed);

            if (timePassed === 0) {
                this.emitter.emit('countdown');
                clearInterval(timer);
                return;
            }
        }, 1000);
    }

    checkCounter(timePassed) {
        this.countdownText.text = `${timePassed}`;
    }

    hideInput() {
        if(this.input) this.input.domField.style.visibility = 'hidden';
    }

    drawScene(scale) {
        this.countdownText.x = ((this.width - this.countdownText.getBounds().width) / 2);
        this.btnCont.x = ((this.width - this.btnCont.getBounds().width) / 2);
    }
}