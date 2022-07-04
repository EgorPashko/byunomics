import { QueryClient } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

import { seconds } from "../other/time";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: seconds(5),
      retry: false,
      suspense: true,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5 /* 5 minutes */,
    },
  },
});

export const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });

export default queryClient;
