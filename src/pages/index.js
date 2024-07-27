import React, { useRef, useState } from "react";
import PromoCategoryCard from "../components/PromoCategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardHome from "../components/CardHome";
import { Progress } from "@nextui-org/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovingCircles from "../components/MovingCircles";

export default function Home() {
	const scrollRef = useRef(null);
	const scroll = (direction) => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: direction === 'left' ? -248 : 248,
				behavior: 'smooth'
			});
		}
	};
	const [promoData, setPromoData] = useState([
		{
			type: "Women",
			message:
				"offers elegance and style with our exclusive women's fashion collection.",
			categories: [
				"short",
				"tees",
				"short",
				"tees",
				"short",
				"tees",
				"short",
				"tees",
			],
		},
		{
			type: "Men",
			message:
				"brings sophistication and flair with our exclusive men's fashion collection.",
			categories: ["tees"],
		},
	]);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
	};
	const products = [
		{
			id: 1,
			name: 'Product 1',
			price: '$10.00',
			img: "/img/ss.jpg"
		},
		{
			id: 2,
			name: 'Product 2',
			price: '$20.00',
			img: "/img/ss.jpg"
		},
		{
			id: 3,
			name: 'Product 3',
			price: '$20.00',
			img: "/img/ss.jpg"
		},
		{
			id: 4,
			name: 'Product 4',
			price: '$20.00',
			img: "/img/ss.jpg"
		},
		{
			id: 5,
			name: 'Product 5',
			price: '$20.00',
			img: "/img/ss.jpg"
		},
		{
			id: 6,
			name: 'Product 5',
			price: '$20.00',
			img: "/img/ss.jpg"
		},
	];
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-start">
			<MovingCircles numCircles={15} />
			<div className="w-full flex justify-center bg-gradient-to-r from-orange-100/50 via-orange-200/50 to-orange-300/50 backdrop-blur-md">
				<Slider className="w-[700px]" {...settings}>
					{promoData.map((value) => (
						<PromoCategoryCard
							key={value.type}
							type={value.type}
							message={value.message}
							categories={value.categories}
						/>
					))}
				</Slider>

			</div>
			<div>
			</div>
			<div className="w-full backdrop-blur-md m-5 my-10 px-5 pt-4">
				<label className="text-orange-400 text-lg font-bold">Top Sellers</label>
				<Progress size='sm'
					color="warning"
					value={100}
					className='font-bold text-orange-400'
				/>
				<div className="relative w-[84%] mx-auto m-3">
					<div
						className="overflow-x-scroll whitespace-nowrap scrollbar-hide "
						ref={scrollRef}
					>
						<div className="flex">
							{products.map((product) => (
								<CardHome
									key={product.id}
									prodectname={product.name}
									price={product.price}
									img={product.img}
								/>
							))}
						</div>

						<button
							onClick={() => scroll('left')}
							className="absolute -left-10 top-1/2 transform -translate-y-1/2 p-2 bg-orange-300 text-white rounded-full shadow-lg "
						>
							<FaChevronLeft />
						</button>
						<button
							onClick={() => scroll('right')}
							className="absolute -right-10 top-1/2 transform -translate-y-1/2 p-2 bg-orange-300 text-white rounded-full shadow-lg"
						>
							<FaChevronRight />
						</button>
					</div >

				</div>

			</div>
		</main>
	);
}
