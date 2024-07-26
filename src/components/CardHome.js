import { Progress } from '@nextui-org/react';
import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CardHome() {
    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -200 : 200,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative mx-auto m-5">
            <Progress size='sm'
                color="warning"
                label="More Buy"
                value={100}
                className='font-bold text-orange-400'
            />
            <div
                className="overflow-x-auto whitespace-nowrap scroll-smooth"
                ref={scrollRef}
            >
                <div className="inline-block w-60 h-40 bg-gray-200 p-4 m-2 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold">Card 1</h3>
                    <p>Content for card 1</p>
                </div>
                <div className="inline-block w-60 h-40 bg-gray-200 p-4 m-2 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold">Card 2</h3>
                    <p>Content for card 2</p>
                </div>
                <div className="inline-block w-60 h-40 bg-gray-200 p-4 m-2 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold">Card 3</h3>
                    <p>Content for card 3</p>
                </div>
            </div>
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-orange-300 text-white rounded-full shadow-lg"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-orange-300 text-white rounded-full shadow-lg"
            >
                <FaChevronRight />
            </button>
        </div >
    );
};
