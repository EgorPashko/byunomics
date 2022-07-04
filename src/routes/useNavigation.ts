import { useNavigate } from "react-router"; 

export enum NavigationUrls {
  "details" = "/details",
  "listing" = "/listing",
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const useNavigation = <T extends object = object>() => {
  const navigate = useNavigate();

  return {
    goToDetails: () => navigate(NavigationUrls.details)
  };
};
