import {getProduct, getProducts, Product} from '../../lib/products';
import React from 'react';
import Head from 'next/head';
import Title from '../../components/Title';
import {ParsedUrlQuery} from 'querystring';
import {GetStaticPaths, GetStaticProps} from 'next';
import {ApiError} from '../../lib/api';

interface ProductPageProps {
    product: Product;
}

interface ProductPageParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
    const products = await getProducts();
    const paths = products.map(product => ({
        params: {id: product.id.toString()}
    }));
    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({params}) => {
    try {
        const product = await getProduct(params.id);
        return {
            props: {product},
        }
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
            return {notFound: true};
        }
        throw err;
    }
}

const ProductPage: React.FC<{ product: Product }> = ({product}) => {
    console.log('[ProductPage] render', product);
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