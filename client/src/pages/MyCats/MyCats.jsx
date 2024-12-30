import React, { useEffect, useState } from 'react'
import './MyCats.css'
import axios from 'axios'
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';

export default function MyCats() {

    const [myCats, setMyCats] = useState([]);
    const [loading,setLoading]=useState(true);
    

    useEffect(() => {
        const getMyCats = () => {
            axios.get(`${import.meta.env.VITE_BASE_URL}/cats/mycats`, { withCredentials: true })
                .then((res) => setMyCats(res.data.data))
                .catch((err) => console.log(err));
        }
        getMyCats()
        setLoading(false)
    }, [])

    if(loading) return <Loading/>


    return (
        <>
        <Header></Header>
        <div className='cards light mycatsmain'>
            {myCats.map((card, i) => (
                <Card key={card._id} n={i} name={card.name} description={card.description} image={card.image} />
            ))}
        </div>
        </>
    )
}
