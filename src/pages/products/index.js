import { useEffect, useState } from "react";
import { Progress, Spinner } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { getProducts } from "../../../global/product";
import ProductCard from "../../components/ProductCard";

export default function Index() {
  const Categories = [
    {
      id: 1,
      name: "shorts",
    },
    {
      id: 2,
      name: "shorts",
    },
    {
      id: 3,
      name: "shorts",
    },
    {
      id: 4,
      name: "shorts",
    },
  ];
  const sorted = [
    {
      id: 1,
      name: "Top Sellers",
    },
    {
      id: 2,
      name: "Special offers",
    },
    {
      id: 3,
      name: "Down sellers",
    },
    {
      id: 4,
      name: "our me",
    },
  ];
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [lodaing, setLoading] = useState(true);
  const [selectedKeysForCategories, setSelectedKeysForCategories] = useState(
    new Set(["text"])
  );
  const [selectedKeysForSorted, setselectedKeysForSorted] = useState(
    new Set(["text"])
  );

  const getAllProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching Top Sellers Products:", error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([getAllProducts()]);
      } catch (error) {
        console.error("Error occurred during fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (lodaing) {
    return (
      <div className="min-h-[400px] text-orange-500 flex justify-center items-center">
        <Spinner color="primary" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center mt-5 mx-5">
        <div className="md:text-xl text-lg mb-2 font-bold text-right whitespace-nowrap">
          <p>Our Products</p>
        </div>
        <Progress
          size="sm"
          color="warning"
          value={100}
          className="font-bold text-orange-400 my-4 mx-3 md:block hidden"
        />
        <div className="flex justify-end gap-1 items-center">
          <div className="text-orange-400 text-lg font-bold">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className=" p-0 px-2 mb-2 bg-inherit border-2 border-orange-400 hover:bg-orange-200"
                  variant="bordered"
                  // className="capitalize"
                >
                  Category
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedKeysForCategories}
                onSelectionChange={setSelectedKeysForCategories}
              >
                {Categories.map((cat) => (
                  <DropdownItem key={cat.id}>{cat.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className=" p-0 px-2 mb-2 bg-inherit border-2 border-orange-400 hover:bg-orange-200"
              >
                Sort
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeysForSorted}
              onSelectionChange={setselectedKeysForSorted}
            >
              {sorted.map((product) => (
                <DropdownItem key={product.id}>{product.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 gap-6 mb-2 lg:px-5">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            prodectname={product.title}
            price={product.price}
            img={product.imageCover}
          />
        ))}
      </div>
    </div>
  );
}
