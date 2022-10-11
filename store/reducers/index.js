import { combineReducers } from "redux";
import searchPayloadReducer from "./search-payload-reducer";
import chefReducer from "./chef-reducer";
import reviewReducer from "./review-reducer";
import geoLocationReducer from "./geo-location-reducer";
import cartCountReducer from "./cartCount-reducer";

const rootReducer = combineReducers({
  searchPayload: searchPayloadReducer,
  chef: chefReducer,
  reviews: reviewReducer,
  geoLocation: geoLocationReducer,
  cartCount: cartCountReducer
});

export default rootReducer;
