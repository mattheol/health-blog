import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import { Disqus } from "gatsby-plugin-disqus"
import styled from "styled-components"
import ArticlePreview from "../components/articlePreview/ArticlePreview"
import slugify from "slugify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import LazyLoad from 'react-lazy-load';

export const query = graphql`
  query querySingleArticle($id: String!, $category: String!) {
    post: datoCmsArticle(id: { eq: $id }) {
      id
      title
      category{
        name
        label
      }
      date
      featuredImage {
        fluid(maxWidth: 1250) {
          ...GatsbyDatoCmsFluid_tracedSVG
        }
      }
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
            fluid(maxWidth: 1250) {
              ...GatsbyDatoCmsFluid_tracedSVG
            }
          }
          id
        }
      }
    }
    recomendations: allDatoCmsArticle(
      filter: { category: {id: {eq: $category} }, id: { ne: $id } }
      sort: { fields: date, order: DESC }
      limit: 3
    ) {
      nodes {
        title
        category{
          id
          name
        }
        featuredImage {
          fluid(maxWidth: 500) {
            ...GatsbyDatoCmsFluid_tracedSVG
          }
        }
      }
    }
  }
`

const PostWrapper = styled.div`
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.4);
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
  @media (max-width: 1300px) {
    width: 100%;
  }
`
const RecomendationsWrapper = styled.div`
  display: grid;
  grid-gap: 30px;
  @media (max-width: 1300px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`
const SideContent = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 25%;
  margin-left: 5%;

  @media (max-width: 1300px) {
    width: 100%;
    margin-left: 0%;
  }
`

const PostContent = styled.div`
  padding: 0 40px 30px 40px;
`

const PostLayout = ({ data, pageContext: { id, category } }) => {
  const { post, recomendations } = data
  let disqusConfig = {
    identifier: id,
    title: post.title,
  }
  const formatter = new Intl.DateTimeFormat("pl", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return (
    <PageWrapper>
      <MainContent>
        <PostWrapper>
          <Image fluid={post.featuredImage.fluid} />
          <PostContent>
            <h1>{post.title}</h1>
            {post.articleContent.map(item => {
              const itemKey = Object.keys(item)[1]

              switch (itemKey) {
                case "paragraphContent":
                  return (
                    <p
                      dangerouslySetInnerHTML={{ __html: item[itemKey] }}
                      key={item.id}
                    ></p>
                  )
                case "headingContent":
                  return <h2 key={item.id}>{item[itemKey]}</h2>
                case "imageData":
                  return <Image key={item.id} fluid={item[itemKey].fluid} />
                default:
                  return null
              }
            })}
            <div
              style={{
                color: "grey",
              }}
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginRight: "5px" }}
              />
              {formatter.format(new Date(post.date))}
            </div>
          </PostContent>
        </PostWrapper>
        <LazyLoad offsetTop={0}>
          <DisqusWrapper config={disqusConfig} />
        </LazyLoad>
      </MainContent>
      <SideContent>
        <h4 style={{ marginTop: "0px" }}>
          Polecane artykuły z kategorii {post.category.label}
        </h4>
        <RecomendationsWrapper>
          {recomendations.nodes.map(({ title, featuredImage, category: cat }) => (
            <ArticlePreview
              small={1}
              key={title}
              title={title}
              image={featuredImage.fluid}
              slugCategory={slugify(cat.name, { lower: true })}
              slugTitle={slugify(title, { lower: true }).replace(":", "")}
            />
          ))}
        </RecomendationsWrapper>
      </SideContent>
    </PageWrapper>
  )
}

export default PostLayout
