import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ]
        };
    }

    handleReset() {
        this.setState({
            stepNumber: 0,
            xIsNext: true,
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ]
        })
    }

    handleClick(i) {

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares;

        const winner = calculateWinner(squares);

        if (winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";

        this.setState({
            history: history.concat({
                squares: squares,
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });

    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
        }
 
        return (
            <div className="game">
                <div className="game-info">
                    <div>
                        <strong>{status}</strong>
                    </div>
                </div>
                <div className="board">
                    <Board onClick={(i) => this.handleClick(i)}
                        squares={current.squares} />
                </div>
                <button type = "button" className = "reset-button" onClick = {() => {this.handleReset()}}>Reset Game</button>
            </div>
        )
    }
};

function calculateWinner(squares) {

    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6],[0, 3, 6],
        [1, 4, 7], [2, 5, 8]
    ];

    for (let i = 0; i < lines.length; i++) {

        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }

    }

    return null;
}