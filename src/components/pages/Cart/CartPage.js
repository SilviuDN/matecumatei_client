import {Container} from 'react-bootstrap'
import CartItemsList from './CartItemsList'
import CartTotal from './CartTotal'
// import classes from './CartPage.module.css';

const CartPage = ({cart, removeItem, removeAllItems}) => {

    return(
        <Container className='mt-5'>
            {
                cart.itemsCount === 0
                ?
                <h1>Momentan nu ai niciun curs in coș.</h1>
                :
                <>
                <h1>Coșul tău conține următoarele cursuri:</h1>
                <CartItemsList cart={cart} removeItem={removeItem}/>
                <CartTotal itemCount={cart.itemsCount} total={cart.total} removeAllItems={removeAllItems}/>
                </>
            }
        </Container>
    )
}

export default CartPage