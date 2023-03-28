import React, {PropsWithChildren} from 'react';
import Head from 'next/head';
import Title from './Title';
import NavBar from './NavBar';

interface PageProps extends PropsWithChildren {
    title: string;
}
const Page: React.FC<PageProps> = ({children, title}) => {
    return (
        <>
            <Head>
                <title>{`${title} - Next Shop`}</title>
            </Head>
            <header>
                <NavBar />
            </header>
            <main className="px-6 py-4">
                <Title>{title}</Title>
                {children}
            </main>
        </>
    )
};

export default Page;