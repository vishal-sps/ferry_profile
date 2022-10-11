const initialState = {
    cartCount: 0
  };
  
  const cartCountReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CART_COUNT":
        return {
          ...state,
          cartCount : action.payload,
        };
  
      default:
        return { ...state };
    }
  };
  
  export default cartCountReducer;
  