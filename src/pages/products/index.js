import { useEffect, useState } from "react";
import {
  Input,
  Progress,
  Select,
  SelectItem,
  Spinner,
  Divider,
} from "@nextui-org/react";
import { getProducts, getSubCategories } from "../../../public/global/product";
import ProductCard from "../../components/ProductCard";
import { getWishlist } from "../../../public/global/wishlist";
import { useRouter } from "next/router";

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

  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

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

  const getAllProducts = async () => {
    try {
      const q = {
        page: 1,
        sort: sortOrder,
        keyword: keyword,
        subcategories: selectedKeysForCategories,
      };
      if (selectedKeysForCategories.length == 0) delete q.subcategories;
      const query = new URLSearchParams(q).toString();
      const res = await getProducts(query);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await getSubCategories();
      setSubCategories(res.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    if (query) {
      if (query.sort !== undefined) {
        setSortOrder(query.sort);
      }
      if (query.category !== undefined) {
        setSelectedKeysForCategories(query.category);
      }
    }
    const fetchData = async () => {
      try {
        setLoadingPage(true);
        await Promise.all([getAllProducts(), fetchSubCategories()]);
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

  useEffect(() => {
    const updateProducts = async () => {
      setLoadingProducts(true);
      await getAllProducts();
      setLoadingProducts(false);
    };
    updateProducts();
  }, [sortOrder, selectedKeysForCategories, keyword]);

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
          color="warning"
          value={100}
          className="w-full md:w-1/3 hidden md:block"
        />
        <div className="w-full md:w-1/3 flex justify-around items-center">
          <Select
            selectionMode="multiple"
            aria-label="Filter by category"
            placeholder="Category"
            variant="bordered"
            onChange={(e) => {
              setSelectedKeysForCategories(e.target.value);
              router.push(
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
              <SelectItem key={cat._id} value={cat.id}>
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
              router.push(
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
            <SelectItem key="-price">Higher price</SelectItem>
            <SelectItem key="price">Lower price</SelectItem>
            <SelectItem key="createdAt">Oldest</SelectItem>
            <SelectItem key="-createdAt">Newest</SelectItem>
          </Select>
        </div>
      </div>
      <Divider className="my-6" />
      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            prodectname={product.title}
            price={product.price}
            img={product.imageCover}
            id={product._id}
            onAddToWishlist={handleAddToWishlist}
            onDeleteFromWishlist={handleDeleteFromWishlist}
            isFav={isLoggedIn && favoriteProducts.includes(product._id)}
          />
        ))}
      </div>
      {loadingProducts && (
        <div className="flex justify-center mt-6">
          <Spinner color="primary" />
        </div>
      )}
    </div>
  );
}
