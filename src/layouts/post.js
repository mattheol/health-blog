import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import { Disqus } from "gatsby-plugin-disqus"
import styled from "styled-components"

export const query = graphql`
  query querySingleArticle($id: String!) {
    datoCmsArticle(id: { eq: $id }) {
      id
      title
      category
      featuredImage {
        fluid(maxWidth: 800) {
          ...GatsbyDatoCmsFluid_tracedSVG
        }
      }
      author
      articleContent {
        ... on DatoCmsParagraph {
          paragraphContent
          id
        }
        ... on DatoCmsHeading {
          headingContent
          id
        }
        ... on DatoCmsArticleImage {
          imageData {
            fluid(maxWidth: 780) {
              ...GatsbyDatoCmsFluid_tracedSVG
            }
          }
          id
        }
      }
    }
  }
`

const PostWrapper = styled.div`
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
`
const DisqusWrapper = styled(Disqus)`
  margin-top: 20px;
`

const PageWrapper = styled.div`
  margin-top: 50px;
  max-width: 1500px;
`

const MainContent = styled.div`
  display: inline-block;
  width: 70%;
`
const SideContent = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 30%;
`

const PostContent = styled.div`
  padding: 0 30px 20px 30px;
`

const PostLayout = ({ data, pageContext: { id } }) => {
  let disqusConfig = {
    identifier: id,
    title: data.datoCmsArticle.title,
  }
  return (
    <PageWrapper>
      <MainContent>
        <PostWrapper>
          <Image fluid={data.datoCmsArticle.featuredImage.fluid} />
          <PostContent>
            <h1>{data.datoCmsArticle.title}</h1>
            {data.datoCmsArticle.articleContent.map(item => {
              const itemKey = Object.keys(item)[1]

              switch (itemKey) {
                case "paragraphContent":
                  return <p key={item.id}>{item[itemKey]}</p>
                case "headingContent":
                  return <h2 key={item.id}>{item[itemKey]}</h2>
                case "imageData":
                  return <Image key={item.id} fluid={item[itemKey].fluid} />
                default:
                  return null
              }
            })}
          </PostContent>
        </PostWrapper>
        <DisqusWrapper config={disqusConfig} />
      </MainContent>
      <SideContent></SideContent>
    </PageWrapper>
  )
}

export default PostLayout
