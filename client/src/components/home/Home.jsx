import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div style={{display:"flex" , flexDirection:"column" ,alignItems:"center" }}>
           <Link  to="/">Login</Link>
           <Link to="/signup">Signup</Link>
        </div>
    )
}

export default Home
