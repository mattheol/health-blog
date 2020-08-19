import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import slugify from "slugify"
import ArticlePreview from "../components/articlePreview/ArticlePreview"
import Image from "gatsby-image"
import { Link } from "gatsby"

const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 30px;
  @media (max-width: 1200px) {
    display: block;
    height: 500px;
    margin-bottom: 30px;
  }
`
const StyledImage = styled(Image)`
  width: 70%;
  height: 100%;
  object-fit: cover;
  @media (max-width: 1250px) {
    width: 100%;
  }
`

const ContentPreviewWrapper = styled.div`
  background-color: black;
  width: 30%;
  color: white;
  padding: 5px 15px;
  position: relative;
  @media (max-width: 1250px) {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 35px;
    width: 80%;
    min-height: 40px;
  }
`

const ContentPreviewReadmore = styled.div`
  color: rgba(255, 255, 255, 0.82);
  margin-top: 30px;
  text-align: right;
  font-size: 20px;
  @media (max-width: 1250px) {
    display: none;
  }
`

const PreviewWrapper = styled(Link)`
  display: flex;
  position: relative;
  width: 100%;
  height: 450px;
  text-decoration: none;
  background-color: hsl(0, 0%, 95%);
  margin-bottom: 30px;
  margin-top: 20px;
  :hover {
    transform: scale(1.03);
  }
  &:hover ${ContentPreviewReadmore} {
    color: white;
  }
  @media (max-width: 1250px) {
    flex-direction: column;
    height: 500px;
  }
`
const ContentPreviewHeader = styled.div`
  @media (max-width: 1250px) {
    h1 {
      font-size: 25px;
    }
  }
`
const ContentPreviewEntry = styled.div`
  font-size: 20px;
  max-height: calc(1.2 * 20px * 8);
  overflow: hidden;
  @media (max-width: 1250px) {
    display: none;
  }
`

const IndexPage = ({ data, pageContext }) => {
  const {
    allDatoCmsArticle: { nodes },
  } = data
  const {
    title: fTitle,
    featuredImage: fFeaturedImage,
    category: fCategory,
    entry,
  } = nodes[0]
  const slugCategory = slugify(fCategory, { lower: true })
  const slugTitle = slugify(fTitle, { lower: true }).replace(":", "")
  return (
    <>
      <PreviewWrapper to={`/${slugCategory}/${slugTitle}`}>
        <StyledImage fluid={fFeaturedImage.fluid} />
        <ContentPreviewWrapper>
          <ContentPreviewHeader>
            <h1>{fTitle}</h1>
          </ContentPreviewHeader>
          <ContentPreviewEntry>{entry}</ContentPreviewEntry>
          <ContentPreviewReadmore>(...) Czytaj dalej</ContentPreviewReadmore>
        </ContentPreviewWrapper>
      </PreviewWrapper>
      <ArticlesWrapper>
        {nodes.map(({ title, featuredImage, category }, index) => {
          if (index !== 0) {
            return (
              <ArticlePreview
                key={title}
                title={title}
                image={featuredImage.fluid}
                slugCategory={slugify(category, { lower: true })}
                slugTitle={slugify(title, { lower: true }).replace(":", "")}
              />
            )
          } else return null
        })}
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
export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allDatoCmsArticle(skip: $skip, limit: $limit) {
      nodes {
        category
        title
        entry
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
