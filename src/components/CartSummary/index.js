import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let sum = 0
      cartList.forEach(eachList => {
        sum += eachList.quantity * eachList.price
      })
      const lengthCart = cartList.length

      return (
        <div className="summary-container">
          <h3 className="order-heading">
            Order Total: <span className="total">Rs {sum}/- </span>
          </h3>
          <p className="order-para">{lengthCart} Items in cart</p>
          <button type="button" className="checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
