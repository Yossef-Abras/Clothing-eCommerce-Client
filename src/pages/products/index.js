import React from "react";
import CategoriesSlider from "/src/components/CategoriesSlider";
import { Button, Progress } from "@nextui-org/react";
export default function index() {
	const productSections = [
		{
			id: 1,
			prodectname: "sdweew",
			img: "/img/girl.png",
			price: "$10",

		},
		{
			id: 2,
			prodectname: "sdweew",
			img: "/img/girl.png",
			price: "$10",

		},
		{
			id: 3,
			prodectname: "sdweew",
			img: "/img/girl.png",
			price: "$10",

		},
		{
			id: 4,
			prodectname: "sdweew",
			img: "/img/girl.png",
			price: "$10",

		},
		{
			id: 5,
			prodectname: "sdweew",
			img: "/img/girl.png",
			price: "$10",

		},
	];
	return (
		<div>
			<div className="flex justify-between items-center mt-5 mx-5">
				<label className="text-orange-400 text-lg font-bold pb-2">Top Sellers</label>
				{/* <Button className=" p-0 px-2 mb-2 bg-inherit border-2 border-orange-400 rounded-2xl hover:bg-orange-200 ">
					Show More
				</Button> */}
			</div>
			<Progress
				size="sm"
				color="warning"
				value={100}
				className="font-bold text-orange-400 pb-5 px-4"
			/>
			<div className="w-full grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 gap-6 mb-2 lg:px-5">
				{productSections.map((product) => (
					<CategoriesSlider
						key={product.id}
						prodectname={product.prodectname}
						price={product.price}
						img={product.img}
					/>
				))}
			</div>
		</div>
	);
}
