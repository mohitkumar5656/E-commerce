import { useDispatch, useSelector } from "react-redux"
import { getFaq } from "../Redux/ActionCreaters/FaqAction"
import { useEffect } from "react"

const FaqPage = () => {
    const FaqStateData = useSelector(state => state.FaqStateData)

    const dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getFaq()))()
    }, [FaqStateData.length])
    return (
        <>
           <div className="container-fluid">
            <div className="container my-5">
                 <div className="accordion" id="accordionExample">
                {
                    FaqStateData.filter(x=>x.status).map((item,index)=>{
                        return <div className="accordion-item" key={item.id}>
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="true" aria-controls="collapseOne">
                            {item.question}
                        </button>
                    </h2>
                    <div id={`collapse${item.id}`} className={`accordion-collapse collapse${index===0?'show':''} `} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          {item.answer}
                        </div>
                    </div>
                </div>

                    })
                }
            </div>
            </div>
           </div>


        </>
    )
}
export default FaqPage