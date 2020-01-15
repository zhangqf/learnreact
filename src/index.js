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
    constructor(props) {
        super(props);
        this.state={
            squares:Array(9).fill(null),
            xIsNext:true,
        };
    }
    handleClick(i){
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({squares:squares,xIsNext:!this.state.xIsNext})
    }
    renderSquare(i) {
        return (<Square
            value={this.state.squares[i]}
            onClick={()=> this.handleClick(i)}
        />)
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? "x" : "o");

        return (
            <div>
            <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
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
