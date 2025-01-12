import toast from "react-hot-toast";

export const fetchProducts = async () => {
    const response = await fetch('/api/product/adminproduct');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json();
};

export const deleteProduct = async (productId) => {
    try{
        
        const response = await fetch(`/api/product/delete/${productId}`,
            {
                method: "DELETE",
            }
        );
        console.log(response);
        const data = await response.json();

        console.log(data);

        if(data.error) {
            throw new Error(data.error);
        }

        toast.success('product deleted successfully')   

    }
    catch(err){
        toast.error("error from backend");
    }
  
   
  
};
export const updateProduct = async (productId, form) => {
    const response = await fetch(`/api/product/update/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return await response.json();
};


export const fetchProductById = async (productId) => {
    const response = await fetch(`/api/product/getbyid/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return await response.json();
};