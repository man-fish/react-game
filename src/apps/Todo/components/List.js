import React from "react";

import TodoItem from "./Item";

export default class TodoList extends React.Component {
    render() {
        const list = this.props.list;
        const status = this.props.status;
        return (
            <div className="todo-list">
                {list.map((item, idx) => {
                    return (
                        <TodoItem
                            status={status}
                            todoItem={item}
                            todoIdx={idx}
                            key={idx}
                        ></TodoItem>
                    );
                })}
            </div>
        );
    }
}
