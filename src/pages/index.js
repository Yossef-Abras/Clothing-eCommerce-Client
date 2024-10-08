import React, { useEffect, useState } from "react";
import PromoCategoryCard from "../components/PromoCategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../components/ProductCard";
import { Button, Progress, Spinner } from "@nextui-org/react";
import MovingCircles from "../components/MovingCircles";
import { getProducts, getSubCategories } from "../../public/global/product";
import { useRouter } from "next/router";
import { getWishlist } from "../../public/global/wishlist";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#4d4e49",
        borderRadius: "50%",
        paddingTop: "1px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#4d4e49",
        borderRadius: "50%",
        paddingTop: "1px",
      }}
      onClick={onClick}
    />
  );
}

export default function Home() {
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1580,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const router = useRouter();
  const [TopSellersProductsproducts, setTopSellersProducts] = useState([]);
  const [TopOffersproducts, setTopOffersProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lodaing, setLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function getRandomIntBetween(a, b) {
    if (a > b) {
      [a, b] = [b, a];
    }
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  const handleAddToWishlist = (id) => {
    setFavoriteProducts([...favoriteProducts, id]);
  };

  const handleDeleteFromWishlist = (id) => {
    const index = favoriteProducts.indexOf(id);
    if (index !== -1) {
      favoriteProducts.splice(index, 1);
    }
    setFavoriteProducts([...favoriteProducts]);
  };

  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

  const getTopSellersProducts = async () => {
    try {
      const res = await getProducts("limit=8&sort=-sold");
      setTopSellersProducts(res.data);
    } catch (error) {
      console.error("Error fetching Top Sellers Products:", error);
      throw error;
    }
  };

  const getTopOffersProducts = async () => {
    try {
      const res = await getProducts("limit=8&sort=-discount");
      const filteredProducts = res.data.filter((product) =>
        product.hasOwnProperty("priceAfterDiscount")
      );
      setTopOffersProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching Top Offers Products:", error);
      throw error;
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await getSubCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          getTopSellersProducts(),
          getTopOffersProducts(),
          getAllCategories(),
        ]);
      } catch (error) {
        console.error("Error occurred during fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    checkLoginStatus();
    const interval = setInterval(() => {
      checkLoginStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        setLoading(true);
        const wishlist = await getWishlist();
        setFavoriteProducts(wishlist.map((item) => item._id));
      } catch (error) {
        console.error("Error occurred during fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn) fetchFavoriteProducts();
  }, [isLoggedIn]);

  if (lodaing) {
    return (
      <div className="min-h-[400px] text-primary flex justify-center items-center">
        <Spinner color="primary" />
      </div>
    );
  }
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start">
      <MovingCircles numCircles={20} />
      <div className="w-full flex justify-center bg-gradient-to-r from-gray-100/50 via-gray-200/50 to-gray-300/50 backdrop-blur-md">
        {/* <Slider className="md:w-[700px] w-[300px]"> */}
        <div className="">
          <PromoCategoryCard
            categories={categories}
            img={
              TopSellersProductsproducts[
                getRandomIntBetween(0, TopSellersProductsproducts.length - 1)
              ]?.imageCover
            }
          />
        </div>
        {/* </Slider> */}
      </div>
      <div className="w-full backdrop-blur-md m-5 my-10 px-5 pt-4">
        <div className="flex justify-between items-center">
          <label className="text-primary text-lg font-bold">Top Sellers</label>
          <Button
            onClick={() => {
              router.push("/products?sort=-sold");
            }}
            className=" p-0 px-2 mb-2 bg-inherit border-2 border-primary rounded-2xl hover:bg-primary/30 "
          >
            Show More
          </Button>
        </div>

        <Progress
          size="sm"
          color="primary"
          value={100}
          className="font-bold text-primary"
        />

        <div className="relative w-[86%] mx-auto m-3">
          <div className="flex">
            <Slider className="w-full" {...settings1}>
              {TopSellersProductsproducts.map((product) => (
                <ProductCard
                  key={product._id}
                  prodectname={product.title}
                  price={product.price}
                  priceAfterDiscount={product.priceAfterDiscount}
                  img={product.imageCover}
                  id={product._id}
                  onAddToWishlist={handleAddToWishlist}
                  onDeleteFromWishlist={handleDeleteFromWishlist}
                  isFav={isLoggedIn && favoriteProducts.includes(product._id)}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="w-full backdrop-blur-md m-5 my-10 px-5 pt-4">
        <div className="flex justify-between items-center">
          <label className="text-primary text-lg font-bold">
            Special Offers
          </label>
          <Button
            onClick={() => {
              router.push("/products?sort=-discount");
            }}
            className=" p-0 px-2 mb-2 bg-inherit border-2 border-primary rounded-2xl hover:bg-primary/30 "
          >
            Show More
          </Button>
        </div>
        <Progress
          size="sm"
          color="primary"
          value={100}
          className="font-bold text-primary"
        />
        <div className="relative w-[86%] mx-auto m-3">
          <div className="flex">
            <Slider className="w-full" {...settings1}>
              {TopOffersproducts.map((product) => (
                <ProductCard
                  key={product._id}
                  prodectname={product.title}
                  price={product.price}
                  priceAfterDiscount={product.priceAfterDiscount}
                  img={product.imageCover}
                  id={product._id}
                  onAddToWishlist={handleAddToWishlist}
                  onDeleteFromWishlist={handleDeleteFromWishlist}
                  isFav={isLoggedIn && favoriteProducts.includes(product._id)}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </main>
  );
}
