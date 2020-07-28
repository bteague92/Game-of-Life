import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import produce from 'immer';
import styled from 'styled-components';
import Grid from "./components/grid";

const Container = styled.div`
  .topDiv{
    width: 100vw;
    text-align: center;
  }

  .content{

    .instructions{
      width: 100vw;
      height: 100px;
    }

    .grid{
      width: 100vw;
      display: flex;
      justify-content: center;
    }
  }
`;

function App() {

  return (
    <Container>
      <div className="topDiv">
        <h1>Brandons Game of Life</h1>
      </div>
      <div className="content" >
        <div className="instructions" >

        </div>
        <div className="grid" >
          <div>
            <Grid />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;