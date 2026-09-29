import {
    CREATE_USER_RED,
    UPDATE_USER_RED,
    DELETE_USER_RED,
    GET_USER_RED
} from "../Constent";

const UserReducer = (state = [], action) => {
    let index;

    switch (action.type) {

        case CREATE_USER_RED:
            return [
                ...state,
                action.payload?.data || action.payload
            ];


        case GET_USER_RED:
            return action.payload?.data || [];


        case UPDATE_USER_RED:
            index = state.findIndex(
                x => x._id === (action.payload?._id || action.payload?.id)
            );

            if (index === -1) {
                return state;
            }

            return state.map((item, i) =>
                i === index
                    ? { ...item, ...action.payload }
                    : item
            );


        case DELETE_USER_RED:
            return state.filter(
                x => x._id !== (action.payload?._id || action.payload?.id)
            );


        default:
            return state;
    }
};

export default UserReducer;