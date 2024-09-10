import { FC } from 'react'
import Game from '../game/Game'
 
const MainBlock: FC= () => {
    
    return (
        <div className='flex flex-col flex-1 relative w-[100%] justify-between'>
            <Game />
        </div>
    )
}
 
export default MainBlock