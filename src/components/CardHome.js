import { Button, Image } from '@nextui-org/react';
import { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { TfiShoppingCartFull } from 'react-icons/tfi';

export default function CardHome({ prodectname, price, img }) {
    const [isFilled, setIsFilled] = useState(false);

    const handleIconClick = () => {
        setIsFilled(!isFilled);
    };
    return (
        <div className="min-w-60 m-2 rounded-lg shadow-lg border-1 border-orange-400 bg-white">
            <div className='flex justify-center'>
                <Image
                    width={4000}
                    height={3000}
                    src={img}
                    alt="Description of the image"
                    className='w-fit'

                />
            </div>
            <hr></hr>
            <div className='flex justify-between px-2 pb-4 rounded-lg'>
                <div className='flex flex-col'>  <p className="text-lg font-bold">{prodectname}</p>
                    <p>{price}</p>
                </div>
                <Button className='bg-inherit text-lg min-w-0 w-8 p-0' onClick={handleIconClick} style={{ cursor: 'pointer' }}>
                    {isFilled ? <MdFavorite style={{ color: 'red' }} /> : <MdFavoriteBorder />}
                </Button>
            </div>

        </div>
    );
};
