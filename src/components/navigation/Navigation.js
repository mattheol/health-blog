import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Search from "../search/Search"

const NavigationWrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
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
`
const NavigationListItem = styled.li`
  font-weight: 600;
  font-size: 15px;
  margin-left: 32px;
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
  &.active {
    font-weight: 700;
  }
`
const SearchWrapper = styled.div`
  margin-left: auto;
`

const Navigation = () => (
  <NavigationWrapper>
    <Logo>
      <Link to={`/`}>Zdrowy_blog</Link>
    </Logo>
    <NavigationList>
      <NavigationListItem>
        <NavigationLink to={"/diet"}>
          <div>Odżywianie</div>
        </NavigationLink>
      </NavigationListItem>
      <NavigationListItem>
        <NavigationLink to={`/gym`}>
          <div>Trening</div>
        </NavigationLink>
      </NavigationListItem>
    </NavigationList>
    <SearchWrapper>
      <Search />
    </SearchWrapper>
  </NavigationWrapper>
)

export default Navigation
