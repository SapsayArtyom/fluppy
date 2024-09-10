import { Container, Sprite, Graphics, Text, Ticker, AnimatedSprite, Assets, TilingSprite, Point } from "pixi.js";
// import MyLoader from './MyLoader';
import ManagerStacks from './ManagerStacks';
import Score from './Score';
import Login from './Login';
import StartScreen from '../UI/StartScreen';
import Pilot from '../elements/Pilot';
import MultiplyBar from '../UI/MultiplyBar';
import Timer from '../elements/Timer';
// import MainGame, { IMainGame } from './MainGame';

export default class MainScene extends Container {

    constructor({game, container}) {
        super();
        
        this.game = game;
        this.ticker = new Ticker();
        this.mainContainer = container;
        this.tintCont;;
        
        this.startGame = false;
        this.player;
        this.ManagerStacks;

        this.rotRate = 0.01;
        this.totalBonus = 0;
        this.downRate = 0.02;
        this.upRatePilot = 40;
        this.defRotRate = -0.35;

        this.time = -2;
        this.timeMinute = 0;
        this.countdownMinute = 0;
        this.countdownSec = 0;

        this.soundNow = '';
        this.username = this.game.nickName || `Player${Math.ceil(Math.random() * 1000)}`;

        this.addSpecification();
    }

    addSpecification() {
        this.createBackground();
        this.createPlayer();
        this.createScore();
        this.createStartButton();
        this.mainContainer.sortableChildren = true;
    }

    createBackground() {
        this.bg = new TilingSprite({
            texture: Assets.get('day'), 
            width: this.game.app.screen.width,
            height: this.game.app.screen.height,
            label: 'bg tile'
        });
        this.mainContainer.addChild(this.bg);



        // this.ground = new TilingSprite(MyLoader.getResource('ground').texture, this.game.app.screen.width, 140);
        // this.ground = new TilingSprite({MyLoader.getResource('ground').texture, this.game.app.screen.width, 130);
        // this.ground.name = 'ground';}
        // this.ground.position.x = this.game.app.screen.width / 2;
        // this.ground.position.y = this.game.baseHeight - this.ground.height  - this.game.shift + 3;
        // this.ground.anchor.set(0.5, 0);
        // this.ground.tileScale.set(0.5, 0.5);
        // this.mainContainer.addChild(this.ground);

        this.ticker.add(()=>{
            this.bg.tilePosition.x -= 3 * this.ticker.deltaTime; 
            // this.ground.tilePosition.x -= 7.5 * this.ticker.deltaTime; 
        })
    }

    createStartButton() {
        this.tintCont = new Container();
        this.tintCont.zIndex = 8;

        this.startScreen = new StartScreen({
            game: this.game,
        });
        // this.startScreen.visible = false;
        this.startScreen.drawScene(this.scaleScene);
        this.tintCont.addChild(this.startScreen);
        this.playGame();
        this.createStack();
        this.startScreen.emitter.on('countdown', () => {
            this.username = this.startScreen.valueInputName;
            this.tintCont.visible = false;
            this.score.visible = true;
            setTimeout(()=>{
                this.ticker.start();
                this.player.play();
                this.ManagerStacks.start();
                this.startGame = true;
            }, 1000);
        });
        this.startScreen.x = (this.game.app.screen.width - this.startScreen.width) / 2;
        this.mainContainer.addChild(this.tintCont);

        this.startScreen.emitter.on('restart', () => {
            this.ManagerStacks.restart();
            this.restartPlayer();
            this.totalBonus = 0;
            this.updateCounter(this.totalBonus);
            this.score.visible = false;
        });

        this.startScreen.interactiveChildren = false;
        this.startScreen.start();

        // ===================================
        // tintCont.interactive = false;
        // this.ticker.start();
        // // this.createScore();
        // // this.createSoundIcon();
        // // this.createMultiplyBar();
        // // this.createTimer();
        // tintCont.destroy();
        // // this.startPlayer();
        // setTimeout(()=>{
        //     this.createStack();
        //     this.playGame();
        //     // this.startGame = true;
        // }, 2000);
        // ====================================
    }
    
    startPlayer() {

        // sound.play('propeller_start', {complete: ()=>{
        //     sound.play('propeller_idle', {loop: true, volume: 0.75});
        //     this.soundNow = 'propeller_idle';
        // }});
        // this.soundNow = 'propeller_start';
        this.player.position.set(-this.player.width, this.game.app.screen.height/ 2);
        // TweenMax.to(this.player, 1, {
        //     x: 15,
        //     onComplete: ()=>{
        //         this.graph.position.set(this.player.position.x, this.player.position.y);
        //     }
        // });
    }

    // createSoundIcon() {
    //     this.sound = new SoundManager({
    //         flag: this.startScreen.soundFlag
    //     });
    //     this.sound.position.set(20, this.game.shift + 20);
    //     this.mainContainer.addChild(this.sound);
    // }

    createScore() {
        this.score = new Score();
        this.score.visible = false;
        this.score.y = 10;
        this.score.x = 100;
        this.mainContainer.addChild(this.score);
    }

    createMultiplyBar() {
        this.multiplyBar = new MultiplyBar();
        this.multiplyBar.x = this.game.app.screen.width - this.multiplyBar.width - 50;
        this.multiplyBar.y = this.score.getBounds().bottom;
        this.mainContainer.addChild(this.multiplyBar);
    }

