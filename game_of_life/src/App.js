import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import produce from 'immer';
import styled from 'styled-components';
import Grid from "./components/grid";

const Container = styled.div`

  max-width: 100vw;
  background: black;
  color: white;
  font-family: "Courier New", Courier, monospace;

  .topDiv{
    width: 100vw;
    text-align: center;
    padding: 30px 0;;

    h1{
      margin: 0;
      font-size: 60px;
      color: #39FF14;
    }
  }

  .content{
    display: flex;
    flex-direction: column;
    align-items: center;

    .instructions{
      width: 65%;
      border-radius: 10px;
      padding: 20px 0;
      border: 1px solid #39FF14; 
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      color: #39FF14;
      text-align: center;

      h2{
        margin: 0;
      }

      p{
        margin: 4px 0;
      }
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
          <h2>Rules:</h2>
          <p>-Any live cell with two or three live neighbours survives</p>
          <p>-Any dead cell with three live neighbours becomes a live cell</p>
          <p>-All other live cells die in the next generation. Similarly, all other dead cells stay dead</p>
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