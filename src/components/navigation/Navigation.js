import { Link, StaticQuery, graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import Search from "../search/Search"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalculator } from "@fortawesome/free-solid-svg-icons"

const NavigationWrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-family: "Montserrat";
  padding-bottom: 20px;
  a {
    text-decoration: none;
    color: inherit;
  }
  @media (max-width: 767px) {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 15px;
  }
`
const Logo = styled.span`
  font-weight: 700;
  font-size: 20px;
  margin-right: 10px;
`
const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  height: 100%;
`
const NavigationListItem = styled.li`
  font-weight: 600;
  font-size: 15px;
  margin-left: 32px;
  display: block;
`
const partlyActive = className => ({ isPartiallyCurrent }) => ({
  className: className + (isPartiallyCurrent ? ` active` : ``),
})

const PartlyActiveLink = ({ className, ...rest }) => (
  <Link getProps={partlyActive(className)} {...rest} />
)

const NavigationLink = styled(PartlyActiveLink)`
  display: flex;
  align-items: center;
  padding: 10px 0;
  &.active {
    font-weight: 700;
    border-bottom: 2px solid black;
  }
`
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Navigation = () => {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          allDatoCmsCategory(
            sort: { fields: id, order: ASC }
            ){
            nodes {
              name
              label
            }
          }
        }
      `}
      render={data => (
        <NavigationWrapper>
          <NavigationList>
          <Logo>
            <Link to={`/`}>Zdrowy_blog</Link>
          </Logo>
          {
            data.allDatoCmsCategory.nodes.map( ({name, label}) => <NavigationListItem key={name}>
              <NavigationLink to={`/${name.toLowerCase()}`}>
                <div>{label}</div>
              </NavigationLink>
            </NavigationListItem>)
          }
          </NavigationList>
          <SearchWrapper>
            <NavigationListItem style={{display: 'block', marginRight: '32px'}}>
              <NavigationLink to={`/calculator`}>
                <div><FontAwesomeIcon
                      icon={faCalculator}
                      style={{ marginRight: "5px", color:"#3f51b5" }}
                    />Kalkulator kalorii</div>
              </NavigationLink>
            </NavigationListItem>
            <Search style={{display: 'block'}}/>
          </SearchWrapper>
        </NavigationWrapper>
      )}
    />
    
  )
}

export default Navigation
