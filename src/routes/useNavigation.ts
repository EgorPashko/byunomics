import { useNavigate } from "react-router";

export enum NavigationUrls {
  "create" = "/create",
  "details" = "/details/:id",
  "listing" = "/listing",
}

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goToIntermediaryListing: () => navigate(NavigationUrls.listing),
    goToCreateIntermediary: () => navigate(NavigationUrls.create),
    goToEditIntermediary: (id = "") => navigate(NavigationUrls.details.replace(":id", id.toString())),
  };
};
