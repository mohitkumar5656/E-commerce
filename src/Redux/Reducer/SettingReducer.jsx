import { CREATE_SETTING_RED, GET_SETTING, UPDATE_SETTING_RED, DELETE_SETTING_RED, GET_SETTING_RED } from "../Constent"
const SettingReducer = (state=[], action) => {
    let index
    switch (action.type) {
        case CREATE_SETTING_RED:
            return [...state, action.payload]

        case GET_SETTING_RED:
            return action.payload

        case UPDATE_SETTING_RED:
            index = state.findIndex(x => x.id === action.payload.id)
            state[index] = { ...action.payload }
            return state

        case DELETE_SETTING_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
export default SettingReducer