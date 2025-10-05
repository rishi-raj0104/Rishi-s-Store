"use client";
import { persistor, store } from "@/store/store";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./Loading";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const GlobalProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading></Loading>}>
          {children}
        </PersistGate>
      </Provider>
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </Suspense>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
