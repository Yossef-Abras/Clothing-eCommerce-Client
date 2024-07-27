import React from "react";
import CategoriesSlider from "/src/components/CategoriesSlider";
import image1 from "/public/img/man.png";
import image2 from "/public/img/girl.png";
import image3 from "/public/img/pngegg (2).png";
import image4 from "/public/img/pngegg (3).png";

const ImagesList = [image1, image2, image3, image4];

export default function index() {
	const productSections = [
		{
			type: "Men",
			categories: ["Jeans", "Shorts", "Shirts", "Tees"],
			images: ImagesList,
		},
		{
			type: "Women",
			categories: ["Jeans", "top", "Shirts", "Tees"],
			images: ImagesList,
		},
	];

	return (
		<div>
			{productSections.map((section, index) => (
				<CategoriesSlider
					key={index}
					type={section.type}
					categories={section.categories}
					images={section.images}
				/>
			))}
		</div>
	);
}
