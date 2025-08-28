import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../scripts/axios.js'
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useCookies } from "react-cookie";

export default function Home() {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function verifyCookie() {
            try {
                const { data } = await api.post("/", {}, { withCredentials: true });
                const { status, user } = data;

                if (!status) {
                    removeCookie("token");
                    navigate("/login");
                } else {
                    setUsername(user);
                    toast.info(`Welcome ${user}`, {
                        icon: false,
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        }
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    function Logout() {
        api.post("/logout", {}, { withCredentials: true })
            .then(() => {
                removeCookie("token");
                navigate("/login", { replace: true });
            })
            .catch(err => {
                console.error("Logout failed:", err);
            });
    };

    return (
        <div className="Home_conatiner">
            <div className="home_page">
                <h4>Welcome <span>{username}</span></h4>
                <button className="form_sumbit" onClick={Logout}>LOGOUT</button>
            </div>
            <ToastContainer />
        </div>
    );
};