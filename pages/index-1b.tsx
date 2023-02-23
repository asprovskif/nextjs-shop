// Option 1b: fetch products on the server side (in getStaticProps) but with Incremental Static Regeneration(ISR)
import Head from 'next/head';
import React from 'react';
import Title from "../components/Title";
import {getProducts, Product} from '../lib/products';
import {GetStaticProps} from 'next';

interface HomePageProps {
    products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    console.log('[getStaticProps] render');
    const products = await getProducts();
    return {
        props: {
            products
        },
        revalidate: 30 // seconds
    }
}

const HomePage: React.FC<HomePageProps> = ({products}) => {
    console.log('[HomePage] render', products);
    return (
        <>
            <Head>
                <title>The shop</title>
            </Head>
            <main className="px-6 py-4">
                <Title>Next Shop</Title>
                <ul>
                    {products.map(product => (
                        <li key={product.id}> {product.title} </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default HomePage;