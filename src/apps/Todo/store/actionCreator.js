import {
    CHANGE_INPUT_VALUE,
    CLEAR_TODO_LIST,
    ADD_TODO_ITEM,
    FINISH_TODO_ITEM,
} from "./constants";

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value,
});

export const clearTodoListAction = () => ({
    type: CLEAR_TODO_LIST,
});

export const addTodoItemAction = () => ({
    type: ADD_TODO_ITEM,
});

export const finishTodoItemAction = (index) => ({
    type: FINISH_TODO_ITEM,
    index,
});
