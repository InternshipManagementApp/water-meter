import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../Design/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');

    //to navigate with the given URL
    const navigate = useNavigate();
  
    //what happen after button click - login if the email and the password are corrext
    const handleSubmit = async (e) => {
      e.preventDefault();
      await fetch('https://localhost:7110/api/User/'+email+'/'+pass)
      .then((response) => {
        if(response.status === 200)
        {
          response.json().then((data) => {setUser(data);})
          navigate('/' + user.UserId, { replace: true })
          alert("Hi again here!");
        }
        else
        {
          alert("Invalid email or password");
        }
      })
      .catch((err) => {
        console.log(err.message);
     });
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