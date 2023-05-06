import React from "react";
import { Link } from "react-router-dom";

const content = [
    {
        img: "/images/collections/banner1.jpg",
        title: "summer collection",
        class: "col-4"
    },
    {
        img: "/images/collections/banner2.jpg",
        title: "tom ford collection",
        class: "col-3"
    },
    {
        img: "/images/collections/banner3.jpg",
        title: "marvelous super collection",
        class: "col-5"
    }
]

function Collection() {
  return (
    <div className="collection-wrapper">
      {content.map((item, index) => (
        <div
          key={index}
          className={`collection-wrapper_items ${item.class}`}
        >
          <div
            className="collection-wrapper_items_bg"
            style={{ backgroundImage: "url(" + item.img + ")" }}
          ></div>
          <div className="collection-wrapper_items_overlay"></div>
          <div className="collection-wrapper_items_text">
            <div className="collection-wrapper_items_text_title">
              <h1>{item.title}</h1>
            </div>
            <div className="collection-wrapper_items_text_btn">
              <button className="btn"><Link to="/category?brand=&page=1&sorting=&keyword=">Shop now</Link></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Collection;
