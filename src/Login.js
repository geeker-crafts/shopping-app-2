import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {

    const myRef = React.createRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if(email && password){
            axios({
                method: 'POST',
                url: 'https://api.backendless.com/A48A87A8-1136-F5B7-FF27-5F9C8B02B300/A4EA1D67-ED30-4C27-B2F2-9D870D9BEF59/users/login',
                data: {
                    login: email,
                    password: password,
                }
            }).then((res) => {
                setError('')
                localStorage.setItem('token', res.data["user-token"])
                window.location.href = '/'
            }).catch((error) => {
                setError(error.response.data.message)
            })

        } else {
            setError('Must enter both details')
        }
    }

    useEffect(() => {
        myRef.current.focus()
    }, [])

    return (
        <>
            <div style={{width: 500, margin: '0px auto', marginTop: 300}}>
                <h1>Login Form</h1>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        ref={myRef}
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={[password]}
                        onChange={(event) => { setPassword(event.target.value) }}
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
                    onClick={handleLogin}
                >Login</button><br />

                <a href='/users/signup'>Don't have a account? Singup here</a>
            </div>
        </>
    )
}


export default Login;