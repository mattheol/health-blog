import React from "react"
import Navigation from "../components/navigation/Navigation"
import GlobalStyle from "../assets/styles/globalStyles"

const MainLayout = ({ children }) => (
  <>
    <GlobalStyle />
    <Navigation />
    {children}
  </>
)

export default MainLayout
