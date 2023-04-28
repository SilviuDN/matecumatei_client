import {Container, Card, Button} from 'react-bootstrap'

const CartTotal = ({itemCount, total, removeAllItems, history}) => {

    // console.log(loggedUser.role)

    return(
        <Container className='mt-4'>
            <Card>
                <Card.Body>
                    <Card.Title>Coșul tău conține {itemCount} cursuri.</Card.Title>
                    <Card.Text>Total: {total} RON</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                    <Button 
                        variant="dark" 
                        onClick={() => {}}>
                        {/* onClick={() => history.push('/checkout')}> */}
                        CHECKOUT
                    </Button>
                    {/* <Button variant="light" onClick={() => clearCart()}> */}
                    <Button variant="danger"  onClick={() => removeAllItems()}>
                        Golește coșul
                    </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default CartTotal