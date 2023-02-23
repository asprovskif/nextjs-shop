// Option 2: fetch products on the client side (in useEffect)
import Head from 'next/head';
import React from 'react';
import Title from "../components/Title";

interface Product {
    id: number;
    title: string;
    description?: string;
    price?: number;
    createdAt?: string;
}

const products: Product[] = [{id: 1, title: 'First product'}, {id: 2, title: 'Second product'}];

const HomePage: React.FC = () => {
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