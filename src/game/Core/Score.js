import { Container, Text } from "pixi.js";

export default class Score extends Container {

    constructor() {
        super();

        this.name = 'score';
        this.widthTaco = 115;
        this.zIndex = 9;
        this.creteScore();
    }

    creteScore() {
        const text = new Text({
            text: 'score',
            style: {
                fill: 0xffffff,
                fontSize: 40,
                fontFamily: 'pixel',
                fontWeight: 'bold',
                dropShadow: {
                    color: '#000000',
                    distance: 6,
                },
            }
        })
        this.addChild(text);
        this.scoreLabel = new Text({
            text: '0', 
            style: {
                fill: 0xffffff,
                fontSize: 60,
                fontFamily: 'pixel',
                fontWeight: 'bold',
                dropShadow: {
                    color: '#000000',
                    distance: 6,
                },
            }
        });
        this.scoreLabel.y = text.getBounds().bottom;
        this.addChild(this.scoreLabel);
    }

    counterScore(amount) {
        this.scoreLabel.text = amount;
    }
}