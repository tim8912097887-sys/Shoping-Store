import { useEffect, useState } from "react"
import { getCategory } from "../apis/product.api"
import { useSearchFilter } from "../hooks/useSearchFilter";

const CategoryList = () => {
    
    const [categories,setCategories] = useState<string[]>([]);

    const { category,setFilter } = useSearchFilter();

    // Only fetch once when mount
    useEffect(() => {
       const fetchCategory = async() => {
           const respond = await getCategory();
           if(respond.success && respond.data) setCategories(respond.data);
       }
       fetchCategory();
    },[])

  return (
    <div className="my-6">
      <select className="py-3.5 px-5 text-2xl border-2" value={category || ""} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter({ category: e.target.value,page: "0" })} >
        {/* For all categories */}
        <option value="" >All Categories</option>
        {categories.map((cat) => {
            return <option key={cat} value={cat}>{cat}</option>
        })}
      </select>
    </div>
  )
}

export default CategoryList