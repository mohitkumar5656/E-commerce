import Cart from "../../component/User/Cart"

const CartPage  = ()=>{
    return (
    <>
    <div className="container my-3">
        <h5 className="text-center bg-primary p-2  text-light">Your Cart</h5>
        <Cart title="Cart"/>
    </div>
    </>
    )
}
export default CartPage