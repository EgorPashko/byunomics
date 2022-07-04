import IntermediaryDetailsPage from "modules/IntermediaryDetailsPage";
import IntermediaryListingPage from "modules/IntermediaryListingPage";
import { Route } from "react-router";

import { NavigationUrls } from "./useNavigation";

export const IntermediaryRoutes = () => {
  return [
    <Route key="/" element={<IntermediaryDetailsPage />} path={NavigationUrls.details} />,
    <Route key="/" element={<IntermediaryDetailsPage />} path={NavigationUrls.create} />,
    <Route key={NavigationUrls.listing} element={<IntermediaryListingPage />} path={NavigationUrls.listing} />,
  ];
};
