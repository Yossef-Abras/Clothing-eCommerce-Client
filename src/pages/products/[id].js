/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import image1 from "/public/img/man.png";
import image2 from "/public/img/girl.png";
import image3 from "/public/img/pngegg (2).png";
import image4 from "/public/img/pngegg (3).png";
import ButnIc from "/public/img/plain-orange.svg";

import Link from "next/link";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const ImagesList = [image1, image2, image3, image4];
const availableColors = [" black ", "blue", "yellow", "red"];
const Sizes = [
	{ key: "X-Small", label: "X-Small" },
	{ key: "Small", label: "Small" },
	{ key: "Medium", label: "Medium" },
	{ key: "Large", label: "Large" },
	{ key: "X-Large", label: "X-Large" },
	{ key: "XX-Large", label: "XX-Large" },
];
const color = "orange-300";
import { useState } from "react";

export default function ProductPage() {
	const [mainImage, setImage] = useState(ImagesList[0]);
	const [selectedColor, setSelectedColor] = useState(availableColors[0]);

	function SelectColor(color) {
		setSelectedColor(color);
	}

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4 md:px-8">
				<div className="grid gap-8 md:grid-cols-2">
					<div className="p-[40px] md:p-12 max-md:h-[60rem] max-sm:h-[40rem] grid gap-4 lg:grid-cols-5">
						<div className="order-last flex gap-4 lg:order-none lg:flex-col">
							{ImagesList.map((image, index) => (
								<div
									key={index}
									className={`overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ${
										mainImage === image
											? "ring-2 ring-orange-300"
											: "hover:ring-2 hover:ring-gray-300"
									}`}
									onClick={() => setImage(image)}
								>
									<Image
										src={image}
										width={200}
										height={200}
										alt={`Product image ${index + 1}`}
										className="h-full w-full object-contain object-center cursor-pointer transition-transform duration-300 hover:scale-105"
									/>
								</div>
							))}
						</div>
						<div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4 shadow-lg">
							<Image
								src={mainImage}
								alt="Main product image"
								width={500}
								height={500}
								className="h-full w-full object-contain object-center transition-transform duration-500 hover:scale-110"
							/>
						</div>
					</div>
					<div className="md:pt-14">
						<div className="mb-5 md:mb-3 flex flex-col gap-[35px]">
							<div className="inline-flex gap-[15px] text-gray-500">
								<span className="">
									<Link href={""}>Category</Link>
								</span>
								<span>➞</span>
								<span>
									<Link href={""}>Category</Link>
								</span>
							</div>
							<div>
								<span className="w-max h-15 bg-orange-300 text-black block text-center px-2 pb-[2px] rounded-full">
									new
								</span>
							</div>
							<h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
								product name
							</h2>
							<span className="w-max text-[#2b2f2e] text-[1.25rem] font-[750] uppercase leading-6 tracking-[1px] font-serif">
								Price $0.50
							</span>
							<div className="inline-flex gap-[15px]">
								<h1 className="text-3xl font-semibold ">Color</h1>
								<span className="pt-[9px]">{selectedColor}</span>
							</div>
							<div className="inline-flex space-x-3">
								{availableColors.map((color, index) => (
									<button
										key={index}
										style={{ backgroundColor: color }}
										onClick={() => SelectColor(color)}
										className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
									></button>
								))}
							</div>
							<div>
								<h2 className="text-base">Product Description</h2>
							</div>
							<div className="inline-flex flex-col gap-[15px]">
								<h2 className="text-2xl font-semibold">Size</h2>
								<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
									<Select
										label={
											<div className="flex items-center gap-2">
												Please Select Your Size
												<Image
													src={ButnIc}
													width={16}
													height={16}
													alt=""
													loading="lazy"
												/>
											</div>
										}
										className="max-w-full"
										classNames={{
											label: "text-black tracking-[2px]",
											trigger:
												"focus:ring-2 focus:ring-orange-300 focus:ring-offset-2",
										}}
										style={{
											backgroundColor: "#fdba74",
										}}
									>
										{Sizes.map((size) => (
											<SelectItem
												key={size.key}
												style={{ color: "black", fontSize: "15px" }}
											>
												{size.label}
											</SelectItem>
										))}
									</Select>
								</div>
							</div>
							<div className="w-full">
								<Button
									radius="2px"
									className="bg-gradient-to-tr from-orange-300 to-yellow-500 text-white shadow-lg w-full h-[56px] text-base tracking-[5px]"
								>
									Add To Cart 🛒
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
