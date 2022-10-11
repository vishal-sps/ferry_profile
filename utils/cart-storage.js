import { addToCart } from "../services/cart-api/user";
import isBrowser from "./is-browser";

import useSWR, { mutate } from "swr";

import { fetchUserProfile } from "../services/user-api";


const cartStorage = (() => {
  const getStore = () => {
    return (isBrowser() && JSON.parse(localStorage.getItem("cart"))) || [];
  };

  const setStore = (store) => {
    return isBrowser() && localStorage.setItem("cart", JSON.stringify(store));
  };

  const updateCart = (identifier, actionType, payload) => {
    const store = getStore();
    const storeItemIndex = store.findIndex((item) => item.id === identifier);

    if (storeItemIndex >= 0) {
      const storeItem = store[storeItemIndex];
      const cartItemIndex = storeItem.data.findIndex(
        (item) => item.id === payload.id
      );
      if (cartItemIndex >= 0) {
        storeItem.data[cartItemIndex] = payload;
      } else {
        storeItem.data.push(payload);
      }
      setStore(store);
    
      // const payload__ = store[0].data[0];
      // get user_id from localStorage
      // const user_id = localStorage.getItem("userId");
      const user_id = getStore()[0]?.user_id
      // add user_id to payload
      // payload__.user_id = user_id;
      // payload__.actionType = actionType;
      // if (actionType === "DECREMENT") {
      // }
      // for each object in store, add user_id
      

      for (let i = 0; i < store.length; i++) {
        store[i].user_id = user_id;

        // loop through each object in store[i].data
        for (let j = 0; j < store[i].data.length; j++) {
          let element = store[i].data[j];
          // remove "_id" key from data list
          // delete store[i].data._id;
          // remove "_id" key from element
          delete element?._id;
          if (typeof element === "string") {
            store[i].data.splice(j, 1);
          }
        }

      }
      addToCart(store);
    }
    // if no cart Item with cuisine Id create cart item
    else {
      const cartItem = { id: identifier, data: [payload] };
      setStore([...store, cartItem]);
      // const user_id = localStorage.getItem("userId");
      const user_id = getStore()[0]?.user_id
      // add user_id to payload
      // payload__.user_id = user_id;
      // payload__.actionType = actionType;
      // if (actionType === "DECREMENT") {
      // }
      // for each object in store, add user_id
      

      for (let i = 0; i < store.length; i++) {
        store[i].user_id = user_id;

        // loop through each object in store[i].data
        for (let j = 0; j < store[i].data.length; j++) {
          let element = store[i].data[j];
          // remove "_id" key from data list
          // delete store[i].data._id;
          // remove "_id" key from element
          delete element._id;
          if (typeof element === "string") {
            store[i].data.splice(j, 1);
          }
        }

      }

      addToCart(store);

      // mutate([...store, cartItem])
    }

    return getStore();
  };

  const getCart = () => {
    const store = getStore();
    return store
      .map((item) =>
        item.data.map((cartItem) => ({ ...cartItem, cuisineId: item.id }))
      )
      .flat()
      .filter((item) => item.count > 0);
  };

  const getCartItemTotalCount = () => {
    const cart = getCart();
    let total = 0;

    cart.forEach((item) => {
      total += item.count;
    });

    return total;
  };

  const crushCart = () => {
    return isBrowser() && localStorage.removeItem("cart");
  };

  return { updateCart, getCart, getStore, crushCart, getCartItemTotalCount };
})();

export default cartStorage;
