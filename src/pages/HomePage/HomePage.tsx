import { FC, useEffect } from 'react'
import cls from './HomePage.module.scss'
import { classNames } from '../../helpers/classNames'
import Button, { ThemeButton } from '../../components/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import btn from '../../assets/images/btn-wallet.png'
import plane from '../../assets/images/plane.png'
 
interface HomePageProps {
    className?: string
}
 
const HomePage: FC<HomePageProps> = ({ className }) => { 

    const navigate = useNavigate();

    return (
        <div className={classNames(cls.HomePage, {}, [className, 'h-[100%] flex flex-col justify-center items-center'])}>
            <img className='z-10 mb-[-10px]' src={plane} alt='plane' />
            <Button
                className='!w-[300px] !h-[50px]'
                theme={ThemeButton.CLEAR}
                onClick={() => navigate('/start')}
            >
                <img src={btn} alt="btn" />
            </Button>
        </div>
    )
}
 
export default HomePage