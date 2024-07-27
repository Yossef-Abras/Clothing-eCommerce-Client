import { Button, Image } from '@nextui-org/react';

export default function CardHome({ prodectname, price, img }) {
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
            <div className='flex flex-col items-center gap-2  text-orange-400 px-2 pb-4 rounded-lg'>
                <p className="text-lg font-bold  ">{prodectname}</p>
                <p>{price}</p>
                <div className='' >
                    <Button className="border-2 rounded-xl border-orange-400 bg-inherit hover:bg-orange-400">
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
};
