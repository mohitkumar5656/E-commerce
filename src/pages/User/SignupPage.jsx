import { useState } from "react"
import FormValidator from "../../validator/FormValidator"
import { Link, useNavigate } from "react-router-dom"

const SignupPage = () => {
    const [data, setData] = useState({
        name: "",
        username: '',
        email: '',
        phone: '',
        password: '',
        cpassword: ''
    })

    const [errorMassage, setErrorMassage] = useState({
        name: "Name Field is Mendatory",
        username: "Use Name Field is Mendatory",
        email: "Email Field is Mendatory",
        phone: "Phone Field is Mendatory",
        password: "Password Field is Mendatory"
    })

    const [show, setShow] = useState(false)
    const navigate = useNavigate("")

    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMassage({ ...errorMassage, [name]: FormValidator(e) })
    }
    const postData = async (e) => {
        
        e.preventDefault()
        const error = Object.values(errorMassage).find(x => x !== "")
        if (error)
            setShow(true)
        else {

            if (data.password !== data.cpassword) {
                setErrorMassage({
                    ...errorMassage,
                    password: "Password and Confirm Password Dosen`t Metched "
                })
                setShow(true)
                return
            }
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
            response = await response.json()

           
            const item = response.find(x =>
                x.username?.toLocaleLowerCase() === data.username.toLowerCase() ||
                x.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase()
            )
            if (item) {
                setErrorMassage({
                    ...errorMassage,
                    username: item.username?.toLocaleLowerCase() === data.username.toLocaleLowerCase()
                        ? "Username Already Taken"
                        : "",
                    email: item.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase()
                        ? "Email Already Taken"
                        : ""
                })
                setShow(true)
            }
            else {
                let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer",
                        status:true
                    })
                })
                response = await response.json()
                if (response)
                    navigate("/login")
                else
                    alert("Something W  ent Wrong")
            }
        }

    }
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
                    <h5 className="bg-primary text-center text-light p-2">Create Your Free Account</h5>
                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={getInputData} placeholder="Full Name" className={`form-control ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.name ? <p className="text-danger">{errorMassage.name}</p> : null}
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>User Name</label>
                                <input type="text" name="username" onChange={getInputData} placeholder="Username" className={`form-control ${show && errorMassage.username ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.username ? <p className="text-danger">{errorMassage.username}</p> : null}
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>Phone</label>
                                <input type="text" name="phone" onChange={getInputData} placeholder="Phone Number" className={`form-control ${show && errorMassage.phone ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.phone ? <p className="text-danger">{errorMassage.phone}</p> : null}
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>Email</label>
                                <input type="email" name="email" onChange={getInputData} placeholder="Email Address" className={`form-control ${show && errorMassage.email ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.email ? <p className="text-danger">{errorMassage.email}</p> : null}
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>Password</label>
                                <input type="password" name="password" onChange={getInputData} placeholder="Enter the Password" className={`form-control ${show && errorMassage.password ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.password ? <p className="text-danger">{errorMassage.password}</p> : null}
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>Confirm Password</label>
                                <input type="password" name="cpassword" onChange={getInputData} placeholder="Confirm Password" className={`form-control ${show && errorMassage.password ? 'border-danger' : 'border-primary'}`} />

                            </div>
                            <div className="col-12 mb-3">
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                            </div>


                        </div>
                    </form>
                    <Link to="/login">Already Have An Account? Login</Link>
                </div>
            </div>
        </div>
    )
}
export default SignupPage