import { getMaincategory } from "../Redux/ActionCreaters/MaincategoryAction"
import { getSubcategory } from "../Redux/ActionCreaters/SubcategoryAction"
import { getBrand } from "../Redux/ActionCreaters/BrandAction"
import { getProduct } from "../Redux/ActionCreaters/ProductAction"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import SingleProduct from "../component/SingleProduct"


const colors = ["Red", "Black", "Blue", "Green", "Gray", "Orange", "Yellow", "white", "Navy", "Pink", "Lavender", "N/A"]
const sizes = ['XXXL', 'XXL', 'XL', 'L', 'M', 'SM', 'XS', 'NB', '26', '28', '30', '32', '34', '36', '38', '40', '42', 'N/A']
const ShopPage = () => {
    const [search , setSearch] = useState("")
    const [sortFilter, setsortFilter] = useState("1")
    const [filter, setfilter] = useState({
        maincategory: [],
        subcategory: [],
        brand: [],
        color: [],
        size: []
    })

    const [data, setdata] = useState([])
    const MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    const SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    const BrandStateData = useSelector(state => state.BrandStateData)
    const ProductStateData = useSelector(state => state.ProductStateData)

    const dispatch = useDispatch()

    const getInputCheckbox = (key, value) => {
        let arr = filter[key]

        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setfilter({ ...filter, [key]: arr })
        applyFilter({ ...filter, [key]: arr })
    }

    const applyFilter = (filter) => {
        const data = ProductStateData.filter(x => x.status &&
            (filter.maincategory.length === 0 || filter.maincategory.includes(x.maincategory)) &&
            (filter.subcategory.length === 0 || filter.subcategory.includes(x.subcategory)) &&
            (filter.brand.length === 0 || filter.brand.includes(x.brand)) &&
            (filter.color.length === 0 || (new Set(filter.color).intersection(new Set(x.color))).size > 0) &&
            (filter.size.length === 0 || (new Set(filter.size).intersection(new Set(x.size))).size > 0)
        )
        applySortFilter(sortFilter, data)

    }

    const postSearchData = (e)=>{
        e.preventDefault()
        const ch = search.toLocaleLowerCase()
        const data = ProductStateData.filter(x=>x.status &&
            (x.name.toLocaleLowerCase().includes(ch))||
            (x.maincategory.toLocaleLowerCase() === ch)||
            (x.subcategory.toLocaleLowerCase() === ch)||
            (x.brand.toLocaleLowerCase() === ch)||
            (x.color.find(x=>x.toLocaleLowerCase()===ch))
        )
        applySortFilter(sortFilter,data)
    }

    const applySortFilter = (sortFilter, data) => {
        setsortFilter(sortFilter)

        if (sortFilter === "1")
            data = data.sort((x, y) => y.id.localeCompare(x.id))
        else if (sortFilter === "2")
            data = data.sort((x, y) => x.finalPrice - y.finalPrice)
        else
            data = data.sort((x, y) => y.finalPrice - x.finalPrice)
        setdata(data)
    }

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getSubcategory()))()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [BrandStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length)
                // setdata(ProductStateData.filter(x => x.status))
                applyFilter(filter)
        })()
    }, [ProductStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-2">
                        <h5 className="bg-primary p-1 text-light rounded text-center ">Maincategory</h5>
                        {
                            MaincategoryStateData.filter(x => x.status).map(item => {
                                return <div key={item.id} className="text-dark ms-2">
                                    <input type="checkbox" onChange={() => getInputCheckbox("maincategory", item.name)} checked={filter.maincategory.includes(item.name)} name={item.name} />
                                    <label className="ms-2">{item.name}</label>
                                </div>
                            })
                        }

                        <h5 className="bg-primary p-1 text-light rounded text-center mt-3">Subcategory</h5>
                        {
                            SubcategoryStateData.filter(x => x.status).map(item => {
                                return <div key={item.id} className="text-dark ms-2">
                                    <input type="checkbox" onChange={() => getInputCheckbox("subcategory", item.name)} checked={filter.subcategory.includes(item.name)} name={item.name} />
                                    <label className="ms-2">{item.name}</label>
                                </div>
                            })
                        }

                        <h5 className="bg-primary p-1 text-light rounded text-center mt-3">Brand</h5>
                        {
                            BrandStateData.filter(x => x.status).map(item => {
                                return <div key={item.id} className="text-dark ms-2">
                                    <input type="checkbox" onChange={() => getInputCheckbox("brand", item.name)} checked={filter.brand.includes(item.name)} name={item.name} />
                                    <label className="ms-2">{item.name}</label>
                                </div>
                            })
                        }

                        <h5 className="bg-primary p-1 text-light rounded text-center mt-3">Color</h5>
                        {
                            colors.map((item, index) => {
                                return <div key={index} className="text-dark ms-2">
                                    <input type="checkbox" onChange={() => getInputCheckbox("color", item)} checked={filter.color.includes(item)} name={item} />
                                    <label className="ms-2">{item}</label>
                                </div>
                            })
                        }


                        <h5 className="bg-primary p-1 text-light rounded text-center mt-3">Size</h5>
                        {
                            sizes.map((item, index) => {
                                return <div key={index} className="text-dark ms-2">
                                    <input type="checkbox" onChange={() => getInputCheckbox("size", item)} checked={filter.size.includes(item)} name={item} />
                                    <label className="ms-2">{item}</label>
                                </div>
                            })
                        }
                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            <div className="col-lg-8">
                                <form onSubmit={postSearchData}>
                                    <div className="btn-group w-100">
                                        <input type="search" name="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search Product By name" className="form-control rounded-0 rounded-start" />
                                        <button className="btn btn-primary ">Serach</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-4">
                                <select name="sortFilter" onChange={(e) => applySortFilter(e.target.value, data)} className="form-control border-primary">
                                    <option value="1">Latest</option>
                                    <option value="2">Price : Low to High</option>
                                    <option value="3">Price : High to Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {
                                data.map((item) => {
                                    return <div className="col-lg-4 col-md-6 col-12 mb-2" key={item.id}>
                                        <SingleProduct item={item} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ShopPage