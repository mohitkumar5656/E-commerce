
import { call, put, takeEvery } from "redux-saga/effects";

import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constent"
import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"

function* createSaga(action) {               // Worker saga
    const response = yield createRecord("testimonial", action.payload)     // if data has no file field
    // const response = yield createMultipartRecord("testimonial", action.paload)     // if data has at least 1 file field
   yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })

}


function* getSaga(action) {               // Worker saga
    const response = yield getRecord("testimonial", action.payload)     // if data has no file field

    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}



function* updateSaga(action) {               // Worker saga
    yield updateRecord("testimonial", action.payload)              // if data has no file field
    // yield createMultipartRecord("testimonial", action.paload)     // if data has at least 1 file field
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })


//   in case of real backend 
    // let response =   yield updateRecord("testimonial", action.paload)              // if data has no file field
    // let response= yield createMultipartRecord("testimonial", action.paload)     // if data has at least 1 file field
    // yield put({ UPDATE_TESTIMONIAL_RED, payload: response })
}

function* deleteSaga(action) {               // Worker saga
    yield deleteRecord("testimonial", action.payload)     // if data has no file field

    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}


export default function* TestimonialSaga() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)             // watcher saga
    yield takeEvery(GET_TESTIMONIAL, getSaga)             // watcher saga
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)             // watcher saga
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)             // watcher saga
}