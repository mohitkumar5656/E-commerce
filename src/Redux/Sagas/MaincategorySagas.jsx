
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("maincategory", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("maincategory", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_MAINCATEGORY_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("maincategory", action.payload)     // if data has no file field

    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("maincategory", action.payload)              // if data has no file field
    // yield createMultipartRecord("maincategory", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("maincategory", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("maincategory", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_MAINCATEGORY_RED, payload: response })
}

function* deleteSaga(action) {                              // Worker saga
    yield deleteRecord("maincategory", action.payload)     // if data has no file field

    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}


export default function* MaincategorySaga() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)             // watcher saga
    yield takeEvery(GET_MAINCATEGORY, getSaga)             // watcher saga
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)             // watcher saga
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)             // watcher saga
}