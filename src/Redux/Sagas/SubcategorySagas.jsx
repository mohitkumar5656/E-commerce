
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("subcategory", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("subcategory", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_SUBCATEGORY_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("subcategory", action.payload)     // if data has no file field

    yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("subcategory", action.payload)              // if data has no file field
    // yield createMultipartRecord("subcategory", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("subcategory", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("subcategory", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_SUBCATEGORY_RED, payload: response })
}

function* deleteSaga(action) {                              // Worker saga
    yield deleteRecord("subcategory", action.payload)     // if data has no file field

    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}


export default function* SubcategorySaga() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)             // watcher saga
    yield takeEvery(GET_SUBCATEGORY, getSaga)             // watcher saga
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)             // watcher saga
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)             // watcher saga
}