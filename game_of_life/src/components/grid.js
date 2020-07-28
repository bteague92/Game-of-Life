import React, { useState, useEffect, useCallback, useRef } from 'react';
import produce from 'immer'

function Grid() {
    const numRows = 50;
    const numCols = 50;

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

    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows;
    })

    const [running, setRunning] = useState(false)

    const runningRef = useRef();
    runningRef.current = running

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return
        }
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
        setTimeout(runSimulation, 10)
    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <button style={{ margin: "10px" }} onClick={(e) => {
                e.preventDefault();
                setRunning(!running);
                if (!running) {
                    runningRef.current = true;
                    runSimulation();
                }
            }} >{running ? "Stop" : "Start"}</button>
            <div style={{
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
                                    width: 10,
                                    height: 10,
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
        </div>
    );
}

export default Grid;