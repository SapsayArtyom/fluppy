import { FC } from 'react'
import Button, { ThemeButton } from '../ui/Button/Button'
import { useNavigate } from 'react-router-dom'
 
interface ResultsProps {
    className?: string
    result: number
    onPlay: () => void
}
 
const Results: FC<ResultsProps> = ({ className, result, onPlay }) => {

    const navigate = useNavigate();

    return (
        <div className='flex w-[100%] h-[100%] absolute top-0 left-0 justify-center items-center bg-[rgba(0,0,0,0.7)]'>
            <div className='flex flex-col w-[500px] h-[500px] rounded-[5px] border-2 border-[#829fec] bg-[#2b3697] p-[15px] items-center'>
                <h1 className='text-5xl'>Results</h1>
                <p className='mt-[50px] text-6xl'>{result}</p>
                <div className='flex justify-between mt-[auto] w-[100%]'>
                    <Button
                        className='!w-[200px] !h-[50px]'
                        theme={ThemeButton.PRIMARY}
                        title='Play'
                        onClick={onPlay}
                    />
                    <Button
                        className='!w-[200px] !h-[50px]'
                        theme={ThemeButton.PRIMARY}
                        title='Home'
                        onClick={() => navigate('/start')}
                    />
                </div>
            </div>
        </div>
    )
}
 
export default Results