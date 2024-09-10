import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button/Button'
import icon from '../../assets/images/item.png'
import btn_play from '../../assets/images/btn-play.png'
import btn_back from '../../assets/images/btn-back.png'
 
interface ShopPageProps {
    className?: string
}
 
const ShopPage: FC<ShopPageProps> = ({ className }) => {
    const navigate = useNavigate();

    const getItem = () => {
        return [0,0,0,0,0].map((item, id) => {
            return <div key={id} className='max-w-[300px] m-[5px] cursor-pointer' onClick={() => console.log(`click - ${id}`)}>
                <img className='w-[100%] h-[auto]' src={icon} alt="bgr-img" />
            </div>
        })
    }

    return (
        <div className='flex flex-col h-[100%] py-[20px]'>
            <h1 className='text-center text-5xl'>available skins</h1>
            <div className='ml-[5px]'>
                <div className='w-[100%]'>
                    <div className='flex justify-center'>
                        <div className='flex flex-wrap w-[100%] m-[30px] justify-center'>
                            {getItem()}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex mt-[auto] justify-center'>
                <Button
                    className='!w-[initial] !h-[50px] mb-[20px] !mx-[5px]'
                    onClick={() => navigate(-1)}
                >
                    <img src={btn_back} alt="btn back" />
                </Button>
                <Button
                    className='!w-[initial] !h-[50px] mb-[20px] !mx-[5px]'
                    onClick={() => navigate('/game')}
                >
                    <img src={btn_play} alt="btn play" />
                </Button>
            </div>
        </div>
    )
}
 
export default ShopPage