export interface ProductModel {
    id: string
    name: string
    description: string
    price: number
    amount: number
    image: string[]
    brand: string
}

export interface ResponseData {
    data: {
        items: ProductModel[]
        total: number
        page: number
        skip: number
        take: number
    },  
    success: boolean
}