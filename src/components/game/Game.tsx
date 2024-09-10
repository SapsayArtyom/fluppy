import { FC, useEffect, useState } from 'react'
import Main from '../../game'
import Results from './Results'
 
interface GameProps {
    className?: string
}
 
const Game: FC<GameProps> = ({ className }) => {

    const [ isResult, setResult] = useState<number>(null);
    const [ isGame, setGame ] = useState(null);
    
    useEffect(() => {
        const game = new Main(setResult);
        setGame(game);
    }, []);

    const restart = () => {
        setResult(null);
        isGame.restart();
    }

    return (
        <>
            <div id='game' className='h-[100%]'>
    
            </div>
            {isResult !== null ? <Results onPlay={() => restart()}  result={isResult} /> : null}
        </>
    )
}
 
export default Game