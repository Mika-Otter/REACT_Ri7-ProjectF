import React, { useEffect, useState } from "react";
import s from "./cardfont.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "../../app/api/axios";
import { toggleFavorite, deleteFont, toggleFontState } from "../../features/fontsSlice";
import { setChoosedFonts } from "../../features/choosedFontSlide";
import TrashIcone from "../SVG/trash";
import VariableIcone from "../SVG/variable";
import FontTestIcone from "../SVG/fonttest";
import WatchIcone from "../SVG/watch";

export default function CardFont({ font, small, i }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const username = useSelector((state) => state.auth.username);
    const fonts = useSelector((state) => state.fonts.value);
    const choosedFonts = useSelector((state) => state.choosedFonts.value);
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

    // DELETE FONTS____________________________________________________________________________
    const deleteFonts = async (fontId) => {
        try {
            dispatch(deleteFont(fontId));
            const res = await axios.post("/fonts/delete", { fontId });
            return res.status === 200;
        } catch (err) {
            console.error("FAILED : Try to delete typo => ", err);
        }
    };

    // GO TO _________(can be update in one function ?)___________________________________________________________________
    const gotoTest = (fontId) => {
        //select and add the selected font to choosedfonts before go to /fontest
        const selectedFont = fonts.find((font) => font.id === fontId);
        if (!selectedFont.checked) {
            dispatch(toggleFontState({ fontName: selectedFont.name }));
            dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
        }
        navigate("/fonttest");
    };

    const gotoVariable = (fontId) => {
        //select and add the selected font to choosedfonts before go to /variable
        const selectedFont = fonts.find((font) => font.id === fontId);
        if (!selectedFont.checked) {
            dispatch(toggleFontState({ fontName: selectedFont.name }));
            dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
        }
        navigate("/variable");
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
            <div className={s.favorite} key={font.name + i}>
                <div className={s.favorite__box}>
                    <div className={s.checkbox__ctn}>
                        <input
                            className={s.checkbox__fav}
                            type="checkbox"
                            checked={font.favorite ? font.favorite : false}
                            onChange={(e) => handleFavorite(userId, font.id, e.target.checked)}
                        />
                        {font.favorite ? (
                            <img
                                className={s.checkbox__img}
                                src="./assets/icones/favorite-active.png"
                            />
                        ) : (
                            <img
                                className={s.checkbox__img}
                                src="./assets/icones/favorite-inactive.png"
                            />
                        )}
                    </div>
                    <div className={s.favorite__ctn}>
                        <div className={s.favorite__ctn__wrapper}>
                            <span style={{ fontFamily: font.name }}>{font.name}</span>
                        </div>
                    </div>
                    <div className={s.tools}>
                        <button type="button">
                            <WatchIcone />
                        </button>
                        <button
                            className={s.fonttest}
                            type="button"
                            onClick={() => gotoTest(font.id)}
                        >
                            <FontTestIcone />
                        </button>
                        <button type="button" onClick={() => gotoVariable(font.id)}>
                            <VariableIcone />
                        </button>
                    </div>
                </div>
                <div className={s.rate}>
                    <div className={s.rate__trash} onClick={() => deleteFonts(font.id)}>
                        <TrashIcone />
                    </div>
                    <div className={s.rate__note}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <input
                                key={font.name + i}
                                type="checkbox"
                                checked={ratings[font.name] >= i + 1}
                                onChange={() => handleRating(userId, font.id, font.name, i + 1)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

CardFont.propTypes = {
    font: PropTypes.object.isRequired,
    i: PropTypes.node.isRequired,
    small: PropTypes.bool.isRequired,
};
