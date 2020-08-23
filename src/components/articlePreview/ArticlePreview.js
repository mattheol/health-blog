import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { Link } from "gatsby"
import DatePreview from "../datePreview/DatePreview"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"

const PreviewInfoLabel = styled.div`
  position: absolute;
  left: 0;
  bottom: ${({ small }) => (small ? "10px" : "35px")};
  width: ${({ small }) => (small ? "90%" : "80%")};
  min-height: ${({ small }) => (small ? "20px" : "40px")};
  background-color: black;
  color: white;
  padding: ${({ small }) => (small ? "3px 10px" : "5px 15px")};
  h2,
  h4 {
    margin: 5px;
  }
  p {
    margin: 5px;
  }
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const PreviewWrapper = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  background-color: hsl(0, 0%, 95%);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.4);
  :hover {
    transform: scale(1.05);
  }
  @media (max-width: 767px) {
    padding: 0;
    :hover {
      transform: none;
    }
  }
`

const Preview = ({ title, image, slugCategory, slugTitle, small, date }) => {
  const formatter = new Intl.DateTimeFormat("pl", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return (
    <PreviewWrapper small={small} to={`/${slugCategory}/${slugTitle}`}>
      {date ? (
        <DatePreview>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            style={{ marginRight: "5px" }}
          />
          {formatter.format(new Date(date))}
        </DatePreview>
      ) : null}
      <StyledImage fluid={image} />
      <PreviewInfoLabel small={small}>
        {small ? <h4>{title}</h4> : <h2>{title}</h2>}
      </PreviewInfoLabel>
    </PreviewWrapper>
  )
}

export default Preview
