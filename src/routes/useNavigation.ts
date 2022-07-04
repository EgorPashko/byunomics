import { useNavigate } from "react-router";

export enum NavigationUrls {
  "create" = "/create",
  "listing" = "/listing",
}

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goToIntermediaryListing: () => navigate(NavigationUrls.listing),
  };
};
