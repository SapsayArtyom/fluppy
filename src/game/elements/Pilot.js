import { AnimatedSprite, Container, Assets, Sprite, Texture } from "pixi.js";
// import sound from 'pixi-sound';

export default class Pilot extends Container {

    constructor() {
        super();

        this.pilotTextures = [];
        this.characterTextures = [];
        this.explosionTextures = [];

        for (let i = 1; i < 25; i++) {
            this.pilotTextures.push(new Texture.from(`blue_${i}`));
        }
        
        for (let i = 1; i < 12; i++) {
            this.characterTextures.push(new Texture.from(`blue_${i}`));
        }
        
        for (let i = 1; i < 13; i++) {
            this.explosionTextures.push(new Texture.from(`explosion_${i}`));
        }

        this.createPilot();
    }

    createPilot() {
        this.pilot = new AnimatedSprite(this.pilotTextures);
        this.pilot.label = 'pilot';
        this.pilot.scale.set(0.25);
        this.pilot.animationSpeed = 0.25;
        this.pilot.play();
        this.addChild(this.pilot);
        
        // this.character = new AnimatedSprite(this.characterTextures);
        // this.character.label = 'character';
        // this.character.scale.set(0.1);
        // this.character.animationSpeed = 0.2;
        // this.character.play();
        // this.character.position.set(53, -20)
        // this.addChild(this.character);
        
        this.explosion = new AnimatedSprite(this.explosionTextures);
        this.explosion.label = 'explosion';
        this.explosion.scale.set(0.1);
        this.explosion.animationSpeed = 0.5;
        this.explosion.alpha = 0;
        this.explosion.loop = false;
        this.explosion.position.set(0, 0)
        this.addChild(this.explosion);
    }

    async pilotCrash() {

        // sound.stop('propeller_idle');
        // sound.play('explosion_pilot');
        this.pilot.alpha = 0;
        this.explosion.alpha = 1;
        this.explosion.gotoAndPlay(0);

        return new Promise((resolve) => {
            this.explosion.onComplete = ()=>{
                this.explosion.alpha = 0;
                resolve()
            };
            
        });
    }

    play() {
        this.pilot.alpha = 1;
        this.pilot.play();
    }

    stop() {
        this.pilot.stop();
        this.pilotCrash();
    }

    showPilot() {
        this.pilot.alpha = 1;
        this.pilotExplosion.stop();
        this.pilotExplosion.alpha = 0;
    }
}