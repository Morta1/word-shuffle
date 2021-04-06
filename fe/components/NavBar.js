import React from "react";
import styled from "styled-components";

const NavBar = () => {
  const handleClick = (e, name) => {
    e.preventDefault();
    window.location.href = name;
  };
  return (
    <List>  
      <li onClick={(e) => handleClick(e, "/ofek")}>Ofek</li>
      <li onClick={(e) => handleClick(e, "/articles")}>articles</li>
    </List>
  );
};

const List = styled.ul`
  display: flex;
  list-style-type: none;
  li {
    margin-right: 10px;
    cursor: pointer;
    position: relative;
    display: block;
    padding: 4px 0;
    font-family: Lato, sans-serif;
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;

    &::after {
      position: absolute;
      content: "";
      top: 100%;
      left: 0;
      width: 100%;
      height: 3px;
      background: #3498db;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s;
    }

    &:hover {
      //color: #00000f;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    a {
      text-decoration: none;
      color: black;
      &:visited {
        color: black;
      }
    }
  }
`;

export default NavBar;
