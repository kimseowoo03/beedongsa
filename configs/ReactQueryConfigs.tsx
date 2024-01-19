"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function ReactQueryConfigs({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => {
          alert(`Mutation Error 임시 모달>>${error.message}`);
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        alert(`Query Error 임시 모달 >> ${error.message}`);
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
