import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { Link } from "gatsby"

const PreviewInfoLabel = styled.div`
  position: absolute;
  left: 0;
  bottom: 35px;
  width: 80%;
  min-height: 40px;
  background-color: black;
  color: white;
  padding: 5px 15px;
  h2,
  p {
    margin: 5px;
  }
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PreviewWrapper = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: ${({ small }) => (small ? "200px" : "340px")};
  background-color: hsl(0, 0%, 95%);
  :hover {
    transform: scale(1.1);
  }
`

const Preview = ({ title, excerpt, image, slugCategory, slugTitle, small }) => {
  return (
    <PreviewWrapper small={small} to={`/${slugCategory}/${slugTitle}`}>
      <StyledImage fluid={image} />
      <PreviewInfoLabel>
        {small ? <h3>{title}</h3> : <h2>{title}</h2>}
      </PreviewInfoLabel>
    </PreviewWrapper>
  )
}

export default Preview
