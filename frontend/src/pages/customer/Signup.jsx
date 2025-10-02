import React, { useState } from "react";
import axios from 'axios'

const Signup = () => {

    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault() 

        axios.post('http://localhost:3000/api/v1/user/register', {username, email, password, phone, address})
        .then((result)=> console.log(result))
        .catch((err)=> console.log(err));
        // 10 
        // from axios 
    }

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" name="username"  onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={(e)=> setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="text" name="password" onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="phone">Phone No.</label>
          <input type="text" name="phone" onChange={(e)=> setPhone(e.target.value)} />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" name="adsress" onChange={(e)=> setAddress(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
