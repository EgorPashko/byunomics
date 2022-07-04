import IntermediaryListingPage from "modules/IntermediaryListingPage";
import { Route, Routes as BaseRoutes } from "react-router-dom";

import { IntermediaryRoutes } from "./IntermediaryRoutes";

const Routes = () => (
  <BaseRoutes>
    {IntermediaryRoutes()}
    <Route element={<IntermediaryListingPage />} path="/" />
  </BaseRoutes>
);

export default Routes;
