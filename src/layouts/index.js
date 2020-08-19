import React from "react"
import Navigation from "../components/navigation/Navigation"
import GlobalStyle from "../assets/styles/globalStyles"
import styled from "styled-components"

const Wrapper = styled.div`
  max-width: 1500px;
  margin: auto;
  position: relative;
  padding: 0 50px;
`

const MainLayout = ({ children }) => (
  <>
    <GlobalStyle />
    <Wrapper>
      <Navigation />
      {children}
    </Wrapper>
  </>
)

export default MainLayout
