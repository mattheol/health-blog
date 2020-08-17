import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import slugify from "slugify"
import ArticlePreview from "../components/articlePreview/ArticlePreview"

const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 50px;
`

const IndexPage = ({ data }) => {
  const {
    allDatoCmsArticle: { nodes },
  } = data
  return (
    <>
      <ArticlesWrapper>
        {nodes.map(({ title, featuredImage, category }) => (
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

export const query = graphql`
  {
    allDatoCmsArticle {
      nodes {
        category
        title
        featuredImage {
          fluid(maxWidth: 900) {
            ...GatsbyDatoCmsFluid_tracedSVG
          }
        }
      }
    }
  }
`

export default IndexPage
