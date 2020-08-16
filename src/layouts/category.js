import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import slugify from "slugify"
import ArticlePreview from "../components/articlePreview/ArticlePreview"
import PageInfo from "../components/pageInfo/PageInfo"

export const query = graphql`
  query queryCategory($category: String!) {
    allDatoCmsArticle(filter: { category: { eq: $category } }) {
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
const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
`

const CategoryLayout = ({ data, location }) => {
  const {
    allDatoCmsArticle: { nodes },
  } = data
  const { pageTitle } = location.state
  return (
    <>
      <PageInfo title={pageTitle} paragraph="" />
      <ArticlesWrapper>
        {nodes.map(({ title, category, featuredImage }) => (
          <ArticlePreview
            key={title}
            title={title}
            image={featuredImage.fluid}
            slugCategory={slugify(category, { lower: true })}
            slugTitle={slugify(title, { lower: true })}
          />
        ))}
      </ArticlesWrapper>
    </>
  )
}

export default CategoryLayout
