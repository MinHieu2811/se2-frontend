export interface PlainObject {
    [key: string]: any
}

export interface ResponseType<T> {
    data: T
    success: boolean
    message?: string
}

export interface DetailedObject<T> {
    [key: string]: T
}