import { FC } from 'react'
import Button, { ThemeButton } from '../../components/ui/Button/Button'
import { useNavigate } from 'react-router-dom';
import btn_store from '../../assets/images/btn-store.png'
import btn_play from '../../assets/images/btn-play.png'
import btn_rate from '../../assets/images/btn-rate.png'

interface StartPageProps {
    className?: string
}
 
const StartPage: FC<StartPageProps> = ({ className }) => {

    const navigate = useNavigate();

    return (
        <div className='h-[100%] relative'>
            <div className='flex justify-center items-center h-[100%]'>
                <Button
                    className='!w-[initial] !h-[50px] mb-[20px] !mx-[5px]'
                    theme={ThemeButton.CLEAR}
                    // title='free game'
                    onClick={() => navigate('/game')}
                >
                    <img src={btn_play} alt="" />
                </Button>
                <Button
                    className='!w-[initial] !h-[50px] mb-[20px] !mx-[5px]'
                    theme={ThemeButton.CLEAR}
                    // title='buy game'
                    onClick={() => navigate('/rate')}
                >
                    <img src={btn_rate} alt="" />
                </Button>
            </div>
            <div className='absolute bottom-[30px] right-[30px]'>
                <Button
                    className='!w-[initial] !h-[50px] hover:bg-[#2a3775]'
                    // theme={ThemeButton.CLEAR}
                    // title='shop'
                    onClick={() => navigate('/shop')}
                >
                    <img src={btn_store} alt="" />
                </Button>
            </div>
        </div>
    )
}
 
export default StartPage