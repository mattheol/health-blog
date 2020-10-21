import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import slugify from "slugify"
import ArticlePreview from "../components/articlePreview/ArticlePreview"
import { Link } from "gatsby"

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $category: String!) {
    articles: allDatoCmsArticle(
      filter: { category: { eq: $category } }
      sort: { fields: date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        category
        title
        date
        featuredImage {
          fluid(maxWidth: 900) {
            ...GatsbyDatoCmsFluid_tracedSVG
          }
        }
      }
    }
    categoryModel: datoCmsCategory(name: { eq: $category }) {
      name
      description
    }
  }
`
const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 50px;
  margin-top: 20px;
  margin-bottom: 30px;
`
const PageNavigationWrapper = styled.div`
  margin-top: 30px;
  position: relative;
  height: 50px;
`

const StyledLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  background-color: rgba(26, 5, 0, 0.9);
  :hover {
    background-color: rgba(26, 5, 0, 1);
  }
  height: 50px;
  width: 200px;
`

const NextPageLink = styled(StyledLink)`
  background-color: rgba(5, 20, 5, 0.9);
  position: absolute;
  top: 0px;
  right: 0px;
  :hover {
    background-color: rgba(5, 20, 5, 1);
  }
`

const ArrowLeft = styled.div`
  display: inline-block;
  margin-right: 10px;
  border-right: 4px solid white;
  border-bottom: 4px solid white;
  width: 10px;
  height: 10px;
  transform: rotate(-225deg);
`
const ArrowRigth = styled.div`
  display: inline-block;
  margin-left: 10px;
  border-right: 4px solid white;
  border-bottom: 4px solid white;
  width: 10px;
  height: 10px;
  transform: rotate(-45deg);
`

const CategoryLayout = ({ data, pageContext }) => {
  const {
    articles: { nodes },
  } = data
  // const { pageTitle } = location.state
  return (
    <>
      <ArticlesWrapper>
        {nodes.map(({ title, category, featuredImage, date }) => (
          <ArticlePreview
            key={title}
            title={title}
            image={featuredImage.fluid}
            slugCategory={slugify(category, { lower: true })}
            slugTitle={slugify(title, { lower: true }).replace(":", "")}
            date={date}
          />
        ))}
      </ArticlesWrapper>
      <PageNavigationWrapper>
        {pageContext.previousPagePath ? (
          <StyledLink to={pageContext.previousPagePath}>
            <ArrowLeft />
            Poprzednia strona
          </StyledLink>
        ) : null}
        {pageContext.nextPagePath ? (
          <NextPageLink to={pageContext.nextPagePath}>
            Kolejna strona
            <ArrowRigth />
          </NextPageLink>
        ) : null}
      </PageNavigationWrapper>
    </>
  )
}

export default CategoryLayout
