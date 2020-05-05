import React from "react"

import "./index.less"

const Banner = ({ img }) => {
  return (
    <div className="banner">
      <div className="banner-box">
        <img src={img} alt="" />
      </div>
    </div>
  )
};
export default Banner
