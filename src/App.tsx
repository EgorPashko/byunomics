// TODO fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { I18nextProvider } from "react-i18next";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import queryClient from "./lib/api/queryClient";
import i18n from "./lib/other/i18n";
import Routes from "./routes";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default App;
