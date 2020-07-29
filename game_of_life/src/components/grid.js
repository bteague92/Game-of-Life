import React, { useState, useEffect, useCallback, useRef } from 'react';
import produce from 'immer';
import { patterns } from '../patterns/patterns.js';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    font-family: "Courier New", Courier, monospace;

    .buttons{
        width: 100%;
        display: flex;

        .mainButtons{
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            .start{
                width: 70%;
                font-size: 25px;
                border-radius: 10px;
                background: black;
                color: #39FF14;
                border: 1px solid #39FF14;
                margin: 5px;
            }

            button{
                width: 40%;
                border-radius: 10px;
                background: black;
                color: #39FF14;
                border: 1px solid #39FF14;
                margin: 5px;
            }
        }

        .secondaryButtons{
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            text-align: center;

            button{
                width: 40%;
                border-radius: 10px;
                background: black;
                color: #39FF14;
                border: 1px solid #39FF14;
                margin: 5px;
            }

            select{
                width: 40%;
                border-radius: 10px;
                background: black;
                color: #39FF14;
                border: 1px solid #39FF14;
                margin: 5px;
                text-align: center;
            }
        }
    }
`;

function Grid() {
    const numRows = 55;
    const numCols = 55;
    const [speed, setSpeed] = useState(1000)
    const [gen, setGen] = useState(0);

    /// all options for neighbors of blocks
    const operations = [
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0]
    ]

    /// creates grid by setting certain amount of arrays with certain amount of items per array
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows;
    })

    //// randomizing function
    function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    ///set grid to random 1s and 0s
    const createRandom = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => random_item([0, 1])))
        }
        setGrid(rows)
    }

    const [running, setRunning] = useState(false)

    const runningRef = useRef();
    runningRef.current = running

    const genRef = useRef();
    genRef.current = gen

    /// starts simulation
    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return
        }
        setGen(genRef.current += 1)
        setGrid((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += g[newI][newK]
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }
                    }
                }
            })
        })
        setTimeout(runSimulation, speed)
    }, [speed])

    const runStep = useCallback(() => {
        setGen(genRef.current += 1)
        setGrid((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += g[newI][newK]
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }
                    }
                }
            })
        })
    }, [])

    return (
        <Container>
            <div className="buttons">
                <div className="mainButtons">
                    <button className="start" onClick={(e) => {
                        e.preventDefault();
                        setRunning(!running);
                        if (!running) {
                            runningRef.current = true;
                            runSimulation();
                        }
                    }} >{running ? "Stop Simulation" : "Start Simulation"}</button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            runStep()
                        }}
                    >Next Generation</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setGen(0)
                        setGrid(patterns.clear)
                    }}>Clear Grid</button>
                </div>
                <div className="secondaryButtons">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setGen(0)
                            createRandom();
                        }}
                    >Generate Random Template</button>
                    <select
                        onChange={(e) => {
                            e.preventDefault();
                            setSpeed(e.target.value)
                        }}
                    >
                        <option>select a speed</option>
                        <option>2000</option>
                        <option>1000</option>
                        <option>800</option>
                        <option>600</option>
                        <option>400</option>
                        <option>200</option>
                        <option>10</option>
                    </select>
                    <select
                        onChange={(e) => {
                            e.preventDefault();
                            setGen(0)
                            setGrid(patterns[e.target.value])
                            // console.log(patterns)
                        }}
                    >
                        <option>select a template</option>
                        <option>sample</option>
                        <option>glider</option>
                        <option>spaceship</option>
                        <option>f_pentomino</option>
                    </select>
                </div>
            </div>
            <div>
                <h3>Generation: {gen}</h3>
            </div>
            <div style={{
                margin: '20px 0 50px 0',
                border: '1px solid #39FF14',
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, 13px)`
            }}>
                {grid.map((rows, i) => {
                    return rows.map((col, k) => {
                        return (
                            <div
                                key={`${i} - ${k}`}
                                onClick={() => {
                                    const newGrid = produce(grid, gridCopy => {
                                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                    })
                                    setGrid(newGrid)
                                }}
                                style={{
                                    width: 11,
                                    height: 11,
                                    margin: 0,
                                    padding: 0,
                                    backgroundColor: grid[i][k] ? '#39FF14' : 'black',
                                    border: 'solid 1px grey'
                                }}
                            />
                        )
                    })
                })}
            </div>
        </Container>
    );
}

export default Grid;