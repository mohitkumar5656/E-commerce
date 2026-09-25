import { Link, useNavigate } from "react-router-dom"
import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { useEffect, useState } from "react"
import FormValidator from "../../../validator/FormValidator"


import { getFaq, createFaq } from "../../../Redux/ActionCreaters/FaqAction"
import { useDispatch, useSelector } from "react-redux"
const AdminFaqcreate = () => {

    const [data, setdata] = useState({
        question: '',
        answer: '',
        status: true
    })

    const [errorMassage, seterrorMassage] = useState({
        question: " Question  is Mendatory",
        answer: "Answer is Mendatory"
    })

    const [show, setshow] = useState(false)
    const FaqStatedata = useSelector(state => state.FaqStateData)



    const dispatch = useDispatch()

    const navigate = useNavigate()


    const getInputdata = (e) => {

        const { name, value } = e.target
        // const value = name === "pic" ? +e.target.files[0] : e.target.value     // in case or real Backend

        setdata({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        seterrorMassage({ ...errorMassage, [name]: FormValidator(e) })

    }

    const postdata = (e) => {
        e.preventDefault()

        const error = Object.values(errorMassage).find(x => x !== "")
        if (error) {
            setshow(true)
            return
        }

        let item = FaqStatedata?.find?.(x => x.question?.toLowerCase() === data.question?.toLowerCase())
        if (item) {
            seterrorMassage({ ...errorMassage, name: "Faq With This Question Already Exist" })

            setshow(true)
            return
        }

        // All good → create category
        dispatch(createFaq({ ...data }))
        navigate("/admin/faq");


    }

    useEffect(() => {
        (() => {
            dispatch(getFaq())
        })()

    }, [FaqStatedata.length])
    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />

                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">Create Faq <Link to="/admin/faq" > <i className="bi bi-arrow-left text-light fs-5 float-end"> </i></Link></h5>
                    <form onSubmit={postdata}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label>Question</label>
                                <input type="text" name="question"  onChange={getInputdata} placeholder="Question"
                                    className={`form-control ${show && errorMassage.question ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.question ? <p className="text-danger">{errorMassage.question} </p> : null}
                            </div>

                            <div className="col-12 mb-3">
                                <label>Answer</label>
                                <textarea
                                    name="answer"
                                    
                                    onChange={getInputdata}
                                    placeholder="Answer"
                                    rows={3}
                                    className={`form-control ${show && errorMassage.answer ? 'border-danger' : 'border-primary'}`}
                                />

                                {show && errorMassage.answer ? <p className="text-danger">{errorMassage.answer} </p> : null}
                            </div>



                            <div className="col-lg-6 mb-3">
                                <label>Status</label>
                                <select name="status" onChange={getInputdata} className="form-select border-primary">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Create</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default AdminFaqcreate