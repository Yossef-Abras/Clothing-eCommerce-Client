import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import image1 from "/public/img/man.png";
import image2 from "/public/img/girl.png";
import image3 from "/public/img/pngegg (2).png";
import image4 from "/public/img/pngegg (3).png";

const ImagesList = [image1, image2, image3, image4];

const products = [
	{ id: 1, name: "Jeans", image: image1 },
	{ id: 2, name: "Shorts", image: image2 },
	{ id: 3, name: "Shirts", image: image3 },
	{ id: 3, name: "Tees", image: image4 },
];

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				background: "#fb923c",
				borderRadius: "50%",
				paddingTop: "1px",
			}}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				background: "#fb923c",
				borderRadius: "50%",
				paddingTop: "1px",
			}}
			onClick={onClick}
		/>
	);
}

export default function MenCategory() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold text-center text-orange-400 mb-8 tracking-[1px]">
				Men
			</h1>
			<div className="max-w-5xl mx-auto">
				<Slider {...settings} className="product-slider">
					{products.map((product) => (
						<div key={product.id} className="px-2">
							<div className="rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-[0.97] hover:border hover:border-orange-300 cursor-pointer group">
								<div className="relative h-64">
									<Image
										src={product.image}
										alt={product.name}
										layout="fill"
										objectFit="contain"
									/>
								</div>
								<div className="p-4">
									<h2 className="text-xl font-semibold text-orange-400 text-center relative">
										<span className="relative">
											{product.name}
											<span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
										</span>
									</h2>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}
