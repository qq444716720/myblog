import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classnames from 'classnames'

import { getScrollTop } from '../../utils'
import logo from '../../images/gatsby-icon.png'

import './index.less'

const links = [{
  path: '/',
  text: '首页'
}, {
  path: '/posts',
  text: '博客'
}, {
  path: '/series',
  text: '系列'
}, {
  path: '/about',
  text: '关于'
}]

const Header = ({ siteTitle, isHome }) => {
  useEffect(() => {
    const navBar = document.querySelector(".header");
    const navBarH = 76;
    let scroll = getScrollTop();
    window.addEventListener("scroll", function (e) {
      let top = getScrollTop();
      let dir = top - scroll;

      if (top > navBarH && !navBar.classList.contains("fixed")) {
        navBar.classList.add("fixed");
      }

      if (top <= 0 && navBar.classList.contains("fixed")) {
        navBar.classList.remove("fixed");
        navBar.classList.remove("visible");
      }

      if (dir < 0 && navBar.classList.contains("fixed") && !navBar.classList.contains("visible")) {
        navBar.classList.add("visible");
      }

      if (dir > 0 && navBar.classList.contains("fixed") && navBar.classList.contains("visible")) {
        navBar.classList.remove("visible");
      }

      scroll = top;
    }, { passive: true });
  }, [])

  let pathname = '';
  if (typeof window !== 'undefined') {
    pathname = window.location.pathname || ''
  }
  return (
    <header className='header' style={isHome ? {} : {
      background: '#0e0e0e61',
      position: 'fixed',
      width: '100%'
    }
    }>
      <div className='header-container'>
        <h3>
          <Link to="/" >
            <span className='logo'><img src={logo} alt="logo" /></span>
            {siteTitle}
          </Link>
        </h3>
        <div className='blog-links'>
          {
            links.map(({ path, text }) => (
              <Link key={path} to={path} className={classnames({
                active: (path.length === 1 && pathname === path) ||
                  (path.length > 1 && pathname.includes(path.slice(1))) ||
                  (path === '/posts' && pathname.includes('detail'))
              })}>
                {text}
              </Link>
            ))
          }
        </div>
      </div>
    </header >
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
