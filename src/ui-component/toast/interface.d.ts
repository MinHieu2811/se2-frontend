export type IToastType =
  | 'is-primary'
  | 'is-link'
  | 'is-info'
  | 'is-success'
  | 'is-warning'
  | 'is-danger'
  | 'is-orange'
  | ''

export interface IToastOptions {
  title?: string
  content: string
  removable?: boolean
  timeout?: number
  type?: IToastType
  id?: number
  typeAni?: string
}

export interface IToastStateItem extends IToastOptions {
  id: number
}

export const ADD = 'ADD'
export const REMOVE = 'REMOVE'
export const REMOVE_ALL = 'REMOVE_ALL'
export const REMOVE_ALL_AND_ADD = 'REMOVE_ALL_AND_ADD'

export type ToastAction =
  | { type: 'ADD'; payload: IToastOptions }
  | { type: 'REMOVE'; payload: { id: number } }
  | { type: 'REMOVE_ALL' }
  | { type: 'REMOVE_ALL_AND_ADD'; payload: IToastOptions }