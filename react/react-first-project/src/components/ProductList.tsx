import { useEffect, useState } from "react";

function ProductList({category}:{category:string}){

    const [products,setProducts]=useState<string[]>([])

    useEffect(()=>{
        console.log(`selecting `,category);
        setProducts(['Clothing','HouseHold']);
    },[category]);
    return (
        <div>ProductList</div>
    )
}

export default ProductList;