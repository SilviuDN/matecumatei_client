import {Container} from 'react-bootstrap'
import CartItemCard from './CartItemCard'

const CartItemsList = ({cart, removeItem}) => {

    // console.log(loggedUser.role)

    return(
        <Container>
            {
                cart.cartItems.map((el, key) => <CartItemCard key={key} title={el.name} imageUrl={el.image} price={el.price} _id = {el._id}  
                    removeItem={removeItem}/>)
            }

        </Container>
    )
}

export default CartItemsList