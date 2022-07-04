import IntermediaryDetailsPage from "modules/IntermediaryDetailsPage";
import IntermediaryListingPage from "modules/IntermediaryListingPage";
import { Route } from "react-router";

import { NavigationUrls } from "./useNavigation";

export const IntermediaryRoutes = () => {
  return [
    <Route key={NavigationUrls.details} element={<IntermediaryDetailsPage />} path={NavigationUrls.details} />,
    <Route key={NavigationUrls.create} element={<IntermediaryDetailsPage />} path={NavigationUrls.create} />,
    <Route key={NavigationUrls.listing} element={<IntermediaryListingPage />} path={NavigationUrls.listing} />,
  ];
};
