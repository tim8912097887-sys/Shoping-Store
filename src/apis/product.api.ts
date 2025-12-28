import axios from "axios";
import { baseConfig } from "./instance";
import type { Product } from "../pages/Home";

type RespondType = {
    data: DataType
}

type DataType = {
    products: Product[]
    skip: number
    limit: number
    total: number
}

type Filter = {
    skip: number
    limit: number
    category?: string | null
    search?: string | null
}

const productRequest = axios.create({
    ...baseConfig,
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

export const getProducts = async(filter: Filter) => {

    try {
       const respond = await productRequest({
         url: `/products${filter.category?`/category/${filter.category}?`:filter.search?`/search?q=${filter.search}&`:"?"}limit=${filter.limit}&skip=${filter.skip*filter.limit}`
       }) as RespondType
       return { success: true,data: respond.data };
    } catch (error: any) {
        if (error.response) {
        // If server response with invalid credential,stands for invalid username or password
        // Otherwise don't leak the error info directly to clien
        console.log(error.response.data);
        
           return { success: false,errorMsg: "Something went wrong" };
        
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return { success: false,errorMsg: "Request fail" };
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return { success: false,errorMsg: "Something went wrong" };
        }
    }
}

export const getCategory = async() => {
        try {
            const respond = await productRequest({
                url: `https://dummyjson.com/products/category-list`
            }) as { data: string[] }
            return { success: true,data: respond.data };
        } catch (error: any) {
            if (error.response) {
            // If server response with invalid credential,stands for invalid username or password
            // Otherwise don't leak the error info directly to clien
            console.log(error.response.data);
            
            return { success: false,errorMsg: "Something went wrong" };
            
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            return { success: false,errorMsg: "Request fail" };
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return { success: false,errorMsg: "Something went wrong" };
            }
        }
}