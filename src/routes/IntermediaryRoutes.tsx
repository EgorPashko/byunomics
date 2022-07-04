import IntermediaryDetailsPage from "modules/IntermediaryDetailsPage";
import { Route } from "react-router";

import { NavigationUrls } from "./useNavigation";

export const IntermediaryRoutes = () => {
  return <Route key="/" element={<IntermediaryDetailsPage />} path={NavigationUrls.create} />;
};
