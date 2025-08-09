'use client';

import {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SessionProvider} from 'next-auth/react';
import {Session} from "next-auth";

interface ClientLayoutProps {
    children: ReactNode;
    session: Session | null;
}

export default function ClientLayout({children, session}: ClientLayoutProps) {
    const queryClient = new QueryClient();

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}
