import React, { useState, useEffect } from "react";
import s from "./home.module.scss";
import TestText from "../../components/testText";
import Folder from "../../components/folder";
import Logout from "../../components/logout";
import { useSelector } from "react-redux";
import axios from "../../app/api/axios";

export default function Home() {
    const username = useSelector((state) => state.auth.username);
    const fonts = useSelector((state) => state.fonts.value);
    const userId = useSelector((state) => state.auth.userId);

    const [ratings, setRatings] = useState({});

    const handleRating = (userId, fontId, fontName, rating) => {
        setRatings((prev) => ({
            ...prev,
            [fontName]: rating,
        }));
        sendRate(userId, fontId, rating);
    };

    const sendRate = async (userId, fontId, rating) => {
        try {
            const res = await axios.post("/fonts/rate", { userId, fontId, rating });
            return res.status === 200;
        } catch (err) {
            console.error("FAILED : Try to rate typeface => ", err);
        }
    };

    const getRate = async (userId) => {
        try {
            const res = await axios.post("/fonts/rate/getAll", { userId });
            console.log(res.data.data);
            const fontRates = res.data.data;
            fontRates.forEach((rate) => {
                setRatings((prev) => ({
                    ...prev,
                    [rate.fontName]: rate.rating,
                }));
            });
        } catch (err) {
            console.error("FAILED : Try to get all rates => ", err);
        }
    };

    useEffect(() => {
        console.log(ratings); // Cela affichera la valeur mise à jour de l'état ratings
    }, [ratings]);

    useEffect(() => {
        getRate(userId);
    }, []);

    return (
        <>
            <section>
                <div className={s.hey}>
                    <h2>Hey {username}_</h2>
                </div>
                <div className={s.favorites__typos}>
                    <h3>Your favorites typographies</h3>
                    <div className={s.favorite__box}>
                        {fonts.map((font, i) => (
                            <div className={s.favorite__box__wrapper} key={font.name + i}>
                                <div className={s.favorite}>
                                    <div className={s.favorite__wrapper}>
                                        <div className={s.favorite__wrapper__text}>
                                            <span style={{ fontFamily: font.name }}>
                                                {font.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className={s.legend}>{font.name}</span>
                                <div className={s.favorite__wrapper__note}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <input
                                            key={font.name + i}
                                            type="checkbox"
                                            checked={ratings[font.name] >= i + 1}
                                            onChange={() =>
                                                handleRating(userId, font.id, font.name, i + 1)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Folder />
                <TestText />
                <Logout />
            </section>
        </>
    );
}
