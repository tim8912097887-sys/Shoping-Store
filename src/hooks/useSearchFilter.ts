import { useCallback } from "react"
import { useSearchParams } from "react-router"

type Filter = {
    category?: string
    search?: string
    page?: string
}

export const useSearchFilter = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = searchParams.get("page") || 0;
    // if it initialize,it won't change in the subsequent rerender
    const getNewParams = useCallback((newParams: Filter) => {
        // Copy current one
        const params = new URLSearchParams(searchParams);
        // Loop through new params and override the existing value
        Object.entries(newParams).forEach(([key,value]) => {
             if(value) {
                params.set(key,value);
             } else {
                params.delete(key);
             }
        })
        // Return a formatted string
        return `?${params.toString()}`;
         
    },[searchParams]);

    const setFilter = useCallback((filter: Filter) => {
        setSearchParams(params => {
            if(filter.category) {
               params.set("category",filter.category);
            } else {
               // Delete key if not provide or empty string
               params.delete("category");
            }
            if(filter.search) {
               params.set("search",filter.search);
            } else {
               // Delete key if not provide or empty string
               params.delete("search");
            }
            // Page always exist
            if(filter.page != null) params.set("page",filter.page);
            return params;
        })
    },[searchParams])

    return { category,search,page,getNewParams,setFilter };
}