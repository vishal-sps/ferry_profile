import { useState, useEffect } from "react";
import cartStorage from "../utils/cart-storage";
import { useDispatch } from "react-redux";

export default function useCart() {
  const [state, setState] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    setState(cartStorage.getStore());
  }, []);

  useEffect(() => {
    setCart(cartStorage.getCart());
  }, [state]);

  useEffect(()=>{
    dispatch({type: "CART_COUNT", payload: cartStorage.getCartItemTotalCount()})
  },[state])
  const mutateCart = (identifier, actionType, payload) => {
    const updatedStore = cartStorage.updateCart(identifier, actionType, payload);
    setState(updatedStore);
  };

  return {
    mutateCart,
    cart,
    store: state,
    cartCount: cartStorage.getCartItemTotalCount(),
    cartMutateCount: mutateCart,
  };
}
