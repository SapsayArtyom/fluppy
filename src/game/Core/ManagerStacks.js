// import * as PIXI from 'pixi.js';
import { Container, Graphics, Ticker } from "pixi.js";
// import Taco from "./Taco";
import BookStack from './BookStack';

export default class ManagerStacks extends Container {

    constructor(options) {
        super();

        this.name = 'taco_manager';
        this.game = options.game;
        this.mainContainer = options.mainContainer
        this.stacksArr = [];
        this.spacing = 150;
        this.colStacks = 6;
        this.distanceX = 600;
        this.ticker = new Ticker();
        this.zIndex = 5;

        this.createStacks();
        this.initialization = true;
    }

    createStacks() {
        for (let index = 0; index < this.colStacks; index++) {
            const cont = new Container({
                label: `container_${index}`
            });
            this.mainContainer.addChild(cont);
            let randomY = this.randomIntegerNumber(300, this.game.app.screen.height - 300);
            let stack = new BookStack({
                y: randomY + this.spacing,
                widthStack: 150
            });
            let stackRevert = new BookStack({
                y: randomY - this.spacing,
                revert: true,
                widthStack: 150,
            });
            cont.x = this.game.baseWidth + this.distanceX * index + this.distanceX;
            
            cont.addChild(stack, stackRevert);
            this.stacksArr.push(cont);

            // const gr = new Graphics({label: `stack${index}`});
            // gr.rect(0, 0, stack.width, stack.height);
            // gr.fill({
            //     color: 0xff00ff,
            //     alpha: 0.5
            // })
            // gr.position.set(cont.x, stack.y)
            // this.addChild(gr);
            
            // const gr2 = new Graphics({label: `stack${index}`});
            // gr2.rect(0, 0, stackRevert.width, stackRevert.height);
            // gr2.fill({
            //     color: 0xff00ff,
            //     alpha: 0.5
            // })
            // gr2.position.set(cont.x, stackRevert.y)
            // this.addChild(gr2);
        }
        this.moveStacks();
    }

    moveStacks() {
        for (let i = 0; i < this.stacksArr.length; i++) {
            const element = this.stacksArr[i];
            this.ticker.add((deltaTime) => {
                // this.position.x -= 7 * this.ticker.deltaTime;
                element.x -= 4;
            });
        }
    }
    
    start() {
        this.ticker.start();  
    }

    updatePosition(id, pos) {
        const randomY = this.randomIntegerNumber(300, this.game.app.screen.height - 300);
        const x = pos + this.distanceX;
        this.stacksArr[id].x = x;
        this.stacksArr[id].children[0].update(randomY + this.spacing);
        this.stacksArr[id].children[1].update(randomY - this.spacing);
    }

    restart() {
        for (let i = 0; i < this.stacksArr.length; i++) {
            this.updatePosition(i, this.game.baseWidth + this.distanceX * i);
        }
    }

    stop() {
        this.ticker.stop();
    }

    randomIntegerNumber(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    removeTacos() {
        for (let i = 0; i < this.stacksArr.length; i++) {
            this.stacksArr[i].destroy();
        }
    }

    stopTacos() {
        for (let i = 0; i < this.stacksArr.length; i++) {
            this.stacksArr[i].ticker.stop();
        }
        this.removeInterval.bind(this)();
    }
    
    removeInterval() {
        clearInterval(this.createInterval);
        this.initialization = false;
    }

    startTacos() {
        for (let i = 0; i < this.stacksArr.length; i++) {
            this.stacksArr[i].ticker.start();
        }
        if(!this.initialization) {
            this.createInterval = setInterval(() => {
                this.createTaco();
            }, 1100);
        }
    }
}