import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 30px;
  justify-content: flex-start;
  font-family: "Montserrat";
  a {
    text-decoration: none;
    color: inherit;
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
`
const NavigationListItem = styled.li`
  font-weight: 600;
  font-size: 15px;
  margin-left: 32px;
`
const Navigation = () => (
  <NavigationWrapper>
    <Logo>Logo</Logo>
    <NavigationList>
      <NavigationListItem>
        <Link to="/articles">Artykuły</Link>
      </NavigationListItem>
      <NavigationListItem>
        <Link to="/contact">Kontakt</Link>
      </NavigationListItem>
      <NavigationListItem>
        <Link to="/about">O mnie</Link>
      </NavigationListItem>
    </NavigationList>
  </NavigationWrapper>
)

export default Navigation
