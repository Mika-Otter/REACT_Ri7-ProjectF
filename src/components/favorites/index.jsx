import React, { useState, useEffect } from "react";
import s from "./favorites.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite, deleteFont, toggleFontState } from "../../features/fontsSlice";
import axios from "../../app/api/axios";
import { useNavigate } from "react-router-dom";
import { setChoosedFonts } from "../../features/choosedFontSlide";
import CardFont from "../cardFont";

export default function Favorites() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth.username);
    const fonts = useSelector((state) => state.fonts.value);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const userId = useSelector((state) => state.auth.userId);

    const [ratings, setRatings] = useState({});

    // _HANDLE RATE FAVORITE ______________________________________________________________________________
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

    // _HANDLE FAVORITE ______________________________________________________________________________
    const handleFavorite = (userId, fontId, state) => {
        dispatch(toggleFavorite({ fontId: fontId, favorite: state }));
        sendFavorite(userId, fontId, state);
    };

    const sendFavorite = async (userId, fontId, state) => {
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
            const data = res.data.data;
            data.forEach((favorite) => {
                dispatch(toggleFavorite({ fontId: favorite.fontId, favorite: true }));
            });
            return res.status === 200;
        } catch (err) {
            console.error("FAILED : Try to get all favorites =>, ", err);
        }
    };

    // OTHERS__________________________________________________________________________________

    useEffect(() => {
        const fetchData = async () => {
            await getRate(userId);
            await getFavorites(userId);
            setFontsLoaded(true);
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (fonts.length > 0) {
            setFontsLoaded(true);
        }
    }, [fonts]);

    if (!fontsLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section>
                <div className={s.hey}>
                    <h2>Hey {username}_</h2>
                </div>
                <div className={s.typos}>
                    <h3>Your favorites fonts </h3>
                    <div className={s.favorite__box}>
                        {fonts.map((font, i) =>
                            font.favorite ? (
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
                                                    checked={font.favorite ? font.favorite : false}
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
                                                onChange={() =>
                                                    handleRating(userId, font.id, font.name, i + 1)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
                <div className={s.favorites__typos}>
                    <h3>All your types : </h3>
                    <div className={s.favorite__box}>
                        {fonts.map((font, i) => (
                            <CardFont font={font} key={font.name + i} small={false} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
