import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import slugify from "slugify"
import ArticlePreview from "../components/articlePreview/ArticlePreview"
import PageInfo from "../components/pageInfo/PageInfo"

const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
`

const ArticlesPage = ({ data, location }) => {
  const {
    allDatoCmsArticle: { nodes },
  } = data
  const category = location.search ? location.search.split("=")[1] : ""
  const articles = category
    ? nodes.filter(node => node.category === category)
    : nodes
  let pageTitle
  switch (category) {
    case "diet":
      pageTitle = "Odżywianie"
      break
    case "gym":
      pageTitle = "Trening siłowy"
      break
    default:
      pageTitle = ""
      break
  }
  return (
    <>
      <PageInfo title={pageTitle} paragraph="" />
      <ArticlesWrapper>
        {articles.map(({ title, featuredImage }) => (
          <ArticlePreview
            key={title}
            title={title}
            image={featuredImage.fluid}
            slug={slugify(title, { lower: true })}
          />
        ))}
      </ArticlesWrapper>
    </>
  )
}

export const query = graphql`
  {
    allDatoCmsArticle {
      nodes {
        category
        title
        featuredImage {
          fluid(maxWidth: 500) {
            ...GatsbyDatoCmsFluid_tracedSVG
          }
        }
      }
    }
  }
`

export default ArticlesPage
