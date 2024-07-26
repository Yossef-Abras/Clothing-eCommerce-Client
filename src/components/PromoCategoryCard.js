import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function PromoCategoryCard({ type, categories, message }) {

    return (
        <Card className="shadow-lg m-10">
            <div className="flex"><div className="flex flex-col w-3/5">
                <div className="flex bg-orange-300 rounded-b-full w-24 h-20 justify-center mx-4 font-bold">
                    <p className="self-center">{type}</p>
                </div>
                <div className="self-start p-4">
                    <p className=""><span className="font-bold text-orange-400">Saramoda </span>{message}</p>
                    <div className="flex flex-wrap gap-1 mt-4">
                        {
                            categories.map((catigory) => (
                                <Link className="border-2 rounded-2xl border-orange-400 px-2 py-1 mb-[3px] hover:bg-orange-200" href='#'>
                                    {catigory}
                                </Link>
                            ))
                        }
                    </div>

                </div>

            </div>
                <div className="flex w-2/5 justify-end">
                    <Image
                        width={4000}
                        height={3000}
                        src="/img/ss.jpg"
                        alt="Description of the image"
                        className="w-fit h-full  rounded-lg"
                    />
                </div></div>

        </Card>
    );
}