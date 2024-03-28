import React, { useEffect, useRef } from "react";
import s from "./login.module.scss";
import PropTypes from "prop-types";
import Connect from "../../components/connect";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Login({ active, setActive }) {
    const container = useRef();
    const tl = useRef();
    const button = useRef();

    useEffect(() => {
        console.log("yoo", active);
    }, [active]);

    useGSAP(() => {
        tl.current = gsap.timeline({ pause: true, duration: 0.2 });

        tl.current
            .to(
                container.current,
                {
                    height: "+=350px",
                    width: "+=250px",
                    ease: "linear",
                    duration: 0.2,
                },
                0
            )
            .to(
                button.current,
                {
                    marginLeft: "10px",
                },
                0
            )
            .to(
                "#connect",
                {
                    opacity: 1,
                    duration: 1,
                },
                0
            );
    }, []);

    useEffect(() => {
        active ? tl.current.play() : tl.current.reverse();
    }, [active]);

    return (
        <>
            <div className={s.login} ref={container}>
                <div className={s.login__ctn} ref={button}>
                    <button className={s.login__btn} type="submit" onClick={() => setActive()}>
                        Login
                    </button>
                </div>
                <div className={active ? s.connect : s.offscreen} id="connect">
                    <Connect />
                </div>
            </div>
        </>
    );
}

// const [login, setLogin] = useState(false);
// const container = useRef();

Login.propTypes = {
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.node.isRequired,
};

// useGSAP(() => {
//     if (active) {
//         gsap.to(container.current, {
//             height: "300px",
//             width: "20vw",
//             borderRadius: "23px",
//         });
//     } else {
//         gsap.to(container.current, {
//             height: "60%",
//             width: "7vw",
//             borderRadius: "80px",
//             duration: 0.5,
//         });
//     }
// }, [active]);
