import { useEffect, useState } from "react"

const UpdateProfile = ({ setOption }) => {

    const [data, setData] = useState({
         name: "",
        username: "",
        email: "",
        phone: ""
    })

    const [errorMassage, setErrorMassage] = useState({
        name: "",
        username: "",
        email: "",
        phone: ""

    })

    const [show, setShow] = useState(false)


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


            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
            response = await response.json()


            const item = response.find(x =>
                x.id !== data.id && (x.username?.toLocaleLowerCase() === data.username.toLowerCase() ||
                    x.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase()
                ))
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
                let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                    method: 'PUT',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        ...data
                    })
                })
                response = await response.json()
                if (response)
                    setOption("Profile")
                else
                    alert("Something W  ent Wrong")
            }
        }

    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setData({...data, ...response })
        })()
    }, [])
    return (
        <form onSubmit={postData}>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <label>Name</label>
                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder="Full Name" className={`form-control ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`} />
                    {show && errorMassage.name ? <p className="text-danger">{errorMassage.name}</p> : null}
                </div>

                <div className="col-lg-6 mb-3">
                    <label>User Name</label>
                    <input type="text" name="username" value={data.username} onChange={getInputData} placeholder="Username" className={`form-control ${show && errorMassage.username ? 'border-danger' : 'border-primary'}`} />
                    {show && errorMassage.username ? <p className="text-danger">{errorMassage.username}</p> : null}
                </div>

                <div className="col-lg-6 mb-3">
                    <label>Phone</label>
                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder="Phone Number" className={`form-control ${show && errorMassage.phone ? 'border-danger' : 'border-primary'}`} />
                    {show && errorMassage.phone ? <p className="text-danger">{errorMassage.phone}</p> : null}
                </div>

                <div className="col-lg-6 mb-3">
                    <label>Email</label>
                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder="Email Address" className={`form-control ${show && errorMassage.email ? 'border-danger' : 'border-primary'}`} />
                    {show && errorMassage.email ? <p className="text-danger">{errorMassage.email}</p> : null}
                </div>


                <div className="col-12 mb-3">
                    <button type="submit" className="btn btn-primary w-100">Update Profile</button>
                </div>


            </div>
        </form>
    )
}
export default UpdateProfile