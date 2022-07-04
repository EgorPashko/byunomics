import { Routes as BaseRoutes } from "react-router-dom";

import { IntermediaryRoutes } from "./IntermediaryRoutes";

const Routes = () => <BaseRoutes>{IntermediaryRoutes()}</BaseRoutes>;

export default Routes;
