import Image from "next/image";
import ButnIc from "/public/img/plain-orange.svg";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getProduct } from "../../../public/global/product";
import { addToCart } from "../../../public/global/cart";

export default function ProductPage() {
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    checkLoginStatus();

    if (id) {
      getProduct(id)
        .then((data) => {
          setProductData(data.data);
          setMainImage(data.data.imageCover);
          setSelectedColor(data.data.colors[0]);
          setSelectedSize(data.data.sizes[0]);
        })
        .catch((error) => {
          console.error("Failed to fetch product:", error);
        });
    }

    const interval = setInterval(() => {
      checkLoginStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, [id]);

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner color="primary" />
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size.");
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCart(productData._id, selectedColor, selectedSize);
      router.push("/cart");
      localStorage.setItem(
        "alertMessage",
        JSON.stringify({ message: "Item added to cart successfully!", isError: false }));
    } catch (error) {
      console.error("Failed to add to cart:", error);
      localStorage.setItem(
        "alertMessage",
        JSON.stringify({
          message: error.message || "Unknown error!!",
          isError: true,
        })
      );
      setIsAddingToCart(false);
    }
  };

  const images = [productData.imageCover, ...productData.images];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-[40px] md:p-12 max-md:h-[60rem] max-sm:h-[40rem] grid gap-4 lg:grid-cols-5">
            <div className="order-last flex gap-4 lg:order-none lg:flex-col">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ${mainImage === image
                    ? "ring-2 ring-orange-300"
                    : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  onClick={() => setMainImage(image)}
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
            <div className="mb-5 md:mb-3 h-full flex flex-col gap-[35px]">
              <div className="flex gap-2">
                {productData.subcategories.map((subcategory) => (
                  <span
                    key={subcategory._id}
                    className="w-max h-15 bg-orange-300 text-black block text-center px-2 pb-[2px] rounded-full"
                  >
                    {subcategory.name}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {productData.title}
              </h2>
              {
                productData.priceAfterDiscount ? (
                  <div className="flex flex-col">
                    <span className="w-max text-[#2b2f2e] text-[1.25rem] font-[750] uppercase leading-6 tracking-[1px] font-serif line-through">
                      Price ${productData.price}
                    </span>
                    <span className="w-max text-red-600 text-[1.25rem] font-[750] uppercase leading-6 tracking-[1px] font-serif">
                      Price ${productData.priceAfterDiscount}
                    </span>
                  </div>
                ) : (
                  <span className="w-max text-[#2b2f2e] text-[1.25rem] font-[750] uppercase leading-6 tracking-[1px] font-serif">
                    Price ${productData.price}
                  </span>
                )
              }

              <div>
                <h2 className="text-base">{productData.description}</h2>
              </div>
              <div className="inline-flex flex-col gap-[15px]">
                <h2 className="text-2xl font-semibold">Color</h2>
                {isLoggedIn ? (
                  <Select
                    disallowEmptySelection={true}
                    label="Please Select Your Color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="max-w-full"
                    classNames={{
                      label: "text-black tracking-[2px]",
                      trigger:
                        "focus:ring-2 focus:ring-orange-300 focus:ring-offset-2",
                    }}
                    style={{ backgroundColor: "#fdba74" }}
                  >
                    {productData.colors.map((color, index) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {productData.colors.map((color, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 rounded-md"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="inline-flex flex-col gap-[15px]">
                <h2 className="text-2xl font-semibold">Size</h2>
                {isLoggedIn ? (
                  <Select
                    disallowEmptySelection={true}
                    label={
                      <div className="flex items-center gap-2">
                        {"Please Select Your Size"}
                        <Image
                          src={ButnIc}
                          width={16}
                          height={16}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                    }
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="max-w-full"
                    classNames={{
                      label: "text-black tracking-[2px]",
                      trigger:
                        "focus:ring-2 focus:ring-orange-300 focus:ring-offset-2",
                    }}
                    style={{ backgroundColor: "#fdba74" }}
                  >
                    {productData.sizes.map((size, index) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {productData.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 rounded-md"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full mt-20">
                {isLoggedIn ? (
                  <Button
                    radius="2px"
                    className="bg-gradient-to-tr from-orange-300 to-yellow-500 text-white shadow-lg w-full h-[56px] text-base tracking-[5px]"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? "Adding to cart..." : "Add To Cart 🛒"}
                  </Button>
                ) : (
                  <Button
                    radius="2px"
                    className="bg-gradient-to-tr from-orange-300 to-yellow-500 text-white shadow-lg w-full h-[56px] text-base tracking-[5px]"
                  >
                    Login to Add to Cart 🔒
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
