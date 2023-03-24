import {getProduct, getProducts, Product} from '../../lib/products';
import React from 'react';
import Head from 'next/head';
import Title from '../../components/Title';
import {ParsedUrlQuery} from 'querystring';
import {GetStaticPaths, GetStaticProps} from 'next';
import {ApiError} from '../../lib/api';
import Image from 'next/image';

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
            revalidate: parseInt(process.env.REVALIDATE_SECONDS),
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
                <div className="flex flex-col lg:flex-row">
                    <div>
                        <Image src={product.pictureUrl} width={640} height={480} alt=""/>
                    </div>
                    <div className="flex-1 lg:ml-4">
                        <p className="text-sm">{product.description}</p>
                        <p className="text-lg font-bold mt-2">{product.price}</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProductPage;