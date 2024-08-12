import { Button, Image } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export default function CardHome({ productId, prodectname, price, img, isFavorite }) {
    // const [isfavorite, setIsFavorite] = useState(false)
    // const favorites = () => {
    //     setIsFavorite(productId, !isfavorite)
    // }
    return (
        <div className="min-w-60 m-2 rounded-lg shadow-lg border-1 border-orange-400 bg-white">
            <div className='flex justify-center'>
                <Image
                    width={4000}
                    height={3000}
                    src={img}
                    alt={prodectname}
                    className='w-fit'
                />
            </div>
            <hr />
            <div className='flex justify-between px-2 pb-4 rounded-lg'>
                <div className='flex flex-col'>
                    <p className="text-lg font-bold">{prodectname}</p>
                    <p>{price}</p>
                </div>
                <Button
                    className='bg-inherit text-lg min-w-0 w-8 p-0'
                    style={{ cursor: 'pointer' }}

                >
                    {isFavorite ? <MdFavorite style={{ color: 'red' }} /> : <MdFavoriteBorder />}
                </Button>
            </div>
        </div>
    );
}
// const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
// useEffect(() => {
//     setIsFilled(isFavorite(productId));
// }, [isFavorite, productId]);

// const handleIconClick = () => {
//     if (isFilled) {
//         removeFromFavorites(productId);
//     } else {
//         addToFavorites({ productId, prodectname, price, img });
//     }
//     setIsFilled(!isFilled);
// };