import { useEffect, useRef, useState } from "react";
import {
  Input,
  Progress,
  Select,
  SelectItem,
  Spinner,
  Divider,
  Button,
} from "@nextui-org/react";
import { getProducts, getSubCategories } from "../../../public/global/product";
import ProductCard from "../../components/ProductCard";
import { getWishlist } from "../../../public/global/wishlist";
import { useRouter } from "next/router";
import MovingCircles from "../../components/MovingCircles";

export default function Index() {
  const router = useRouter();
  const query = router.query;
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedKeysForCategories, setSelectedKeysForCategories] = useState(
    []
  );
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFirstLoad = useRef(true);

  // Function to check user login status
  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

  // Function to handle adding a product to the wishlist
  const handleAddToWishlist = (id) => {
    setFavoriteProducts([...favoriteProducts, id]);
  };

  // Function to handle deleting a product from the wishlist
  const handleDeleteFromWishlist = (id) => {
    const index = favoriteProducts.indexOf(id);
    if (index !== -1) {
      favoriteProducts.splice(index, 1);
    }
    setFavoriteProducts([...favoriteProducts]);
  };

  // Function to fetch all products based on filters and pagination
  const getAllProducts = async (page) => {
    try {
      const q = {
        page: page,
        limit: 20,
        sort: sortOrder,
        keyword: keyword,
        subcategories: selectedKeysForCategories,
      };
      if (selectedKeysForCategories.length === 0) delete q.subcategories;
      const query = new URLSearchParams(q).toString();
      const res = await getProducts(query);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setProducts(page == 1 ? res.data : [...products, ...res.data]);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  // Function to fetch all subcategories
  const fetchSubCategories = async () => {
    try {
      const res = await getSubCategories();
      setSubCategories(res.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Function to load more products when "Load More" button is clicked
  const loadMoreProducts = async () => {
    setPage(page + 1);
    setLoadingProducts(true);
    await getAllProducts(page + 1);
    setLoadingProducts(false);
  };

  // Effect to run on initial component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingPage(true);
        await Promise.all([fetchSubCategories()]);
      } catch (error) {
        console.error("Error occurred during fetching data:", error);
      } finally {
        setLoadingPage(false);
      }
    };
    fetchData();

    checkLoginStatus();
    const interval = setInterval(() => {
      checkLoginStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Effect to update products when sort order, categories, or keyword change
  useEffect(() => {
    const updateProducts = async () => {
      setPage(1);
      setLoadingProducts(true);
      await getAllProducts(1);
      setLoadingProducts(false);
    };
    updateProducts();
  }, [sortOrder, selectedKeysForCategories, keyword]);

  // Effect to handle query parameters only on the first load
  useEffect(() => {
    if (query) {
      if (query.sort !== undefined) {
        setSortOrder(query.sort);
      }
      if (query.cat !== undefined) {
        setSelectedKeysForCategories(
          query.cat.split(",").filter((i) => i.length > 0)
        );
      }
      isFirstLoad.current = false;
    }
  }, [query]);

  // Effect to fetch favorite products when user is logged in
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        setLoadingPage(true);
        const wishlist = await getWishlist();
        setFavoriteProducts(wishlist.map((item) => item._id));
      } catch (error) {
        console.error("Error occurred during fetching data:", error);
      } finally {
        setLoadingPage(false);
      }
    };
    if (isLoggedIn) fetchFavoriteProducts();
  }, [isLoggedIn]);

  if (loadingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-500">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 w-full justify-between items-center">
        <div className="w-full md:w-1/3">
          <Input
            aria-label="Search products"
            placeholder="Search.."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            fullWidth
            bordered
            className="rounded-md"
          />
        </div>
        <Progress
          size="sm"
          aria-label="Loading progress"
          color="primary"
          value={100}
          className="w-full md:w-1/3 hidden md:block"
        />
        <div className="w-full md:w-1/3 flex justify-around items-center">
          <Select
            selectionMode="multiple"
            aria-label="Filter by category"
            placeholder="Category"
            variant="bordered"
            defaultSelectedKeys={selectedKeysForCategories}
            onChange={(e) => {
              setSelectedKeysForCategories(
                e.target.value.split(",").filter((i) => i.length > 0)
              );
              router.replace(
                {
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    cat: e.target.value,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
            className="w-[49%]"
          >
            {subCategories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            defaultSelectedKeys={[sortOrder]}
            aria-label="Sort products"
            placeholder="Sort"
            variant="bordered"
            onChange={(e) => {
              const selectedKey = e.target.value;
              setSortOrder(selectedKey);
              router.replace(
                {
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    sort: selectedKey,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
            className="w-[49%]"
          >
            <SelectItem key="-discount">Top offers</SelectItem>
            <SelectItem key="-sold">Top seller</SelectItem>
            <SelectItem key="-price">Higher price</SelectItem>
            <SelectItem key="price">Lower price</SelectItem>
            <SelectItem key="createdAt">Oldest</SelectItem>
            <SelectItem key="-createdAt">Newest</SelectItem>
          </Select>
        </div>
      </div>
      <Divider className="my-6" />
      {/* Products */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovingCircles numCircles={15} />
        {products.map((product) => (
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
      </div>
      {loadingProducts ? (
        <div className="flex justify-center mt-6">
          <Spinner color="primary" />
        </div>
      ) : (
        hasMore && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={loadMoreProducts}
              isDisabled={loadingProducts}
              color="primary"
              auto
            >
              Load More
            </Button>
          </div>
        )
      )}
    </div>
  );
}
