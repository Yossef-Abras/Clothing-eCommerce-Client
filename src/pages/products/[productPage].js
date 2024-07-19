/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import image1 from "/public/img/man.png";
import image2 from "/public/img/girl.png";
import image3 from "/public/img/pngegg (2).png";
import image4 from "/public/img/pngegg (3).png";

const ImagesList = [image1, image2, image3, image4];
import { useState } from "react";

export default function ProductPage() {
	const [mainImage, setImage] = useState(ImagesList[0]);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4 md:px-8">
				<div className="grid gap-8 md:grid-cols-2">
					<div className="p-[40px] grid gap-4 lg:grid-cols-5">
						<div className="order-last flex gap-4 lg:order-none lg:flex-col">
							{ImagesList.map((image, index) => (
								<div
									key={index}
									className="overflow-hidden rounded-lg bg-gray-100"
									onClick={() => setImage(image)}
								>
									<Image
										src={image}
										width={200}
										height={200}
										alt="photo"
										className="h-full w-full object-cover object-center cursor-pointer"
									/>
								</div>
							))}
						</div>
						<div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
							<Image
								src={mainImage}
								alt="photo"
								width={500}
								height={500}
								className="h-full w-full object-cover object-center"
							/>
						</div>
					</div>
					<div className="md:py-8">
						<div className="mb-2 md:mb-3 flex flex-col gap-[25px]">
							<span className="mb-0.5 inline-block text-gray-500">
								Category
							</span>
							<div>
								<span className="w-max h-15 bg-orange-300 text-black block text-center">
									new
								</span>
							</div>
							<h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
								product name
							</h2>
							<div>
								<span className="w-max h-15 text-[#2b2f2e] text-[1.25rem] font-[750] uppercase leading-6 tracking-[1px] font-serif">
									Price $0.00
								</span>
								<span className="text-sm text-gray-500 pl-[25px]">
									Price includes duties and taxes
								</span>
								<div className="h-12"></div>
								<div className="flex flex-col gap-[20px]">
									<div>
										<span className="text-medium font-bold text-gray-800 lg:text-3xl">
											Color
										</span>
										<span className="text-2xl text-gray-500 pl-[25px]">
											colors
										</span>
									</div>
									<div className="flex gap-[15px]">
										<span className="w-[30px] h-[30px] rounded-[50%] bg-[yellow] inline-block cursor-pointer hover:border-[2px] hover:outline-[solid] hover:border-[orange]"></span>
										<span className="w-[30px] h-[30px] rounded-[50%] bg-[black] inline-block cursor-pointer hover:border-[2px] hover:outline-[solid] hover:border-[orange]"></span>
										<span className="w-[30px] h-[30px] rounded-[50%] bg-[blue] inline-block cursor-pointer hover:border-[2px] hover:outline-[solid] hover:border-[orange]"></span>
									</div>
								</div>
							</div>
							<div>
								<h2>Product Description</h2>
							</div>
							<div className="h-8 cursor-pointer">
								<label className="block mb-2 text-3xl font-bold text-gray-900 dark:text-gray-400 cursor-pointer">
									Size
								</label>
								<select className="bg-orange-300 border border-gray-300 text-gray text-lg rounded-lg text-center focus:ring-black-300 focus:border-orange-300 block w-full p-2.5 dark:bg-orange-300 dark:border-orange-300 dark:placeholder-orange-300 dark:text-white dark:focus:ring-orange-300 dark:focus:border-black-300 cursor-pointer">
									<option selected="">Please Select Your Size</option>
									<option value="X-Small">X-Small</option>
									<option value="Small">Small</option>
									<option value="Medium">Medium</option>
									<option value="Large">Large</option>
									<option value="X-Large">X-Large</option>
									<option value="Large">Large</option>
								</select>
							</div>
							<a
								href="#_"
								class=" top-[150px] px-5 py-5 text-center relative rounded group overflow-hidden font-medium bg-purple-50 text-gray block"
							>
								<span class="absolute top-0 left-0 flex w-[-webkit-fill-available] h-18 transition-all duration-200 ease-out transform translate-y-0 bg-orange-300 group-hover:h-16 opacity-90"></span>
								<span class="relative group-hover:text-gray text-center text-base">
									Add To Cart 🛒
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
