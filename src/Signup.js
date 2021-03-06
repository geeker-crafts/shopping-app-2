import React, { useState } from 'react';
import axios from 'axios';

const Singup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        //api call with user entered data
        if(name && email && password && passwordConf){
            if(password == passwordConf){
                setError('')
                setLoading(true);

                axios({
                    method: 'POST',
                    url: 'https://api.backendless.com/A48A87A8-1136-F5B7-FF27-5F9C8B02B300/A4EA1D67-ED30-4C27-B2F2-9D870D9BEF59/users/register',
                    data: {
                        name: name,
                        email: email,
                        password: password
                    }
                }).then((res) => {
                    setLoading(false);
                    window.location.href = '/users/login'
                }).catch((err) => {
                    setLoading(false);
                    alert('error')
                })

            } else {
                setError('Passwords not matching')
            }
        } else {
            alert('Please fill all details')
        }
    }

    return (
        <>
            {
                loading && (
                    <>
                        <div class="spinner-border text-primary" role="status">
                        </div>
                        <div class="spinner-border text-secondary" role="status">
                        </div>
                        <div class="spinner-border text-success" role="status">
                        </div>
                    </>
                )
            }
            <div style={{width: 500, margin: '0px auto', marginTop: 300}}>
                <h1>Singup Form</h1>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={(event) => { setName(event.target.value)  }}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value)  }}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value)  }}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password Confirmation</label>
                    <input
                        type="password"
                        className="form-control"
                        value={passwordConf}
                        onChange={(event) => { setPasswordConf(event.target.value)  }}
                    />
                </div>

                {
                    error && (
                        <div class="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )
                }

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >Singup</button><br />

                <a href='/users/login'>Already have a account? Login here</a>
            </div>
        </>
    )
}


export default Singup;