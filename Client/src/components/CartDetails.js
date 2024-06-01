import React, { useEffect, useState } from 'react';
import { Button, Image, Message, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {  removeToCart, removeSingleIteams, emptycartIteam, addIncreToCart } from '../redux/features/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Headers from './Headers';

const CartDetails = () => {
    const { carts, userDetails } = useSelector((state) => state.allCart);

    const [totalprice, setPrice] = useState(0);
    const [totalquantity, setTotalQuantity] = useState(0);
    const dispatch = useDispatch();
    let nav = useNavigate();

    const handleIncrement = (e) => {
        dispatch(addIncreToCart(e));
    };

    const handleDecrement = (e) => {
        dispatch(removeToCart(e));
        toast.success("Item Remove From Your Cart");
    };

    const handleSingleDecrement = (e) => {
        dispatch(removeSingleIteams(e));
    };

    const emptycart = () => {
        dispatch(emptycartIteam());
        
    };

    const total = () => {
        let totalprice = 0;
        carts.map((ele) => {
            totalprice = ele.price * ele.qnty + totalprice;
        });
        setPrice(totalprice);
    };

    const countquantity = () => {
        let totalquantity = 0;
        carts.map((ele) => {
            totalquantity = ele.qnty + totalquantity;
        });
        setTotalQuantity(totalquantity);
    };

    useEffect(() => {
        total();
    }, [total]);

    useEffect(() => {
        countquantity();
    }, [countquantity]);

    const handlePlaceOrder = async () => {
        if (!userDetails || !userDetails.firstName || !userDetails.lastName || !userDetails.address) {
            
            toast.error('Please fill in all user details')
            nav("/");
        }

        try {
            const response = await axios.post('http://localhost:5000/order', { userDetails, cartItems: carts });
            if (response.status === 200) {
                
                toast.success('Order placed successfully')
                emptycart();
                nav("/home");
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order');
        }
    };

    return (
        <>
        <Headers/>
            <div style={{marginTop:"100px"}}>
                <div>
                    <div>
                        <h2>Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}</h2>
                        {
                            carts.length > 0 ? <Button color='red' size='mini' onClick={emptycart}>
                                <i></i>
                                <span>EmptyCart</span>
                            </Button> : ""
                        }
                    </div>
                </div>
                <div>
                    {carts.length === 0 ?
                        <Message>
                            <Message.Header>Your Cart Is Empty</Message.Header>
                            <p>Try adding some items to your cart!</p>
                        </Message> :
                        <Table celled unstackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                    <Table.HeaderCell>Product</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell>Qty</Table.HeaderCell>
                                    <Table.HeaderCell>Total Amount</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {carts.map((data, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>
                                            <Button icon='trash alternate' color='red' onClick={() => handleDecrement(data.id)} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Image src={data.image} size='tiny' />
                                        </Table.Cell>
                                        <Table.Cell>{data.name}</Table.Cell>
                                        <Table.Cell>₹ {data.price}</Table.Cell>
                                        <Table.Cell>
                                            <Button icon='minus' size='mini' onClick={data.qnty <= 1 ? () => handleDecrement(data.id) : () => handleSingleDecrement(data)} />
                                            {data.qnty}
                                            <Button icon='plus' size='mini' onClick={() => handleIncrement(data)} />
                                        </Table.Cell>
                                        <Table.Cell>₹ {data.qnty * data.price}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4' />
                                    <Table.HeaderCell>
                                        Items In Cart: <span>{totalquantity}</span>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Total Price: <span>₹ {totalprice}</span>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    }
                </div>
               
            </div>
            <div style={{ marginLeft: "90%", marginTop: "1%" }}>
            <Button color='green' onClick={handlePlaceOrder} disabled={carts.length === 0}>Place Order</Button>
          </div>
        </>
    );
};

export default CartDetails;
