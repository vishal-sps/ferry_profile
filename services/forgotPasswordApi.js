import apiClient from ".";
export const emailSubmitForFogotPassword = async (payload) => {
    try {
      const data = await apiClient.post("user/pub/user-forgot-password", { json: payload }).json();
      return data;
    } catch (err) {
      console.log('error', err);
      throw new Error("failed");
    }
  };


  export const resetPasswordApi = async (payload) =>{
    try {
        const data = await apiClient.post("user/pub/user-set-password", { json: payload }).json();
        return data;
      } catch (err) {
        console.log('err', err.status);
        // return err?.status
        throw new Error(err);
      }
  }