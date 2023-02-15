export interface ProductModel {
    _id: string
    name: string
    description: string
    price: number
    quantity: number
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