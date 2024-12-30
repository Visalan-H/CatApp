import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import axios from 'axios';


export default function ProtectedRoute({ children }) {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [emailID,setEmail]=useState('')
    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/protected`, { withCredentials: true });
                setEmail(res.data.user.email);
                setIsVerified(true);
            } catch (error) {
                setIsVerified(false);
            }
            finally{
                setLoading(false);
            }
        }
        checkToken();
    }, []);
    
    if(loading) return <Loading />
    
    return isVerified ? React.cloneElement(children, { emailID: emailID}) : <Navigate to='/login'/>
    
}
