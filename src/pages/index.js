import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const list = [
		{
			title: "Orange",
			img: "/img/man.png",
			price: "$5.50",
		},
	];

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-start p-5`}
		>
			<div className="md:flex w-screen shadow-md ">
				<Card className="w-full flex flex-row justify-around pb-10">
					<div className="flex bg-orange-300 rounded-b-full w-24 h-20 justify-center font-bold">
						<p className="self-center">Women's</p>
					</div>
					<Image
						width={4000}
						height={3000}
						src="/img/girl.png"
						alt="Description of the image"
						className="self-end  w-fit h-64 md:h-80 pb-1 rounded-lg py-5"
					/>
					<Image
						width={4000}
						height={3000}
						src="/img/man.png"
						alt="Description of the image"
						className="self-center  w-fit h-64 md:h-80 pb-1 rounded-lg"
					/>
					<div className="flex bg-orange-300 rounded-b-full w-24 h-20 justify-center font-bold">
						<p className="self-center">Man</p>
					</div>
				</Card>
				{/* <Card className="w-full">
          <Image
            width={4000}
            height={3000}
            src="/img/man.png"
            alt="Description of the image"
            className="self-center  w-fit h-64 md:h-80 pb-1 rounded-lg"
          />
        </Card> */}
			</div>
			<div className="flex gap-2 p-10">
				{list.map((item, index) => (
					<Link href={"./products/" + item.title}>
						{" "}
						<Card
							shadow="sm"
							key={index}
							isPressable
							onPress={() => console.log("item pressed")}
						>
							<CardBody className="overflow-visible p-4">
								<Image
									shadow="sm"
									radius="lg"
									width={1000}
									height={1000}
									alt={item.title}
									className="self-center  w-fit h-64 md:h-80 pb-1 rounded-lg"
									src={item.img}
								/>
							</CardBody>
							<CardFooter className="text-small justify-between">
								<b>{item.title}</b>
								<p className="text-default-500">{item.price}</p>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</main>
	);
}
