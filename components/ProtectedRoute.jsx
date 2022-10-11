import { appRoutes } from "../constants/appRoutes";
import useUser from "../custom-hooks/use-user";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }) => {
  //Identify authenticated user
  const { user, loggedOut } = useUser();
  const isAuthenticated = user && !loggedOut;

  let unprotectedRoutes = [
    appRoutes.LOGIN_PAGE,
    appRoutes.HOME,
    appRoutes.CHEF_SEARCH,
    appRoutes.FORGET_PASSWORD,
    appRoutes.RESET_PASSWORD,
    '/forgot-password',
    appRoutes.SIGNUP,
    appRoutes.ABOUT_US,
    appRoutes.FAQ,
    appRoutes.PRIVACY,
    appRoutes.TERMS,
    appRoutes.CONTACT_US,
    appRoutes.CHEF_PROFILE
  ];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push(appRoutes.LOGIN_PAGE);
  }

  return children;
};

export default ProtectedRoute;