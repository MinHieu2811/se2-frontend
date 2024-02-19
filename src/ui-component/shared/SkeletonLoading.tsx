import React from "react";

const SkeletonLoading = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-wrapper__image"></div>
      <div className="skeleton-wrapper__info">
        <div className="skeleton-wrapper__info--branch"></div>
        <div className="skeleton-wrapper__info--name"></div>
        <div className="skeleton-wrapper__info--price"></div>
      </div>

    </div>
  )
}

export default SkeletonLoading