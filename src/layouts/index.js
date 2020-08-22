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
const PageNavigationWrapper = styled.div`
  margin-top: 30px;
  position: relative;
  margin-bottom: 50px;
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
  width: 150px;
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
  const { pageNumber } = pageContext
  const slugCategory = slugify(fCategory, { lower: true })
  const slugTitle = slugify(fTitle, { lower: true }).replace(":", "")
  return (
    <>
      {pageNumber === 0 ? (
        <>
          <PreviewWrapper to={`/${slugCategory}/${slugTitle}`}>
            <StyledImage fluid={fFeaturedImage.fluid} />
            <ContentPreviewWrapper>
              <ContentPreviewHeader>
                <h1>{fTitle}</h1>
              </ContentPreviewHeader>
              <ContentPreviewEntry>{entry}</ContentPreviewEntry>
              <ContentPreviewReadmore>
                (...) Czytaj dalej
              </ContentPreviewReadmore>
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
        </>
      ) : (
        <ArticlesWrapper>
          {nodes.map(({ title, featuredImage, category }, index) => (
            <ArticlePreview
              key={title}
              title={title}
              image={featuredImage.fluid}
              slugCategory={slugify(category, { lower: true })}
              slugTitle={slugify(title, { lower: true }).replace(":", "")}
            />
          ))}
        </ArticlesWrapper>
      )}
      <PageNavigationWrapper>
        {pageContext.previousPagePath ? (
          <StyledLink to={pageContext.previousPagePath}>
            <ArrowLeft />
            Poprzednia
          </StyledLink>
        ) : null}
        {pageContext.nextPagePath ? (
          <NextPageLink to={pageContext.nextPagePath}>
            Kolejna
            <ArrowRigth />
          </NextPageLink>
        ) : null}
      </PageNavigationWrapper>
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
