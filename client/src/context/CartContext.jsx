import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async(product,productId) => {
        setCartItems([...cartItems, product]);
        try{
            const res = await fetch(`/api/cart/add/${productId}`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartItems),
            });
    

            const data = await res.json();
    
            if(data.error) {
                throw new Error(data.error);
            }

        }
        catch(err){
            toast.error(err.message);
        }  
    };

const count  = cartItems.length;

    return (
        <CartContext.Provider value={{ cartItems, addToCart,count }}>
            {children}
        </CartContext.Provider>
    );
};
