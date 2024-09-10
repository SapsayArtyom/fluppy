import { Application, Assets, Container, isMobile } from 'pixi.js'
import MainScene from './MainScene'
import stack from '../../assets/images/stack.png'
import stack_revert from '../../assets/images/stack_revert.png'
import evening from '../../assets/images/Evening.png'
import night from '../../assets/images/Night.png'

export interface IMainGame {
    width: number
    height: number
    waitAt: number
    deadlineAt: number
    nickName: string
    isAuth: boolean
    showResults?: () => void
}

export default class MainGame {

    protected width: number
    protected height: number
    protected waitAt: number
    protected deadlineAt: number
    protected isAuth: boolean
    
    protected baseWidth = 1125;
    protected baseHeight = 2436;
    
    protected mainContainer: Container
    protected scene: MainScene
    public nickName: string
    public app: Application
    public showResults: any
    
    constructor(options: IMainGame){

        this.width = options.width;
        this.height = options.height;
        this.waitAt = options.waitAt;
        this.deadlineAt = options.deadlineAt;
        this.nickName = options.nickName;
        this.isAuth = options.isAuth;
        this.showResults = options.showResults;

        this.mainContainer = new Container();

        this.createGame();
    }

    async createGame() {
        const bundle = [
            { alias: 'stack', src: stack },
            { alias: 'stack_revert', src: stack_revert },
            { alias: 'day', src: '/assets/day.png' },
            { alias: 'night', src: night },
            { alias: 'evening', src: evening },
            { alias: 'plane', src: '/assets/plane.png' },
        ];

        for (let i = 1; i < 14; i++) {
            bundle.push({ alias: `yellow${i}`, src: `/assets/skins/yellow/yellow${i}.png` });
        }
        
        for (let i = 1; i < 25; i++) {
            bundle.push({ alias: `blue_${i}`, src: `/assets/skins/blue/blue_${i}.png` });
        }
        
        for (let i = 1; i < 12; i++) {
            bundle.push({ alias: `plane${i}`, src: `/assets/plane/plane${i}.png` });
        }
        
        for (let i = 1; i < 13; i++) {
            bundle.push({ alias: `explosion_${i}`, src: `/assets/explosion/explosion_${i}.png` });
        }

        Assets.addBundle('animals', bundle);
        await Assets.loadBundle('animals');

        this.init();
    }

    protected async init() {

        // const options = isMobile.phone ? {
        //     backgroundAlpha: 0,
        //     autoStart: false,
        //     width: this.baseWidth,
        //     height: this.baseHeight,
        //     sharedTicker: true,
        // } : {
        //     backgroundAlpha: 0,
        //     autoStart: false,
        //     resizeTo: document.getElementById('game'),
        //     sharedTicker: true,
        // }

        const options = {
            backgroundAlpha: 0,
            autoStart: false,
            resizeTo: document.getElementById('game'),
            sharedTicker: true,
        }
        this.app = new Application();
        await this.app.init(options);
        (globalThis as any).__PIXI_APP__ = this.app; // eslint-disable-line
        document.getElementById('game').appendChild(this.app.canvas);
        
        this.mainContainer.label = 'mainContainer';
        this.app.stage.addChild(this.mainContainer);
        
        // if(!isMobile.phone) {
        //     const clientWidth = this.width;
        //     const clientHeight = this.height;
        //     const screenProportions = clientHeight / clientWidth;
        //     // this.screenHeight = this.baseWidth * screenProportions;
        //     // this.shift = this.baseHeight - this.screenHeight;

        //     const canvas = document.getElementsByTagName('canvas');
        //     canvas[0].style.position = "fixed";
        //     canvas[0].style.transform = "translate(-50%, 0)";
        //     canvas[0].style.top = "unset";
        //     canvas[0].style.left = "50%";
        //     canvas[0].style.bottom = '0';
        //     canvas[0].style.maxWidth = "100%";
        //     canvas[0].style.width = "100%";

        //     // this.shift = 0;
        // }

        // if(!isMobile.phone) {
        //     const canvas = document.getElementsByTagName('canvas');
        //     canvas[0].style.position = "absolute";
        //     canvas[0].style.transform = "translate(-50%, -50%)";
        //     canvas[0].style.top = "50%";
        //     canvas[0].style.maxHeight = "100%";
        //     canvas[0].style.maxWidth = "unset";
        //     canvas[0].style.width = "unset";

        //     this.shift = 0;
        // } else {
        //     const clientWidth = this.width;
        //     const clientHeight = this.height;
        //     const screenProportions = clientHeight / clientWidth;
        //     this.screenHeight = this.baseWidth * screenProportions;
        //     this.shift = this.baseHeight - this.screenHeight;
        // }

        this.scene = new MainScene({
            game: this,
            container: this.mainContainer,
        });

        // ==============================================================

        window.onblur = () => {
            if(this.scene && this.scene.startGame) {
                // sound.stop('propeller_idle');
                this.app.ticker.stop();
                this.scene.ticker.stop();
                this.scene.ManagerStacks.stop();
            }
        }
        window.onfocus = () => {
            if(this.scene && this.scene.startGame) {
                // sound.play('propeller_idle', { loop: true });
                this.app.ticker.start();
                this.scene.ticker.start();
                this.scene.ManagerStacks.start();
            }
        }
    }

    public restart() {
        this.scene.restart();
    }

    // destroyGame() {
    //     console.log('destroyGame')
    //     // if(this.scene.managerTaco && this.scene.managerTaco.createInterval) clearInterval(this.scene.managerTaco.createInterval);
    //     if(this.game.managerTaco && this.game.managerTaco.createInterval) this.game.managerTaco.removeInterval();
    //     this.mainContainer.destroy();
    //     this.app.destroy(true);
    //     this.game = null;
    //     sound.removeAll();
    // }

    // getPlayerValue() {
    //     return this.game.getPlayerValue()
    // }

    // checkSize() {
    //     let scaleScene = 1;
    //     if (this.width < 380) scaleScene = 0.8;

    //     return scaleScene;
    // }
}