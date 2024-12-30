import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import Lenis from "@studio-freight/lenis";
import './Home.css'

function Home() {

    // useEffect(() => {
    //     const lenis = new Lenis({
    //         duration: 0.1,
    //         easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    //         direction: "vertical",
    //         gestureDirection: "vertical",
    //         smooth: true,
    //         smoothTouch: false,
    //         touchMultiplier: 1,
    //     });

    //     const animate = (time) => {
    //         lenis.raf(time);
    //         requestAnimationFrame(animate);
    //     };

    //     requestAnimationFrame(animate);

    //     // Clean up on component unmount
    //     return () => {
    //         lenis.destroy();
    //     };
    // }, []);

    const [loading, setLoading] = useState(true);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/cats`)
            .then((res) => {
                setCards(res.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, [])

    const renderCards = () => {
        return cards.map((card, i) => (
            <Card key={card._id} n={i} name={card.name} description={card.description} image={card.image} />
        ))
    };
    return (
        <div >
            <Header />
            {loading ? <Loading />
                : <div className='cards light'>{renderCards()}</div>}
        </div>
    )
}

export default Home
