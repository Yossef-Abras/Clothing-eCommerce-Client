import React, { useEffect, useRef, useState } from "react";
import PromoCategoryCard from "../components/PromoCategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardHome from "../components/CardHome";
import { Button, Progress, Spinner } from "@nextui-org/react";
import MovingCircles from "../components/MovingCircles";
import { getCategories, getProducts, getSubCategories } from "../../global/product";

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

export default function Home() {

	const settings1 = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <SamplePrevArrow />,
		prevArrow: <SampleNextArrow />,
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

	const [TopSellersProductsproducts, setTopSellersProducts] = useState([]);
	const [TopOffersproducts, setTopOffersProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [lodaing, setLoading] = useState(true);
	const getTopSellersProducts = async () => {
		try {
			const res = await getProducts();
			setTopSellersProducts(res.data);
		} catch (error) {
			console.error("Error fetching Top Sellers Products:", error);
			throw error;
		}
	};

	const getTopOffersProducts = async () => {
		try {
			const res = await getProducts();
			setTopOffersProducts(res.data);
		} catch (error) {
			console.error("Error fetching Top Offers Products:", error);
			throw error;
		}
	};

	const getAllCategories = async () => {
		try {
			const res = await getSubCategories();
			setCategories(res.data);
		} catch (error) {
			console.error("Error fetching Categories:", error);
			throw error;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				await Promise.all([getTopSellersProducts(), getTopOffersProducts(), getAllCategories()]);
			} catch (error) {
				console.error("Error occurred during fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);
	if (lodaing) {
		return <div className="min-h-[400px] text-orange-500 flex justify-center items-center">
			<Spinner color="primary" />
		</div>
	}
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-start">
			<MovingCircles numCircles={15} />
			<div className="w-full flex justify-center bg-gradient-to-r from-orange-100/50 via-orange-200/50 to-orange-300/50 backdrop-blur-md">
				{/* <Slider className="md:w-[700px] w-[300px]"> */}
				<div className="md:w-[700px] w-[300px]">
					<PromoCategoryCard categories={categories}
					/>
				</div>
				{/* </Slider> */}


			</div>
			<div className="w-full backdrop-blur-md m-5 my-10 px-5 pt-4">
				<label className="text-orange-400 text-lg font-bold">
					Top Sellers
				</label>
				<Progress
					size="sm"
					color="warning"
					value={100}
					className="font-bold text-orange-400"
				/>

				<div className="relative w-[86%] mx-auto m-3">
					<div className="flex">
						<Slider className="w-full" {...settings1}>
							{TopSellersProductsproducts.map((product) => (
								<CardHome
									key={product._id}
									productId={product.id}
									prodectname={product.title}
									price={product.price}
									img={product.imageCover}

								/>
							))}
						</Slider>
					</div>
				</div >
			</div>
			<div className="w-full backdrop-blur-md m-5 my-10 px-5 pt-4">
				<label className="text-orange-400 text-lg font-bold">Special Offers</label>
				<Progress size='sm'
					color="warning"
					value={100}
					className='font-bold text-orange-400'
				/>
				<div className="relative w-[86%] mx-auto m-3">
					<div className="flex">
						<Slider className="w-full" {...settings1}>
							{TopOffersproducts.map((product) => (
								<CardHome
									key={product._id}
									productId={product._id}
									prodectname={product.title}
									price={product.price}
									img={product.imageCover}
									isFavorite={product.isFavorite}

								/>
							))}
						</Slider>
					</div>
				</div >
			</div>

		</main>
	);
}
