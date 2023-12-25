import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../Design/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');

    //API operation - GET method
    useEffect( () => {
      users()
    }, []);

    const users = async () => {
      const responce = await fetch('https://localhost:7110/api/User/allUsers');
      setUser(await responce.json())
    }

    //to navigate with the given URL
    const navigate = useNavigate();
    function doStuff(id){navigate('/'+id, { replace: true })};
  
    //what happen after button click - check if the email and password is correct
    const handleSubmit = async (e) => {
      e.preventDefault();
      let value = user.find(data => data.email === email && data.password === pass)
      if (value) {
        doStuff(value.userId);
      } else {
        alert("Incorrect email or password!");
      }
    }

    return (
        <div className="main_part">
          <p className="login_title">Login</p>
          <form onSubmit={handleSubmit} className="login">
            <div className="inputs">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" required/>
            </div>
            <div className="inputs">
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" name="password" id="password" placeholder="Password" required/>
            </div>
            <div className="inputs">
                <button name="submit" className="btn1">Sign in</button>
            </div>
            <p className="login_to_register">Don't have an account?<a className='link' href="../Pages/Register">Register</a></p>
        </form>
      </div>
    )
};

export default Login;