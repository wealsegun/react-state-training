export interface Product {
    id: number;
    category: string;
    image: string;
    name: string;
    price: number;
    skus: Skus[];
    description: string;
}

export interface Skus {
    sku: number;
    size: number;
}
