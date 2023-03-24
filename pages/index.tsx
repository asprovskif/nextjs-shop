import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import Title from "../components/Title";
import {getProducts, Product} from '../lib/products';
import {GetStaticProps} from 'next';
import ProductCard from '../components/ProductCard';

export interface HomePageProps {
    products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    console.log('[getStaticProps] render');
    const products = await getProducts();
    return {
        props: {products},
        revalidate: parseInt(process.env.REVALIDATE_SECONDS),
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
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default HomePage;