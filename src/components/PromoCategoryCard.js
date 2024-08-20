import { Card } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function PromoCategoryCard({ categories }) {
  return (
    <Card className="shadow-lg m-4 md:m-10 md:max-h-[275px] max-h-[475px] md:h-[275px] h-[475px]">
      <div className="flex flex-col pb-3">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex bg-orange-300 rounded-b-full md:w-20 w-full h-14 md:h-20 justify-center mx-auto md:mx-4 font-bold">
            <p className="self-center px-5">Saramoda</p>
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full md:items-center">
            {/* Link & Message */}
            <div className="w-full self-center px-0 md:w-1/2">
              <p className="hidden md:block my-10">
                <span className="font-bold text-orange-400">Saramoda </span>
                {
                  "offers elegance and style with our exclusive women's fashion collection."
                }
              </p>
              <div className="flex justify-center items-center flex-wrap md:px-0 px-4 gap-1 mt-4 h-[100px]">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    className="border-2 rounded-2xl border-orange-400 px-2 py-1 mb-[3px] hover:bg-orange-200"
                    href="/products"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Image */}
            <div className="flex justify-center w-full md:w-1/2 mt-4 md:mt-0">
              <Image
                width={4000}
                height={3000}
                src="/img/ss.jpg"
                alt="Description of the image"
                className="w-full md:h-full h-[275px] rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
