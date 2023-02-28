import {getProduct, getProducts, Product} from '../../lib/products';
import React from 'react';
import Head from 'next/head';
import Title from '../../components/Title';


export async function getStaticPaths() {
    const products = await getProducts();
    const paths = products.map(product => ({
        params: {id: product.id.toString()}
    }));
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const product = await getProduct(params.id);

    return {
        props: {
            product
        }
    }
}

const ProductPage: React.FC<{ product: Product }> = ({product}) => {
    return (
        <>
            <Head>
                <title>Next Shop</title>
            </Head>
            <main className="px-6 py-4">
                <Title>{product.title}</Title>
                <p>{product.description}</p>
            </main>
        </>
    )
}

export default ProductPage;