// import React from 'react';
// import React, { useContext } from 'react';
// import { withRouter } from 'react-router-dom';
import ShoppingCart from './shopping-cart-svgrepo-com.svg';
// import { CartContext } from '../../context/cart-context';
import classes from './CartIcon.module.css';

const CartIcon = ({ history, itemsCount }) => {
//   const { itemCount, cartItems } = useContext(CartContext);
//   console.log('CartItems:', cartItems);
  return (
    <div className={classes.block}>            
        <div className={classes.smallPicContainer}> 
            <img className={classes.smallPic} src={ShoppingCart} alt="Shopping Cart"/>
        </div>  
        {
          itemsCount > 0 ? <span className={classes.cartCount}> { itemsCount } </span> : null
        }  
    </div>
  );
}

export default CartIcon;
// export default withRouter(CartIcon);