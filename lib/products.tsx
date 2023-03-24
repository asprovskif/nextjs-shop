import {fetchJson} from './api';

export interface Product {
    id: number;
    title: string;
    description: string;
    price?: string;
    createdAt?: string;
}

const CMS_URL = process.env.CMS_URL;

function stripProduct(product: any): Product {
    return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: '$' + product.price.toFixed(2),
    }
}

export async function getProducts(): Promise<Product[]> {
    const products = await fetchJson(`${CMS_URL}/products`);
    return products.map(stripProduct);
}

export async function getProduct(id: string): Promise<Product> {
    const product = await fetchJson(`${CMS_URL}/products/${id}`);
    return stripProduct(product);
}