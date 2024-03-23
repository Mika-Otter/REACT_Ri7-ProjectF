import React, { useState, useEffect } from "react";
import s from "./favorites.module.scss";
import { useSelector } from "react-redux";
import axios from "../../app/api/axios";

export default function Favorites() {
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

    const handleFavorite = async (userId, fontId, state) => {
        console.log(state);
        try {
            const res = await axios.post("/fonts/favorite", { userId, fontId, state });
            return res.status === 200;
        } catch (err) {
            console.error("FAILED : Try to handle favorite => ", err);
        }
    };

    const getFavorites = async (userId) => {
        try {
            const res = await axios.post("/fonts/favorite/getAll", { userId });
            return res.status === 200;
        } catch (err) {
            console.error("FAILED : Try to get all favorites =>, ", err);
        }
    };

    useEffect(() => {
        console.log(ratings);
    }, [ratings]);

    useEffect(() => {
        getRate(userId);
        getFavorites(userId);
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
                            <div className={s.favorite__ctn} key={font.name + i}>
                                <div className={s.favorite__ctn__wrapper}>
                                    <div className={s.favorite}>
                                        <div className={s.favorite__wrapper}>
                                            <div className={s.favorite__wrapper__text}>
                                                <span style={{ fontFamily: font.name }}>
                                                    {font.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={s.favorite__legend}>
                                        <span className={s.legend}>{font.name}</span>
                                        <div className={s.tools}>
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    handleFavorite(
                                                        userId,
                                                        font.id,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={s.favorite__wrapper__note}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <input
                                            key={font.name + i}
                                            type="checkbox"
                                            checked={ratings[font.name] >= i + 1}
                                            onClick={() =>
                                                handleRating(userId, font.id, font.name, i + 1)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

//______HOVER RATING__________________________________________________________

//const [hoveredRating, setHoveredRating] = useState({});

// const handleHoverRating = (fontName, rating) => {
//     setHoveredRating((prev) => ({ ...prev, [fontName]: rating }));
// };

//--------------- in input[checkbox] ------------v
//   hoveredRating[font.name] ? hoveredRating[font.name] >= i + 1
// onMouseEnter={() =>
//     handleHoverRating(font.name, i + 1)
// }
// onMouseLeave={() => {
//     setHoveredRating({});
// }}
