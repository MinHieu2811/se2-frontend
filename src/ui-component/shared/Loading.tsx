import { FC } from 'react'

interface ILoading {
  isFullWidth?: boolean
}

const Loading: FC<ILoading> = ({ isFullWidth = false }) => {
  return (
    <>
      <div>
        {!isFullWidth ? (
          <div className="loading-component button p-0 is-loading" />
        ) : (
          <div className="loader-wrapper is-active">
            <div className="loader is-loading" />
          </div>
        )}
      </div>
    </>
  )
}

export default Loading