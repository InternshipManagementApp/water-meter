import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../Design/register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [fullName, setFullName] = useState('');
    const [telephoneNumber, setPhone] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    //radio button to declare the user what is
    const RadioInput = ({label, value, checked, setter}) => {
        return (
          <label className="radio_label">
            <input className='radio_input' type="radio" checked={checked === value}
                   onChange={() => setter(value)} />
            {label}
          </label>
        );
    };

    //what happen after button click - check and POST
    const handleSubmit = async (e) => {
        e.preventDefault(); //cancels the event if it is cancelable
        //verification
        const validPassword = new RegExp('(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}')
        if(!validPassword.test(pass1))
        {
            alert("Password must contain the following: \n a lowercase \n a capital letter \n a number \n minimum 8 characters")
        }
        else if(pass1 !== pass2)
        {
            alert("The two password it's not the same!");
        }
        else if(!type)
        {
            alert("Doesn't choosed type.");
        } else {
        
            //POST method
            await fetch("http://127.0.0.1:8000/user", {
            method: "POST",
            cache: 'no-cache',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: fullName,
                personType: type,
                email: email,
                password: pass1,
                telephone: telephoneNumber,
                }),
            }).then(response => {
                if (response.status >= 200 && response.status < 300){
                    alert("Success registration!");
                    navigate('/login', { replace: true })
                } else {
                console.log('Somthing happened wrong');
                alert("Sorry , is a problem with the server!")
                }
            }).catch(err => err); 
        }
    }

    return (
        <div className="main_part">
           <p className="register_title">Register</p>
            <form onSubmit={handleSubmit} className="register">
                <div className="inputs">
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" name="fullName" id="fullName" placeholder="Full name" required/>
                </div>
                <div className="inputs">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" required/>
                </div>
                <div className="inputs">
                    <input value={pass1} onChange={(e) => setPass1(e.target.value)} type="password" name="password1" id="password1" placeholder="Password" required/>
                </div>
                <div className="inputs">
                    <input value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" name="password2" id="password2" placeholder="Repeat Password" required/>
                </div>
                <div className="inputs">
                    <input value={telephoneNumber} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" placeholder="Phone number" required/>
                </div>
                <div  className="radio">
                    <label className="labelForRadios">Type:</label>
                    <RadioInput label="Student" value="student" checked={type} setter={setType} />
                    <RadioInput label="Professor" value="professor" checked={type} setter={setType}  />
                    <RadioInput label="Employee" value="employee" checked={type} setter={setType}  />
                </div>
                <div className="inputs">
                    <button name="submit" className="buttonRegister">Register</button>
                </div>
                <p className="register_to_login">Already have an account?<a className='link' href="../login">Sign in</a></p>
            </form>
        </div>
    )
};

export default Register;