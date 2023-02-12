import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react'

import {
  IToastStateItem,
  ToastAction,
  ADD,
  REMOVE,
  REMOVE_ALL,
  REMOVE_ALL_AND_ADD
} from './interface.d'
import Toasts from './ToastComponent'

export const ToastContext = createContext<{
  toastList: IToastStateItem[]
  toastDispatch: Dispatch<ToastAction>
}>({
  toastList: [],
  toastDispatch: () => {
    return null
  }
})

const initialState: IToastStateItem[] = []

export const toastReducer = (state: IToastStateItem[], action: ToastAction) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: +new Date(),
          content: action.payload.content,
          type: action.payload.type
        }
      ]
    case REMOVE:
      return state.filter((t) => t.id !== action.payload.id)
    case REMOVE_ALL:
      return initialState
    case REMOVE_ALL_AND_ADD:
      return [
        {
          id: action.payload?.id || +new Date(),
          content: action.payload.content,
          type: action.payload.type
        }
      ]
    default:
      return state
  }
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastList, toastDispatch] = useReducer(toastReducer, initialState)
  const toastData = { toastList, toastDispatch }
  return (
    <ToastContext.Provider value={toastData}>
      {children}
        <Toasts toastList={toastList as IToastStateItem[]} />
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  return useContext(ToastContext)
}