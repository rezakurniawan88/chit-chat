"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query"
import React from "react";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }));

  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers;
