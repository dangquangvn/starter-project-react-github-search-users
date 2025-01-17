import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>Sorry, The Page You Tried Cannot Be Found</h3>
        <Link to={"/"} className='btn'>
          Back Home
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  //& using grid
  display: grid;
  place-items: center;
  //& using flex
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; */
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
export default Error;
