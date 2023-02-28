import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
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
        }
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
                        <li key={product.id}>
                            <Link href={`/products/${product.id}`}>
                                {product.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default HomePage;