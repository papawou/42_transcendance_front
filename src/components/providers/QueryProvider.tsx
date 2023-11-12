import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function QueryApiProvider({ children }: { children: ReactNode }) {
    const [client,] = useState(new QueryClient({
        defaultOptions: {
            mutations: {
                retry: false
            }
        }
    }))
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}