import React, { useEffect } from "react"
import lottie from 'lottie-web'

import Layout from '../components/Layout'

import missing from '../static/missing.json'
import './404.less'

const NotFoundPage = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("box"),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: missing
    })
  }, [])

  return (
    <Layout isHome>
      <div id="notFoundPage">
        <div id="box" />
      </div>
    </Layout>
  )
}

export default NotFoundPage
