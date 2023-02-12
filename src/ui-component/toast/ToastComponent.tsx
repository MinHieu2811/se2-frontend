import React from 'react'
import { FC, useCallback, useEffect } from 'react'
import { IToastStateItem, REMOVE } from './interface.d'
import { useToastContext } from './ToastContext'
import { AiOutlineClose } from 'react-icons/ai'

const Toast: FC<IToastStateItem> = ({
  id,
  content = '',
  removable = true,
  timeout = 10,
  type = '',
  typeAni
}) => {
  const { toastDispatch } = useToastContext()

  const remove = useCallback(() => {
    toastDispatch({ type: REMOVE, payload: { id } })
  }, [id, toastDispatch])

  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        remove()
      }, timeout * 1000)
    }
  }, [remove, timeout])

  return (
    <div className={`toast-wrapper Toast animated slide-in-down ${typeAni ? typeAni : 'slide-in-down'}`}>
      <div className={`toast-component toastfication ${type}`}>
        <div dangerouslySetInnerHTML={{ __html: `<span class="toast-content">${content}</span>` }} />
        {removable && <button className="toast-btn delete" onClick={remove}>
          <AiOutlineClose />
        </button>}
      </div>
    </div>
  )
}

function Toasts({ toastList }: { toastList: IToastStateItem[] }) {
  return (
    <>
      {toastList.map((toast) => {
        return <Toast {...toast} key={toast.id} />
      })}
    </>
  )
}

export default Toasts