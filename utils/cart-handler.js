

const cartHandler = (actionType, dishId, cuisineId, dishes, mutateCart, chef_id, cartMutateCount=null) => {
  if (localStorage.getItem("chef_id") == chef_id || !localStorage.getItem("chef_id")) {
  if (actionType === "INCREMENT" || actionType === "ADD") {
    const dishIndex = dishes.findIndex((dish) => dish.id === dishId);
    const clonedDishes = JSON.parse(JSON.stringify([...dishes]));
    clonedDishes[dishIndex].count++;

    mutateCart(cuisineId, actionType, clonedDishes[dishIndex]);
    if (cartMutateCount) {
      cartMutateCount(cuisineId, actionType, clonedDishes[dishIndex]);
    }
    localStorage.setItem('chef_id', chef_id);

    // mutateCart2(clonedDishes[dishIndex]);
  } else {
    const dishIndex = dishes.findIndex((dish) => dish.id === dishId);
    const clonedDishes = JSON.parse(JSON.stringify([...dishes]));
    clonedDishes[dishIndex].count--;

    mutateCart(cuisineId, actionType, clonedDishes[dishIndex]);
    if (cartMutateCount) {
    cartMutateCount(cuisineId, actionType, clonedDishes[dishIndex]);
    }
    if ((clonedDishes[dishIndex].count--) === 0) {
      localStorage.removeItem('chef_id');
    } else {
    localStorage.setItem('chef_id', chef_id);

    }


  }
} else {
  return false;
}
};

export default cartHandler;
