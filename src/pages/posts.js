import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/Layout"
import PostItem from "../components/PostItem"
import Banner from "../components/Banner"

const Posts = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
        edges {
          node {
            frontmatter {
              path
              title
              date(formatString: "YYYY-MM-DD")
              img
            }
            timeToRead
            excerpt(pruneLength: 200)
          }
        }
      }
    }`)

  return (
    <Layout>
      <SEO title="博客列表" />
      <Banner img="https://pic2.zhimg.com/80/8962c3db4c22682ddda5c2c6a8c5680f_1440w.jpg" />
      <div className="content">
        {
          data && data.allMarkdownRemark.edges.map(edge => (
            <PostItem key={edge.node.frontmatter.path} edge={edge} />
          ))
        }
      </div>
    </Layout>
  )
};
export default Posts
