import React, { useState, useEffect } from 'react';
import { Card,  Button, Container, Image, Dimmer, Loader } from 'semantic-ui-react';
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Headers from './Headers';

const Home = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/products");
                setTimeout(() => {
                    setCartData(response.data);
                    setLoading(false);
                }, 3000);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };
    
        fetchFoodData();
    }, []);

    const send = (e) => {
        dispatch(addToCart(e));
    }



    return (
        <>
        <Headers/>
            <Container>
          
            </Container>
            <section style={{ display: 'flex', flexWrap: 'wrap',justifyContent:"center",marginTop:"100px" }}>
                {loading ? (
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                ) : cartData.length ? cartData.map((element, index) => (
                    <Card key={index} style={{ width: "22rem", border: "none", margin: "10px" }}>
                        <Image src={element.image} wrapped ui={false} />

                        <Card.Content>
                            <Card.Header>{element.name}</Card.Header>
                         
                            <Card.Description>   <p>{element.description}</p>
            <p>Price: {element.price}</p></Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div>
                                <Button basic color='green' onClick={() => send(element)}>Add TO Cart</Button>
                            </div>
                        </Card.Content>
                    </Card>
                )) : <p>No data found</p>}
            </section>
        </>
    )
}

export default Home;
