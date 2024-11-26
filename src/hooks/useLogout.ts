import { useQueryClient } from "@tanstack/react-query";
import { useT } from "@transifex/react";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { logoutUserFn } from "../api/auth";
import { resetAuthApi } from "../api/axios";
import { DISPATCH_ACTIONS } from "../constants";
import useStateContext from "./useStateContext";

type IUseSignOut = () => void;

export default function useSignOut(): IUseSignOut {
  const t = useT();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const stateContext = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const onSignOut = useCallback(async () => {
    try {
      await logoutUserFn();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      enqueueSnackbar(t("Error on logout {error}", error), {
        variant: "error",
      });
    } finally {
      queryClient.invalidateQueries();
      queryClient.clear();
      stateContext.dispatch({ type: DISPATCH_ACTIONS.SET_USER, payload: null });
      resetAuthApi();
      navigate("/login");
    }
  }, [enqueueSnackbar, navigate, queryClient, stateContext, t]);

  return onSignOut;
}
