import React from "react"
import { graphql } from "gatsby"
import { Affix } from "antd"

import Detail from '../pages/detail'

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html, timeToRead, tableOfContents } = markdownRemark
  const { title, img, date } = frontmatter
  return (
    <Detail img={img} title={title}>
      <div className='blog-post-title'>
        <h2>{title}</h2>
        <div>发布时间：{date}</div>
        <div>预计阅读需要 {timeToRead} 分钟</div>
      </div>
      <div className="blog-wrap">
        <Affix offsetTop={100}>
          <div
            className="catalog"
            dangerouslySetInnerHTML={{ __html: `<h5 style="margin-left: 10px">目录</h5>${tableOfContents}` }} />
        </Affix>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Detail>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      tableOfContents(pathToSlugField: "frontmatter.path")
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
        img
      }
    }
  }
`
