import apiClient from ".";

export const fetchChefBookings = async (payload) => {
  try {
    const data = await apiClient
      .get(`user/api/booking/get-a-booking?${payload}`)
      .json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchOrderDetails = async (payload) => {
  try {
    const data = await apiClient
      .get(`user/api/booking/get-booking-by-id/${payload}`)
      .json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const CancelBookingAPI = async (payload, data) => {
  try {
    const data = await apiClient
      .put(`user/api/booking/cancel-a-booking/${payload}`,  { json: data })
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};


