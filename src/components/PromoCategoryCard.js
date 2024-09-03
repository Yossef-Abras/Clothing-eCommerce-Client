import { Card, Image } from "@nextui-org/react";
import Link from "next/link";

export default function PromoCategoryCard({ categories, img }) {
  return (
    <Card className="shadow-lg m-4 md:m-10 md:w-[700px] w-[300px] md:max-h-[275px] max-h-[475px] md:h-[275px] h-[475px]">
      <div className="flex flex-col pb-3">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex bg-orange-300 rounded-b-full md:w-24 w-full h-14 md:h-20 justify-center mx-auto md:mx-4 font-bold">
            <p className="self-center px-5">Saramoda</p>
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full md:items-center">
            {/* Link & Message */}
            <div className="w-full self-center px-0 md:w-2/3">
              <p className="hidden text-lg md:block my-10">
                <span className="text-2xl font-bold text-orange-400">
                  Saramoda{" "}
                </span>
                {
                  "offers elegance and style with our exclusive women's fashion collection."
                }
              </p>
              <div className="flex justify-center items-center flex-wrap md:px-0 px-4 gap-1 mt-4 h-[100px]">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    className="border-2 rounded-2xl border-orange-400 px-2 py-1 mb-[3px] hover:bg-orange-200"
                    href={"/products?cat=" + category._id}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Image */}
            <div className="flex justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <Image
                width={4000}
                height={3000}
                src={img}
                alt="Description of the image"
                className="w-full h-[265px] mt-[5px] rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
