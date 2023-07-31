import { FOOD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const foodApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getFood:builder.query({
            query:()=>({
                url:FOOD_URL
            })
        })
    })
})
export const {useGetFoodQuery}=foodApiSlice;
export default foodApiSlice;