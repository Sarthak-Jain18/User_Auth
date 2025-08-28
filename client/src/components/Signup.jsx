import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../scripts/axios.js'
import { ToastContainer, toast, Bounce } from "react-toastify";
import { CircleCheck, CircleX, Mail, User, Lock } from 'lucide-react';

export default function Signup() {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({ email: "", password: "", username: "" });
    const { email, password, username } = inputValue;

    function handleOnChange(event) {
        const { name, value } = event.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    function handleError(err) {
        toast.error(
            <span className="toast-inline"><CircleX /> {err}</span>,
            {
                icon: false,
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }
        );
    };

    function handleSuccess(msg) {
        toast.success(
            <span className="toast-inline"><CircleCheck /> {msg}</span>,
            {
                icon: false,
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }
        );
    };

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data } = await api.post("/signup", { ...inputValue }, { withCredentials: true });
            const { success, message } = data;

            if (success) {
                handleSuccess(message);
                setTimeout(() => { navigate("/", { replace: true }); }, 1500);
            }
            else {
                handleError(message);
            }
        }
        catch (error) {
            console.log(error);
        }

        setInputValue({ ...inputValue, email: "", password: "", username: "" });
    };

    return (
        <div className="Signup_conatiner p-5">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-6 auth_inner_container border rounded-3">
                    <div className="form_container justify-content-center p-3">

                        <div className="my-3"><h2>Signup Account</h2></div>

                        <div className="justify-content-center">
                            <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username" className="form-label"><User className="form_svg" /> Username</label>
                                    <input type="text" id="username" className="form-control" name="username" value={username}
                                        placeholder="Enter your username" onChange={handleOnChange} autoComplete="username" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="form-label"><Mail className="form_svg" /> Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={email}
                                        placeholder="Enter your email" onChange={handleOnChange} autoComplete="email" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="form-label"><Lock className="form_svg" /> Password</label>
                                    <input type="password" id="password" className="form-control" name="password" value={password}
                                        placeholder="Enter your password" onChange={handleOnChange} autoComplete="current-password" />
                                </div>
                                <button className="form_sumbit" type="submit">Signup</button>
                                <div>
                                    Already have an account? <Link className="acc-auth-link" to={"/login"}>Login</Link>
                                </div>
                            </form>
                        </div>

                        <ToastContainer />

                    </div>
                </div>
            </div>
        </div >
    );
};