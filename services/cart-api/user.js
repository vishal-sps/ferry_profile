import apiClient from "..";

export const addToCart = async (payload) => {
    try {
        const data = await apiClient
            .post(`user/api/consumer/add-to-cart`, { json: payload })
            .json();
        return data;
    }
    catch (err) {
        // throw new Error(err);
        console.log(err)
    }
};

export const fetchCart = async () => {
    try {
        const data = await apiClient
            .get(`user/api/consumer/get-cart`)
            .json();
        return data;
    }
    catch (err) {
        // throw new Error(err);
        console.log(err)
    }
}

export const getCartSettings = async () => {
    try {
        const data = await apiClient
            .get(`pub/get-cart-settings`)
            .json();
        return await data;
    }
    catch (err) {
        // throw new Error(err);
        console.log(err)
    }
}

export const getGroceryCharges = async () => {
    try {
        const data = await apiClient
            .get(`pub/get-grocery-charges`)
            .json();
        return await data;
    }
    catch (err) {
        // throw new Error(err);
        console.log(err)
    }
}


export const updateCartCount = async (payload) => {
    try {
        const data = await apiClient
            .put(`user/api/consumer/update-cart-count`, { json: payload })
            .json();
        return data;
    }
    catch (err) {
        // throw new Error(err);
        console.log(err)
    }
}

export const getChefAvailability = async (chefId) => {
    try {
        const data = await apiClient
            .get(`user/api/booking/get-chef-availability/${chefId}`)
            .json();
        return data;
    }
    catch (err) {
        // throw new Error(err);
        console.log(err)
    }
}
