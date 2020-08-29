import React, { useState } from "react"
import styled from "styled-components"
import MagnifierIcon from "../../assets/images/magnifier.svg"
import { navigate } from "gatsby"

const SearchInput = styled.input`
  font-family: "Montserrat";
  outline: none;
  padding-left: 15px;
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  background: none;
  border: none;
  resize: none;
  ::placeholder {
    color: #a8a8a8;
  }
`

const Icon = styled(MagnifierIcon)``

const IconWrapper = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  padding: 0px 8px;
  align-items: center;
  height: 100%;
  :hover {
    cursor: pointer;
  }
  &:hover ${Icon} {
    g,
    line {
      stroke: black;
    }
  }
`

const SearchWrapper = styled.div`
  background-color: rgba(230, 230, 230, 0.3);
  border-radius: 2px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 210px;
`

const Search = () => {
  const [searchInput, setSearchInput] = useState("")
  const handleSearchClick = () => {
    navigate(`/search?input=${searchInput}`)
    setSearchInput("")
  }
  return (
    <SearchWrapper>
      <SearchInput
        placeholder="Szukaj ..."
        value={searchInput}
        onChange={e => {
          setSearchInput(e.target.value)
        }}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            handleSearchClick()
          }
        }}
      />
      <IconWrapper onClick={handleSearchClick}>
        <Icon />
      </IconWrapper>
    </SearchWrapper>
  )
}

export default Search
