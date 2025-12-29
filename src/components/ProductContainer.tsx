import { useEffect, useState } from "react"
import type { Product } from "../pages/Home"
import ProductCard from "./ProductCard"
import { getProducts } from "../apis/product.api"
import { useSearchFilter } from "../hooks/useSearchFilter"
import { PageLoader } from "./PageLoader"

type Props = {
    setTotal: (total: number) => void
    total: number
}

const PRODUCT_LIMIT = 10;

const ProductContainer = ({ setTotal,total }:Props) => {

  const { page,category,search } = useSearchFilter();
  const [loading,setLoading] = useState(true);
  const [errorMsg,setErrorMsg] = useState("");
  const [products,setProducts] = useState<Product[]>([]);
  const currentPage = Number(page) || 0;
  
  // Fetch products when page or category or search change
  useEffect(() => {
      const getFirtPage = async() => {
         // Set the request state 
         setLoading(true);
         setErrorMsg("");
         const filter = { limit: PRODUCT_LIMIT,skip: currentPage,category: category,search: search };
         const respond = await getProducts(filter);
         if(!respond.success) {
           setErrorMsg(respond.errorMsg as string);
           // When fetch error occur hide the pagination 
           setTotal(0);
         } else {
           // If total value change,set the new one 
           if(total !== respond.data!.total) setTotal(respond.data!.total);
           setProducts(respond.data!.products);
         }
         setLoading(false);
      }
      getFirtPage();
  },[currentPage,category,search])

  if(errorMsg !== "") return <div>{errorMsg}</div>
  if(loading) return <PageLoader/>;
  return (
    <div className="flex flex-wrap gap-3 justify-center">
       {products.map(product => {
          return <ProductCard key={product.id} product={product}  />
       })}
    </div>
  )
}

export default ProductContainer