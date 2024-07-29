import { Card } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function PromoCategoryCard({ type, categories, message }) {
  return (
    <Card className="shadow-lg m-4 md:m-10 md:max-h-[300px]">
      <div className="flex flex-col pb-3">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex bg-orange-300 rounded-b-full md:w-20 w-full h-14 md:h-20 justify-center mx-auto md:mx-4 font-bold">
            <p className="self-center">{type}</p>
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full md:items-center">
            {/* Link & Message */}
            <div className="w-full self-center px-0 md:w-1/2">
              <p className="hidden md:block">
                <span className="font-bold text-orange-400">Saramoda </span>
                {message}
              </p>
              <div className="flex justify-start flex-wrap md:px-0 px-4 gap-1 mt-4">
                {categories.map((catigory) => (
                  <Link
                    key={catigory}
                    className="border-2 rounded-2xl border-orange-400 px-2 py-1 mb-[3px] hover:bg-orange-200"
                    href="#"
                  >
                    {catigory}
                  </Link>
                ))}
              </div>
            </div>
            {/* Image */}
            <div className="flex w-full h-full md:w-1/2 mt-4 md:mt-0">
              <Image
                width={4000}
                height={3000}
                src="/img/ss.jpg"
                alt="Description of the image"
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>

      </div>
    </Card>

  );
}
