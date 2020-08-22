import React from "react";

import "../../assets/css/app/Todo/index.scss";

import TodoController from "./components/Controller";
import TodoList from "./components/List";

export default class Todo extends React.Component {
    render() {
        return (
            <div className="todo-container">
                <h1>React Todo</h1>
                <h3>Tended</h3>
                <TodoList
                    list={this.props.intended}
                    status="intended"
                ></TodoList>
                <h3>Completed</h3>
                <TodoList
                    list={this.props.completed}
                    status="completed"
                ></TodoList>
                <TodoController></TodoController>
            </div>
        );
    }
}
