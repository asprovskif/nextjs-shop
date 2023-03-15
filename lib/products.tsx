import {fetchJson} from './api';

export interface Product {
    id: number;
    title: string;
    description: string;
    price?: number;
    createdAt?: string;
}

const CMS_URL = 'http://localhost:1337';

function stripProduct(product: Product): Product {
    return {
        id: product.id,
        title: product.title,
        description: product.description,
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