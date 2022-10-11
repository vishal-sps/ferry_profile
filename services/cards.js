import apiClient from ".";

 export const GetCardAPI = async () => {
    try {
      const data = await apiClient
        .get(`user/api/payment/get-payment-method`)
        .json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  };

export const AddCardAPI = async (payload) => {
    try {
      const data = await apiClient
        .post(`user/api/payment/create-card`, { json: payload })
        .json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  };

  export const DeleteCardAPI = async (payload) => {
    try {
      const data = await apiClient
        .post(`user/api/payment/delete-card`, { json: payload })
        .json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  };