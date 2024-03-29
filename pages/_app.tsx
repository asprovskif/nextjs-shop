import '../styles/globals.css';
import React from 'react';
import {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({Component, pageProps}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
};

export default App;
