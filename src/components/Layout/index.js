import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { BackTop } from 'antd'

import Header from "../Header"
import Footer from '../Footer'
import "./index.less"

const Layout = ({ children, isHome, style, footer = true }) => {
	const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

	return (
		<div className="layout" style={style || {}}>
			<Header isHome={isHome} siteTitle={data.site.siteMetadata.title} />
			<main>{children}</main>
			{footer && <Footer />}
			<BackTop />
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
