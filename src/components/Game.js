import React, { Component } from 'react';

var rows = new Array(10).fill(-1);
var columns = new Array(10).fill(-1);
var board = new Array(10).fill(rows);
// value 1 mean X
// value 0 mean O
// value -1 mean nothing
class Cell extends Component{
    render(){
        return(
            <button className="cell" id={this.props.id} onClick={this.props.onClick}></button>
        )
    }
}

class Board extends Component{
    renderRow(){
        return rows.map((data,index) =>
                <Cell onClick={this.props.onClick} key={index+1} id ={index+1}/>
        )
    }

    renderBoard(){
        return columns.map((data,index) => (
                <div className="board-row" key={index+1} id ={index + 1}>
                    {this.renderRow()}
                </div>
            )
        )
    }

    render(){
        return(
            <div className="board-game">
                {this.renderBoard()}
            </div>
        )
    }
}


export default class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: "Next player",
            turn: "X",
            winner: "",
            isEnd: false,
            moveList: [],
        }
    }

    handleBold = e =>{
        var elems = document.getElementsByTagName("li");
        for (var i = 0; i<elems.length; i++) {
                elems[i].style.fontWeight = 'normal';    
        }

        e.target.style.fontWeight = "bold";
    }

    renderMovelist(){
        const moveList = this.state.moveList;
        return moveList.map((data,index) =>
                    <li key={index+1} id={index} onClick={this.handleBold}>{data}</li>
                )
    }

    handleRestart = () =>{
        window.location.reload();
    }

    handleClick = e =>{
        var {turn,moveList,isEnd} = this.state;
        var moveText = "Moved to ";
        var row = e.target.parentNode.id-1;
        var column = e.target.id-1;
        var temp = board[row];
        moveText += "col "+ e.target.id + " row " + e.target.parentNode.id;
        if(e.target.innerText === "" && isEnd === false){
            if(turn === "X"){
                
                board[row][column] = 1;
                e.target.innerText = "X"
                this.setState({
                    turn: "O",
                    moveList: moveList.concat(moveText)
                })
            }
            if(turn === "O"){

                board[row][column] = 0;

                e.target.innerText = "O"
                this.setState({
                    turn: "X",
                    moveList: moveList.concat(moveText)
                })
            }
            isEnd = this.checkWin();
            if(isEnd === true){
                this.setState({
                    status:"Winner is: " + turn,
                    isEnd:true
                })
            }
            console.log("fdfs" + row + " " + column)
            console.log(board);
        }
    }

    checkWin(){

    }


    render(){
        return(
            <div className="container">
            <Board onClick={this.handleClick}/>

            <div className="infor">
                <div className="status">{this.state.status} : {this.state.turn}</div>
                <button className="restart-btn" onClick={this.handleRestart}>Restart</button>
                

                <div className="move-list">
                    Move list:
                    <ul>
                        {this.renderMovelist()}
                    </ul>
                </div>
            </div>


            </div>
        )
    }
}