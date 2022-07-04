import { Route } from "react-router";
import { IntermediaryListingPage } from "../modules/IntermediaryListingPage";
import { NavigationUrls } from "./useNavigation";
 
export const IntermediaryRoutes = () => {
    return <Route
    key="/"
    element={<IntermediaryListingPage/>} 
    path={NavigationUrls.listing}
  />;
} 