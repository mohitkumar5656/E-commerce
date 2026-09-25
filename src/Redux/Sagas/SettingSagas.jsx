
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("setting", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("setting", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_SETTING_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("setting", action.payload)     // if data has no file field

    yield put({ type: GET_SETTING_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("setting", action.payload)              // if data has no file field
    // yield createMultipartRecord("setting", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_SETTING_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("setting", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("setting", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_SETTING_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("setting", action.payload)     // if data has no file field

    yield put({ type: DELETE_SETTING_RED, payload: action.payload })
}


export default function* SettingSaga() {
    yield takeEvery(CREATE_SETTING, createSaga)             // watcher saga
    yield takeEvery(GET_SETTING, getSaga)             // watcher saga
    yield takeEvery(UPDATE_SETTING, updateSaga)             // watcher saga
    yield takeEvery(DELETE_SETTING, deleteSaga)             // watcher saga
}