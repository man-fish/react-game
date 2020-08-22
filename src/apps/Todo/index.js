import { connect } from "react-redux";
import Todo from "./Todo";

const mapStateToProps = (state) => {
    return {
        intended: state.getIn(["todo", "intended"]),
        completed: state.getIn(["todo", "completed"]),
    };
};

export default connect(mapStateToProps, null)(Todo);
// 将 TodoUI 和 store 做连接
