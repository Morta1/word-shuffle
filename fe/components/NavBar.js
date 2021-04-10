import React from "react";
import styled from "styled-components";

const NavBar = ({ names }) => {
  const handleClick = (e, name) => {
    e.preventDefault();
    window.location.href = name;
  };
  return (
    <List>
      {names.map((name, index) => {
        return (
          <li
            key={name + "-" + index}
            onClick={(e) => handleClick(e, `/?sheet=${index}`)}>
            {name}
          </li>
        );
      })}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-around;
  list-style-type: none;

  li {
    cursor: pointer;
    position: relative;
    display: block;
    padding: 4px 0;
    color: white;
    text-decoration: none;
    text-transform: capitalize;
    transition: 0.5s;

    &::after {
      position: absolute;
      content: "";
      top: 100%;
      left: 0;
      width: 100%;
      height: 3px;
      background: black;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s;
    }

    &:hover {
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
