export interface Product {
    id: number;
    title: string;
    description?: string;
    price?: number;
    createdAt?: string;
}


export async function getProducts(): Promise<Product[]> {
    const response = await fetch('http://localhost:1337/products');
    return await response.json();
}