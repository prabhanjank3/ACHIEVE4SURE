import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-spinners/SyncLoader";
import styled, { css } from "styled-components";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.1); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

const Loader = () => {
    const {loading} = useSelector(state => state.dashboard);

  return (
    <div className="">
      <DarkBackground disappear={loading}>
        <LoadingOverlay
          active={true}
          spinner={true}
          text="Loading your content..."
          color="#614CFF"
          style={{
            marginLeft:'49%',
            position:'relative',
            top:'45%'
          }}
        >
        </LoadingOverlay>
      </DarkBackground>
    </div>
  );
}

export default Loader;