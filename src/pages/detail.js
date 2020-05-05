import React, { useEffect } from "react"

import SEO from "../components/seo"
import Layout from "../components/Layout"
import Banner from "../components/Banner"


const Detail = ({ children, img, title }) => {
  useEffect(() => {
    try {
      const deckdeckgoHighlightCodeLoader = require("@deckdeckgo/highlight-code/dist/loader")
      deckdeckgoHighlightCodeLoader.defineCustomElements(window);
    } catch (err) {
      console.error(err);
    }
  }, [])

  return (
    <Layout footer={false} style={{
      backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, rgba(0, 0, 0, 0) 1px), linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
      backgroundRepeat: "repeat"
    }}>
      <SEO title={title} />
      <Banner img={img || 'https://pic2.zhimg.com/80/8962c3db4c22682ddda5c2c6a8c5680f_1440w.jpg'} />
      <div className="blog-content">
        {children}
      </div>
    </Layout>
  )
}

export default Detail
