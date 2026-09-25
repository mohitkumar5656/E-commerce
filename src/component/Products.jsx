import { useState } from "react"
import SingleProduct from "./SingleProduct"

const Products = ({ maincategory, data }) => {
    const [selected, setselected] = useState("")
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5">
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5 mb-3">Our Letest Products</h5>
                        <div className="d-flex">
                            <button className={`w-100 btn ${selected === "" ? 'btn-primary' : 'btn-light'}`} onClick={() => setselected("")}>All</button>
                            {
                                maincategory.map(item => {
                                    return <button className={`w-100 btn ${selected === item.name ? 'btn-primary' : 'btn-light'}`} onClick={() => setselected(item.name)} key={item.id}>{item.name}</button>
                                })
                            }
                        </div>
                    </div>
                    <div className="row g-5">
                        {
                            data.filter(x => selected === "" || x.maincategory === selected).slice(0, 24).map(item => {
                                return <div className="col-xl-4 col-lg-6 " key={item.id}>
                                    <SingleProduct item={item} />
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
export default Products