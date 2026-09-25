
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("faq", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("faq", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_FAQ_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("faq", action.payload)     // if data has no file field

    yield put({ type: GET_FAQ_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("faq", action.payload)              // if data has no file field
    // yield createMultipartRecord("faq", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_FAQ_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("faq", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("faq", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_FAQ_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("faq", action.payload)     // if data has no file field

    yield put({ type: DELETE_FAQ_RED, payload: action.payload })
}


export default function* FaqSaga() {
    yield takeEvery(CREATE_FAQ, createSaga)             // watcher saga
    yield takeEvery(GET_FAQ, getSaga)             // watcher saga
    yield takeEvery(UPDATE_FAQ, updateSaga)             // watcher saga
    yield takeEvery(DELETE_FAQ, deleteSaga)             // watcher saga
}