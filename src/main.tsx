import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { tx } from "@transifex/native";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/es";
import React from "react";
import ReactDOM from "react-dom/client";

import { getLang } from "./api/localstore";
import "./index.css";
import { AppRouter } from "./routes/AppRouter";

dayjs.locale(import.meta.env.VITE_DEFAULT_LANG);

const renderApp = () => {
  const rootElement = document.getElementById("root-app");
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={import.meta.env.VITE_DEFAULT_LANG || "es"}>
        <AppRouter />
      </LocalizationProvider>
    </React.StrictMode>,
  );
};

tx.init({ token: import.meta.env.VITE_TRANSIFEX_TOKEN });
tx.setCurrentLocale(`${getLang() || import.meta.env.VITE_DEFAULT_LANG || "es"}`).then(
  () => {
    renderApp();
  },
  (error) => {
    console.error(error);
    renderApp();
  },
);
