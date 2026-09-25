import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate()

    useEffect(()=>{
       setTimeout(()=>{
         if(localStorage.getItem("login") && window.location.pathname.includes("profile"))
            navigate(0)
        else if 
             (localStorage.getItem("login") && window.location.pathname==="/admin" && localStorage.getItem("role")!=="Buyer")
            navigate(0)
        
       },500)
    },[ ])
    return (
        <div className="container my-3">
         <div className="card text-center p-5">
            <h1>OOPS!!!</h1>
            <h3>404! Page  Not Found</h3>
            <Link to="/" className="btn btn-primary w-25 m-auto">Back to Home</Link>
         </div>
        </div>
    )
}
export default ErrorPage