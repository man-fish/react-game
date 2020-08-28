import React from "react";
import { connect } from "react-redux";

import {
    getInputChangeAction,
    clearTodoListAction,
    addTodoItemAction,
} from "../store/actionCreator";

class TodoController extends React.Component {
    render() {
        return (
            <div className="todo-controller">
                <input
                    type="text"
                    value={this.props.thing}
                    onChange={this.props.changeInput}
                />
                <button onClick={this.props.addTodoItem}>add</button>
                <button onClick={this.props.clearTodoList}>clear</button>

                {/* <input type="file" onChange={this.handleChange.bind(this)} /> */}
            </div>
        );
    }
    // handleChange(e) {
    //     console.log(e.target.files);
    //     let file = e.target.files[0];
    //     for (let key in file) {
    //         console.log(Object.getOwnPropertyDescriptor(file, key));
    //         // console.log(file[key]);
    //     }
    //     let f = JSON.parse(JSON.stringify(file));
    //     console.log(f);
    // }
}

const mapStateToProps = (state) => {
    return {
        thing: state.getIn(["todo", "thing"]),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeInput(e) {
            let value = e.target.value;
            const action = getInputChangeAction(value);
            dispatch(action);
        },
        addTodoItem(e) {
            e.preventDefault();
            const action = addTodoItemAction();
            dispatch(action);
        },
        clearTodoList(e) {
            e.preventDefault();
            const action = clearTodoListAction();
            dispatch(action);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoController);
