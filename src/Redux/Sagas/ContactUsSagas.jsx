
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_CONTACT_US, CREATE_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("contactus", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("contactus", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_CONTACT_US_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("contactus", action.payload)     // if data has no file field

    yield put({ type: GET_CONTACT_US_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("contactus", action.payload)              // if data has no file field
    // yield createMultipartRecord("contactus", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("contactus", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("contactus", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_CONTACT_US_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("contactus", action.payload)     // if data has no file field

    yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload })
}


export default function* ContactUsSaga() {
    yield takeEvery(CREATE_CONTACT_US, createSaga)             // watcher saga
    yield takeEvery(GET_CONTACT_US, getSaga)             // watcher saga
    yield takeEvery(UPDATE_CONTACT_US, updateSaga)             // watcher saga
    yield takeEvery(DELETE_CONTACT_US, deleteSaga)             // watcher saga
}