import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import slugify from "slugify"
import ArticlePreview from "../components/articlePreview/ArticlePreview"
import * as queryString from "query-string"

export const searchQuery = graphql`
  {
    allDatoCmsArticle(sort: { fields: date, order: DESC }) {
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
  }
`
const SearchInfo = styled.h2`
  padding: 30px 0;
`
const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 50px;
`

const SearchPage = ({ data, location }) => {
  const {
    allDatoCmsArticle: { nodes },
  } = data
  const { input } = queryString.parse(location.search)
  const filteredArticles = nodes.filter(({ title, category }) =>
    title.toLowerCase().includes(input)
  )
  let articlesSearch
  switch (filteredArticles.length) {
    case 1:
      articlesSearch = "artykuł"
      break
    case 2:
    case 3:
    case 4:
      articlesSearch = "artykuły"
      break
    default:
      articlesSearch = "artykułów"
      break
  }
  const searchTitle = `Znaleziono ${filteredArticles.length} ${articlesSearch} dla frazy "${input}"`
  return (
    <>
      <SearchInfo>{searchTitle}</SearchInfo>
      <ArticlesWrapper>
        {filteredArticles.map(({ title, category, featuredImage, date }) => (
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
    </>
  )
}

export default SearchPage
