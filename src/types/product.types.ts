export interface Product {
    id: number;
    title:	string;
    price: number;
    category: string;
    image: string;
    description: string;
    discount_percentage: number;
    weight_in_grams: number;
}

export interface ProductService {
    getProductById(id: number): Product;
}
