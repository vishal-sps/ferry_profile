import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "nextjs-toast";

import SuccessfulBookings from "../../components/landing-page/successful-bookings";
import StickyCart from "../../components/profile/chef/sticky-cart";
import Cuisine from "../../components/profile/chef/cuisine";
import DishGallery from "../../components/profile/chef/dish-gallery";
import Dish from "../../components/profile/chef/dish-details";

import { IMAGE_URL } from "../../constants/enviroment-vars";
import { fetchChef } from "../../store/actions/chef-actions";
import { fetchUserCusinesAndDishCount } from "../../services/cuisine-api/user";
import { fetchUserChefDishesByCuisineId } from "../../services/dish-api/user";
import useSyncDish from "../../custom-hooks/use-sync-dish";
import cartHandler from "../../utils/cart-handler";
import useChef from "../../custom-hooks/use-chef";
import useUser from "../../custom-hooks/use-user";
import ReviewModal from "../../components/modals/review-modal";
import Empty from "../../components/empty";
import useCart from "../../custom-hooks/use-cart";
import { myLoader } from "../../services/custom_loader";
import { fetchChefProfile } from "../../services/chef-api";
import apiClient from "../../services/index"

function Profile({cusinesAndDishCount,chefProfileResponse }) {
  // hooks
  const router = useRouter();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const chef = useSelector((state) => state.chef.data);
  const { saveChef } = useChef();
  const { user } = useUser();
  const { cart, cartMutateCount, cartCount } = useCart();

console.log('cusinesAndDishCount', cusinesAndDishCount);
// console.log('chefProfileResponse',chefProfileResponse);
  // state
  const [cuisines, setCuisines] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState({});
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [loadingCuisines, setLoadingCuisines] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);


  const { syncedDishes, mutateCart } = useSyncDish(
    selectedCuisine.id,
    dishes
  );

  const getDishesByCuisineId = useCallback(
    async (payload) => {
      try {
        const response = await fetchUserChefDishesByCuisineId(payload);
        setDishes(response || []);
      } catch (err) {
        console.log(err);
        setDishes([]);
        if (err.message.includes("404")) {
          snackbar.showMessage(
            "This cuisine doesn't contain any dishes",
            "error",
            "filled"
          );
          return;
        }
        snackbar.showMessage(
          "An error occured while fetching dishes probably a network error try refreshing the page",
          "error",
          "filled"
        );
      } finally {
        setLoadingDishes(false);
      }
    },
    [snackbar]
  );

  console.log('cuisines', cuisines);

  // const getCuisineAndDishCount = useCallback(
  //   async (id) => {
  //     try {
  //       const response = await fetchUserCusinesAndDishCount(id);
  //       setCuisines(response || []);
  //       setSelectedCuisine(response[0]);
  //     } catch (err) {
  //       console.log(err);
  //       snackbar.showMessage(
  //         "An error occured while fetching cuisines probably a network error try refreshing the page",
  //         "error",
  //         "filled"
  //       );
  //     } finally {
  //       setLoadingCuisines(false);
  //     }
  //   },
  //   [snackbar]
  // );



  // use effect to fetch cuisines
  useEffect(() => {
    // if (router.isReady) {
      if(router.query.id){
        dispatch(fetchChef(router.query.id));
        // getCuisineAndDishCount(router.query.id);
        setCuisines(cusinesAndDishCount || []);
        setSelectedCuisine(cusinesAndDishCount[0]);
        setLoadingCuisines(false);
      }
     
    // }
  }, [router.query.id, router.isReady, dispatch,cusinesAndDishCount ]);

  // useffect to fetch dishes
  useEffect(() => {
    const payload = {
      cuisineId: selectedCuisine.id,
      chefId: router.query.id,
    };

    if (selectedCuisine.id && router.query.id) {
      getDishesByCuisineId(payload);
    }
  }, [selectedCuisine.id, router.query.id, getDishesByCuisineId]);

  useEffect(() => {
    if (router.query.id == localStorage.getItem('chef_id') || !localStorage.getItem('chef_id')) {
    saveChef(chef);
    }
  }, [chef, saveChef]);

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  const handleSelectedCuisine = (cuisine) => {
    setLoadingDishes(true);
    setSelectedCuisine(cuisine);
  };

  const handleReviewModal = () => {
    if (user) {
      setShowReviewModal(true);
      return;
    }
    router.push("/login");
  };

  return (
    <>
      {/* review modal */}
      <ReviewModal
        chefId={router.query.id}
        show={showReviewModal}
        setShowReviewModal={setShowReviewModal}
      />

      {/* sticky cart */}
      {cartCount && !loadingDishes ? (
        <StickyCart
          total={cartCount}
          canProceed={user ? true : false}
          cart={cart}
        />
      ) : null}
      <div className="pt-16 md:pt-24 wrapper">
        {/* breadcrumbs */}
        <div className="mb-10 text-sm font-medium capitalize">
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          /{" "}
          <Link href="/chef/search">
            <a>{chef?.city?.name}</a>
          </Link>{" "}
          /{" "}
          <Link href="/chef/search">
            <a>{"Party"}</a>
          </Link>{" "}
          / <span className="text-gray-500">{chef?.fullName}</span>
        </div>

        <div className="flex mb-14">
          <section className="md:w-1/2">
            <div className="flex items-center mb-3">
              <div className="relative bg-gray-200 h-16 w-16 rounded-full">
                <Image
                  src={`${IMAGE_URL}${chef?.profilePic}`}
                  alt="chef"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  loader={myLoader}

                />
              </div>

              <div className="ml-2 flex flex-col justify-around">
                <h6 className="h6 capitalize">
                  {!chef?.fullName ? <Skeleton /> : chef?.fullName}
                </h6>

                <p className="text-sm text-gray-600">
                  {chef?.city?.name} {chef?.city?.stateCode}
                </p>
              </div>
            </div>

            <p className="mb-8 text-gray-500 p">
              {chef?.description ? chef?.description : "No Description Available"}
            </p>

            <div className="flex items-center justify-between">
              <Link href={user ? `/chef/reviews/${chef.id}` : "/login"}>
                <a className="btn btn-outline">
                  Past Bookings
                </a>
              </Link>

              <button
                className="link"
                onClick={handleReviewModal}
              >
                + Add a Review
              </button>
            </div>
          </section>

          <section className="w-1/2 hidden md:block" style={{ height: 240 }}>
            <DishGallery images={chef?.galleryImages} />
          </section>
        </div>

        <h2 className="font-semibold md:text-3xl text-xl md:mb-6 mb-5">
          Cuisines
        </h2>

        <div className="mb-14 bg-white">
          {!loadingCuisines ? (
            <div
              className="flex bg-white"
              style={{ overflowX: "auto", columnGap: 30 }}
            >
              {cuisines?.map((cuisine) => (
                <Cuisine
                  cuisine={cuisine}
                  isActive={selectedCuisine.id == cuisine.id}
                  setSelected={handleSelectedCuisine}
                  key={cuisine.id}
                />
              ))}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <h2 className="font-semibold text-3xl mb-6">
          {selectedCuisine.name} Dishes
        </h2>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-x-8 gap-y-16">
          {loadingDishes ? (
            <div>Loading...</div>
          ) : (
            <>
              {syncedDishes.length ? (
                <>
                  {syncedDishes?.map((dish, index) => (
                    <Dish
                      dishDetail={dish}
                      handleCart={(actionType, dishId) =>
                        cartHandler(
                          actionType,
                          dishId,
                          selectedCuisine.id,
                          syncedDishes,
                          mutateCart,
                          router.query.id,
                          cartMutateCount,

                        )
                      }
                      key={index}
                    />
                  ))}
                </>
              ) : (
                <div className="col-span-4">
                  <Empty
                    title={`No ${selectedCuisine.name} Dishes`}
                    type="dish"
                  />
                </div>
              )}
            </>
          )}
        </div>

      <SuccessfulBookings />
    </div>
    </>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  const UserCusinesAndDishCountResponse = await fetchUserCusinesAndDishCount(context.params.id);
  // const chefProfile =await apiClient.get(`user/pub/get-chef-profile/${context.params.id}`)
  // const chefProfileResponse = await chefProfile.json()
  return {
      props: {
        cusinesAndDishCount  : UserCusinesAndDishCountResponse,
        // chefProfileResponse : chefProfileResponse
      },
  }
}































































// import { useEffect, useState, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Skeleton from "react-loading-skeleton";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { useSnackbar } from "nextjs-toast";

// import SuccessfulBookings from "../../components/landing-page/successful-bookings";
// import StickyCart from "../../components/profile/chef/sticky-cart";
// import Cuisine from "../../components/profile/chef/cuisine";
// import DishGallery from "../../components/profile/chef/dish-gallery";
// import Dish from "../../components/profile/chef/dish-details";

// import { IMAGE_URL } from "../../constants/enviroment-vars";
// import { fetchChef } from "../../store/actions/chef-actions";
// import { fetchUserCusinesAndDishCount } from "../../services/cuisine-api/user";
// import { fetchUserChefDishesByCuisineId } from "../../services/dish-api/user";
// import useSyncDish from "../../custom-hooks/use-sync-dish";
// import cartHandler from "../../utils/cart-handler";
// import useChef from "../../custom-hooks/use-chef";
// import useUser from "../../custom-hooks/use-user";
// import ReviewModal from "../../components/modals/review-modal";
// import Empty from "../../components/empty";
// import useCart from "../../custom-hooks/use-cart";
// import { myLoader } from "../../services/custom_loader";

// function Profile() {
//   // hooks
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const snackbar = useSnackbar();
//   const chef = useSelector((state) => state.chef.data);
//   const { saveChef } = useChef();
//   const { user } = useUser();
//   const { cart, cartMutateCount, cartCount } = useCart();


//   // state
//   const [cuisines, setCuisines] = useState([]);
//   const [dishes, setDishes] = useState([]);
//   const [selectedCuisine, setSelectedCuisine] = useState({});
//   const [loadingDishes, setLoadingDishes] = useState(true);
//   const [loadingCuisines, setLoadingCuisines] = useState(true);
//   const [showReviewModal, setShowReviewModal] = useState(false);


//   const { syncedDishes, mutateCart } = useSyncDish(
//     selectedCuisine.id,
//     dishes
//   );

//   const getDishesByCuisineId = useCallback(
//     async (payload) => {
//       try {
//         const response = await fetchUserChefDishesByCuisineId(payload);
//         setDishes(response || []);
//       } catch (err) {
//         console.log(err);
//         setDishes([]);
//         if (err.message.includes("404")) {
//           snackbar.showMessage(
//             "This cuisine doesn't contain any dishes",
//             "error",
//             "filled"
//           );
//           return;
//         }
//         snackbar.showMessage(
//           "An error occured while fetching dishes probably a network error try refreshing the page",
//           "error",
//           "filled"
//         );
//       } finally {
//         setLoadingDishes(false);
//       }
//     },
//     [snackbar]
//   );

//   const getCuisineAndDishCount = useCallback(
//     async (id) => {
//       try {
//         const response = await fetchUserCusinesAndDishCount(id);
//         setCuisines(response || []);
//         setSelectedCuisine(response[0]);
//       } catch (err) {
//         console.log(err);

//         snackbar.showMessage(
//           "An error occured while fetching cuisines probably a network error try refreshing the page",
//           "error",
//           "filled"
//         );
//       } finally {
//         setLoadingCuisines(false);
//       }
//     },
//     [snackbar]
//   );

//   // use effect to fetch cuisines
//   useEffect(() => {
//     // if (router.isReady) {
//       if(router.query.id){
//         dispatch(fetchChef(router.query.id));
//         getCuisineAndDishCount(router.query.id);
//       }
     
//     // }
//   }, [router.query.id, router.isReady, dispatch, getCuisineAndDishCount]);

//   // useffect to fetch dishes
//   useEffect(() => {
//     const payload = {
//       cuisineId: selectedCuisine.id,
//       chefId: router.query.id,
//     };

//     if (selectedCuisine.id && router.query.id) {
//       getDishesByCuisineId(payload);
//     }
//   }, [selectedCuisine.id, router.query.id, getDishesByCuisineId]);

//   useEffect(() => {
//     if (router.query.id == localStorage.getItem('chef_id') || !localStorage.getItem('chef_id')) {
//     saveChef(chef);
//     }
//   }, [chef, saveChef]);

//   useEffect(() => {
//     router.prefetch("/login");
//   }, [router]);

//   const handleSelectedCuisine = (cuisine) => {
//     setLoadingDishes(true);
//     setSelectedCuisine(cuisine);
//   };

//   const handleReviewModal = () => {
//     if (user) {
//       setShowReviewModal(true);
//       return;
//     }
//     router.push("/login");
//   };

//   return (
//     <>
//       {/* review modal */}
//       <ReviewModal
//         chefId={router.query.id}
//         show={showReviewModal}
//         setShowReviewModal={setShowReviewModal}
//       />

//       {/* sticky cart */}
//       {cartCount && !loadingDishes ? (
//         <StickyCart
//           total={cartCount}
//           canProceed={user ? true : false}
//           cart={cart}
//         />
//       ) : null}
//       <div className="pt-16 md:pt-24 wrapper">
//         {/* breadcrumbs */}
//         <div className="mb-10 text-sm font-medium capitalize">
//           <Link href="/">
//             <a>Home</a>
//           </Link>{" "}
//           /{" "}
//           <Link href="/chef/search">
//             <a>{chef?.city?.name}</a>
//           </Link>{" "}
//           /{" "}
//           <Link href="/chef/search">
//             <a>{"Party"}</a>
//           </Link>{" "}
//           / <span className="text-gray-500">{chef?.fullName}</span>
//         </div>

//         <div className="flex mb-14">
//           <section className="md:w-1/2">
//             <div className="flex items-center mb-3">
//               <div className="relative bg-gray-200 h-16 w-16 rounded-full">
//                 <Image
//                   src={`${IMAGE_URL}${chef?.profilePic}`}
//                   alt="chef"
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-full"
//                   loader={myLoader}

//                 />
//               </div>

//               <div className="ml-2 flex flex-col justify-around">
//                 <h6 className="h6 capitalize">
//                   {!chef?.fullName ? <Skeleton /> : chef?.fullName}
//                 </h6>

//                 <p className="text-sm text-gray-600">
//                   {chef?.city?.name} {chef?.city?.stateCode}
//                 </p>
//               </div>
//             </div>

//             <p className="mb-8 text-gray-500 p">
//               {chef?.description ? chef?.description : "No Description Available"}
//             </p>

//             <div className="flex items-center justify-between">
//               <Link href={user ? `/chef/reviews/${chef.id}` : "/login"}>
//                 <a className="btn btn-outline">
//                   Past Bookings
//                 </a>
//               </Link>

//               <button
//                 className="link"
//                 onClick={handleReviewModal}
//               >
//                 + Add a Review
//               </button>
//             </div>
//           </section>

//           <section className="w-1/2 hidden md:block" style={{ height: 240 }}>
//             <DishGallery images={chef?.galleryImages} />
//           </section>
//         </div>

//         <h2 className="font-semibold md:text-3xl text-xl md:mb-6 mb-5">
//           Cuisines
//         </h2>

//         <div className="mb-14 bg-white">
//           {!loadingCuisines ? (
//             <div
//               className="flex bg-white"
//               style={{ overflowX: "auto", columnGap: 30 }}
//             >
//               {cuisines?.map((cuisine) => (
//                 <Cuisine
//                   cuisine={cuisine}
//                   isActive={selectedCuisine.id === cuisine.id}
//                   setSelected={handleSelectedCuisine}
//                   key={cuisine.id}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div>Loading...</div>
//           )}
//         </div>

//         <h2 className="font-semibold text-3xl mb-6">
//           {selectedCuisine.name} Dishes
//         </h2>

//         <div className="grid md:grid-cols-4 grid-cols-1 gap-x-8 gap-y-16">
//           {loadingDishes ? (
//             <div>Loading...</div>
//           ) : (
//             <>
//               {syncedDishes.length ? (
//                 <>
//                   {syncedDishes?.map((dish, index) => (
//                     <Dish
//                       dishDetail={dish}
//                       handleCart={(actionType, dishId) =>
//                         cartHandler(
//                           actionType,
//                           dishId,
//                           selectedCuisine.id,
//                           syncedDishes,
//                           mutateCart,
//                           router.query.id,
//                           cartMutateCount,

//                         )
//                       }
//                       key={index}
//                     />
//                   ))}
//                 </>
//               ) : (
//                 <div className="col-span-4">
//                   <Empty
//                     title={`No ${selectedCuisine.name} Dishes`}
//                     type="dish"
//                   />
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//       <SuccessfulBookings />
//     </div>
//     </>
//   );
// }

// export default Profile;

















































