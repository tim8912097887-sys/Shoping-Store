import type { Product } from "../pages/Home"

type Props = {
    product: Product
}

const WORD_LIMIT = 20;

const ProductCard = ({ product }:Props) => {
  return (
    <div className="border-2 rounded w-2xs">
       <div className="w-full">
         <img src={product.images[0]} alt={product.title} className="w-full h-auto" />
       </div>
       <div className="w-full p-4">
         <h3 className="text-[1.25rem] mb-2 font-bold">{product.title}</h3>
         <p className="text-[1rem] mb-2">{product.description.substring(0,WORD_LIMIT)}...</p>
         <span className="text-[1rem]">${product.price}</span>
       </div>
    </div>
  )
}

export default ProductCard