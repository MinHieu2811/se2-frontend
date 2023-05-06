import React from 'react'
import { Link } from 'react-router-dom'

export default function Banner() {
  return (
    <div className="banner-wrapper">
        <div
          className="banner-wrapper_left"
        >
          <div
            className="banner-wrapper_left_img"
            style={{ backgroundImage: "url(/images/collections/banner5.jpg)" }}
          ></div>
        </div>
        <div
          className="banner-wrapper_right"
        >
          <div className="banner-wrapper_right_info">
            <span
              className="banner-wrapper_right_info_branch"
            >
              spring collection
            </span>
            <h3
              className="banner-wrapper_right_info_title"
            >
              changing <span className="red">the</span> ideal of{" "}
              <span className="red">beauty</span>
            </h3>
            <p className="banner-wrapper_right_info_desc"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic enim
              temporibus reiciendis illo saepe possimus sunt dolor aperiam neque
              ipsum minima error exercitationem, nostrum excepturi!
            </p>
            <button className="banner-wrapper_right_info_btn">
              <Link to="/category?brand=&page=1&sorting=&keyword=">Shop Now</Link>
            </button>
          </div>
          <div className="banner-wrapper_right_img">
            <img src="/images/collections/banner7.jpg" alt="" />
          </div>
        </div>
      </div>
  )
}