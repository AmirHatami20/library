export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    genres: Genre[];
    rating: number;
    color: string;
    image: string;
    summary: string;
}

export interface BookFormData {
    title: string;
    author: string;
    price: string;
    genres: Genre[];
    color: string;
    image: File | null;
    summary: string;
    imagePreview: string;
}

export interface Genre {
    id: string;
    name: string;
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    hashedPassword: string;
    image?: string;
}

export interface AuthFormData {
    fullName?: string;
    email: string;
    password: string;
    image?: File | null;
    imagePreview?: string;
}
