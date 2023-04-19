export interface OrderProduct {
    id: string
    name: string
    thumbImage?: string
    items: {
        name: string
        quantity: number
        price: number
    }[]
}