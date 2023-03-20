import { Dispatch, SetStateAction, useState } from "react";

export type SyncedProps<S> = [S, Dispatch<SetStateAction<S>>]
export type CustomSyncedProps<T> = [T, (args: T) => void]

export function useSyncedState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, () => SyncedProps<S>] {
    const [state, setState] = useState(initialState)
    const getSyncedProps: () => SyncedProps<S> = () => [state, setState]
    return [state, setState, getSyncedProps]
}