    createTimer() {
        this.timer = new Timer({
            deadlineAt: this.game.deadlineAt,
        });
        this.timer.x = (this.game.app.screen.width - this.timer.width) / 2;
        this.timer.y = this.game.shift + 130;
        this.mainContainer.addChild(this.timer);
        this.timer.createTimer();
    }

    createPlayer() {
        this.player = new Pilot();
        this.player.y = (this.game.app.screen.height - this.player.height) / 2;
        this.player.x = 20;
        this.player.zIndex = 9
        this.mainContainer.addChild(this.player);
        this.graph = new Graphics();
        this.graph.label = 'graph';
        this.graph.rect(15, 5, this.player.pilot.getBounds().width - 30, this.player.pilot.getBounds().height);
        this.graph.fill(0x16b3f2);
        this.graph.alpha = 0;
        this.graph.position.set(this.player.position.x, this.player.position.y);
        this.mainContainer.addChild(this.graph);
        this.upRate = 0;
        this.mainContainer.interactive = true;
        this.mainContainer.on('pointerdown', ()=>{
            this.upRate = this.upRatePilot;
            this.rotRate = -0.35;
            this.downRate = 0.02;
        });
    }

    showPlayer() {
        this.player.position.set(-this.player.width, this.game.app.screen.height/ 2);
        this.player.showPilot();
        sound.play('propeller_start', {complete: ()=>{
            sound.play('propeller_idle', {loop: true, volume: 0.75});
            this.soundNow = 'propeller_idle';
        }});
        this.soundNow = 'propeller_start';
    }

    restartPlayer() {
        this.rotRate = 0.01;
        this.downRate = 0.02;
        this.upRate = 0;
        this.player.rotation = this.rotRate;
        this.graph.rotation = this.rotRate;
        this.player.y = (this.game.app.screen.height - this.player.height) / 2;
        this.graph.position.set(this.player.position.x, this.player.position.y);
        this.player.play();
    }

    createStack() {
        this.ManagerStacks = new ManagerStacks({
            game: this.game,
            mainContainer: this.mainContainer
        });
        this.ManagerStacks.position.set(0, 0);
        this.mainContainer.addChild(this.ManagerStacks);
    }

    playGame() {
        this.ticker.add(()=>{
            if(this.upRate > 0) {
                this.moveUp();
            } else {
                this.moveDown();
            }
            this.checkCrashPlayer();
            this.checkCollision();
        })
    }

    moveUp() {
        this.rotRate += 0.02 * this.ticker.deltaTime;  
        this.player.position.y -= 4 * this.ticker.deltaTime;
        this.graph.position.y -= 4 * this.ticker.deltaTime;
        // this.player.position.y -= 3.5;
        // this.graph.position.y -= 3.5;
        this.upRate -= 3.5 * this.ticker.deltaTime;
        this.player.rotation = this.rotRate * this.ticker.deltaTime;
        this.graph.rotation = this.rotRate * this.ticker.deltaTime;
    }

    moveDown() {
        this.rotRate += 0.02 * this.ticker.deltaTime;
        this.downRate += 0.1 * this.ticker.deltaTime;
        this.player.position.y += (4 + this.downRate) * this.ticker.deltaTime;
        this.graph.position.y += (4 + this.downRate) * this.ticker.deltaTime;
        if( this.rotRate <= 0.5) {
            this.player.rotation = this.rotRate;
            this.graph.rotation = this.rotRate;
        } else {
            this.player.rotation = 0.5;
            this.graph.rotation = 0.5;
        }
    }

    async checkCrashPlayer() {
        // if(this.player.position.y + this.player.getBounds().height > this.game.baseHeight + 210 - this.game.shift) {
        if(this.graph.getBounds().bottom > this.game.app.screen.height || this.graph.getBounds().top < 0) {
            this.stopGame();
        } 
    }

    checkCollision() {
        if (!this.startGame) return;
        for (let i = 0; i < this.ManagerStacks.stacksArr.length; i++) {
            const element = this.ManagerStacks.stacksArr[i];
            for (let j = 0; j < element.children.length; j++) {
                const el = element.children[j].bookStack;
                const elB = el.getBounds();
                const pB = this.graph.getBounds();
                if (pB.right > elB.x && (pB.bottom > elB.y && pB.top < elB.bottom ) && pB.x + 10 < elB.right - 40) {
                    this.stopGame();
                }

                const gr = new Graphics({label: `stack${j}`});
                gr.rect(0, 0, el.width, el.height);
                gr.fill({
                    color: 0xff00ff,
                    alpha: 0.5
                })
                this.addChild(gr);
            }

            if (element.children[0].bookStack.getBounds().right <=0) {
                this.totalBonus += 1;
                this.ManagerStacks.updatePosition(i, this.getMaxDistance().x);
                this.updateCounter(this.totalBonus);
            } 
        }
    }

    getMaxDistance() {
        return this.ManagerStacks.stacksArr.reduce((prev, current) => {
            return prev.x > current.x ? prev : current;
        }, {})
    }

    stopGame() {
        this.ticker.stop();
        this.ManagerStacks.stop();
        this.player.stop();
        this.startGame = false;
        this.startScreen.restartScreen();
        this.tintCont.visible = true;
        this.game.showResults(this.totalBonus);
    }

    restart() {
        this.startScreen.restart();
    }

    updateCounter(value) {
        this.score.counterScore(`${value}`);
        // this.score.x = (this.game.app.screen.width - this.score.width) / 2;
    }

    getPlayerValue() {
        return { 
            username: this.username, 
            score: this.totalBonus
        }
    }
}