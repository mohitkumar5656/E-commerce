import { useState } from "react"
import FormValidator from "../../validator/FormValidator"
import { Link, useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [data, setData] = useState({

        username: '',
        email: '',
        password: '',

    })

    const [errorMassage, setErrorMassage] = useState("")

    const navigate = useNavigate("")

    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

    }
    const postData = async (e) => {
        e.preventDefault()

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()

        let item = response.find(x => x.username === data.username || x.email === data.username)
        if (item && item.password === data.password) {
            if (item.status === false)
                setErrorMassage("Your Account Has been Blocked")
            else {
                localStorage.setItem("login", true)
                localStorage.setItem("userid", item.id)
                localStorage.setItem("name", item.name)
                localStorage.setItem("role", item.role)
                if (item.role === "Buyer")
                    navigate("/profile")
                else
                    navigate("/admin")
            }
        }
        else
            setErrorMassage("Invalid Username or Password")



    }
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
                    <h5 className="bg-primary text-center text-light p-2">Login To Your Account</h5>
                    <form onSubmit={postData}>
                        <div className="row">


                            <div className="col-12 mb-3">
                                <label>User Name</label>
                                <input type="text" name="username" onChange={getInputData} placeholder="Username or Email " className={`form-control ${errorMassage ? 'border-danger' : 'border-primary'}`} />
                                {errorMassage ? <p className="text-danger">{errorMassage}</p> : null}
                            </div>

                            {/* <div className="col-12 mb-3">
                                <label>Email</label>
                                <input type="email" name="email" onChange={getInputData} placeholder="Email Address" className={`form-control ${ errorMassage.email ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.email ? <p className="text-danger">{errorMassage.email}</p> : null}
                            </div> */}

                            <div className="col-12 mb-3">
                                <label>Password</label>
                                <input type="password" name="password" onChange={getInputData} placeholder="Enter the Password" className={`form-control ${errorMassage ? 'border-danger' : 'border-primary'}`} />
                                {errorMassage ? <p className="text-danger">{errorMassage}</p> : null}
                            </div>
                            <div className="col-12 mb-3">
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                            </div>


                        </div>
                    </form>
                    <div className="d-flex justify-content-between">
                        <Link to="#!">Forget Password</Link>
                        <Link to="/signup">Doesn't Have An Account ? Create</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage