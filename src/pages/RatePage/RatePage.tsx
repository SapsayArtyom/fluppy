import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button/Button'
import btn_play from '../../assets/images/btn-play.png'
import btn_back from '../../assets/images/btn-back.png'

interface RatePageProps {
    className?: string
}
 
const RatePage: FC<RatePageProps> = ({ className }) => {
    const navigate = useNavigate();

    const getItem = (link: string) => {
        return [0,0,0,0,0].map((item, id) => {
            return <div key={id} 
                className='first:w-[83%] w-[80%] cursor-pointer bg-white rounded-[10px] p-[5px] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]' 
                style={{border: '4px solid #000'}}
                onClick={() => console.log(`click - ${id}`)}
            >
                <p>64564464</p>
            </div>
        })
    }

    return (
        <div className='flex flex-col py-[25px] h-[100%]'>
            <h1 className='text-center text-[34px] font-[pixel]'>user rating</h1>
            <div className='ml-[5px]'>
                <div className='w-[100%]'>
                    <div className='flex justify-center'>
                        <div className='flex flex-wrap w-[100%] m-[30px] justify-center [&>*:nth-child(2)]:w-[82%] [&>*:nth-child(3)]:w-[81%]'>
                            {getItem("https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350")}
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
 
export default RatePage