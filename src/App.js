import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productItem = cartList.find(eachCart => eachCart.id === product.id)
    if (productItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === product.id) {
            const updatedQuantity = product.quantity + eachCart.quantity
            return {...eachCart, quantity: updatedQuantity}
          }
          return eachCart
        }),
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCart => {
        if (eachCart.id === id) {
          const updatedQuantity = eachCart.quantity + 1
          return {...eachCart, quantity: updatedQuantity}
        }
        return eachCart
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productItem = cartList.find(eachCart => eachCart.id === id)
    if (productItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === id) {
            const updatedQuantity = eachCart.quantity - 1
            return {...eachCart, quantity: updatedQuantity}
          }
          return eachCart
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachCart => eachCart.id !== id),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
