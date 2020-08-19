import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import slugify from "slugify"
import ArticlePreview from "../components/articlePreview/ArticlePreview"
import PageInfo from "../components/pageInfo/PageInfo"
import { Link } from "gatsby"

// export const query = graphql`
//   query queryCategory($category: String!) {
//     allDatoCmsArticle(filter: { category: { eq: $category } }) {
//       nodes {
//         category
//         title
//         featuredImage {
//           fluid(maxWidth: 900) {
//             ...GatsbyDatoCmsFluid_tracedSVG
//           }
//         }
//       }
//     }
//   }
// `

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $category: String!) {
    allDatoCmsArticle(
      filter: { category: { eq: $category } }
      skip: $skip
      limit: $limit
    ) {
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
const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 50px;
`

const CategoryLayout = ({ data, pageContext }) => {
  const {
    allDatoCmsArticle: { nodes },
  } = data
  // const { pageTitle } = location.state
  const pageTitle = "test"
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
            slugTitle={slugify(title, { lower: true }).replace(":", "")}
          />
        ))}
      </ArticlesWrapper>
      {pageContext.previousPagePath ? (
        <Link to={pageContext.previousPagePath}>Poprzednia</Link>
      ) : null}
      {pageContext.nextPagePath ? (
        <Link to={pageContext.nextPagePath}>Kolejna</Link>
      ) : null}
    </>
  )
}

export default CategoryLayout
