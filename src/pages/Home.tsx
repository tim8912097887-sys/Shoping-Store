import { useState } from "react";
import Pagination from "../components/Pagination";
import ProductContainer from "../components/ProductContainer";
import CategoryList from "../components/CategoryList";

const PRODUCT_LIMIT = 10;

export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  images: string[]
}

const Home = () => {

  const [total,setTotal] = useState(0);
  
  const totalPages = Math.ceil(total/PRODUCT_LIMIT);

  return (
    <div className="h-auto w-full flex flex-col items-center py-5">
      <CategoryList/>
      <ProductContainer total={total} setTotal={setTotal} />
      {/* Only show pagination when total page is greater than zero */}
      {total>0 && <Pagination totalPages={totalPages} />}
    </div>
  )
}

export default Home