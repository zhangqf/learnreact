import React from 'react';
import ReactDOM from  'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={()=> {this.props.onClick()
            }}>
            {this.props.value}
            </button>
    );
    }
}

//当一个组件中只包含一个render方法时 可以使用函数组件
//当我们把 Square 修改成函数组件时，我们同时也把 onClick={() => this.props.onClick()} 改成了更短的 onClick={props.onClick}（注意两侧都没有括号）。
// function Square(props) {
//     return(
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     )
// }


class Board extends React.Component {


    renderSquare(i) {
        return (<Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />)
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if(winner){
        //     status = 'Winner' + winner;
        // }else{
        //     status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        // }
        return (
            <div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
                <div className="board-row">
               {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
                <div className="board-row">
                 {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
                </div>
            );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            history:[{
                squares:Array(9).fill(null)
            }],
            xIsNext:true,
        }
    }
    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares)||squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history:history.concat([{
                squares:squares,
            }]),
            xIsNext:!this.state.xIsNext
        })
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;
        if(winner){
            status = 'Winner:' + winner;
        }else {
            status = 'Next player:' + (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                onClick ={(i)=>this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
            </div>
            </div>
    );
    }
}

//组件类型 jsx语法
class ShoppingList extends React.Component {
    render() {
        return(
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

//js语法
// return React.createElement("div",{className:"shopping-list"},
//     React.createElement("h1",),
//     React.createElement("ul",)
//     ),


// ========================================

ReactDOM.render(
<Game />,
    document.getElementById('root')
);




function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

