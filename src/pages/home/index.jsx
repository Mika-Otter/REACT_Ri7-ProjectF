import React from "react";
import s from "./home.module.scss";
import TestText from "../../../components/testText";
import PropTypes from "prop-types";

export default function Home({ fonts, choosedFonts }) {
    return (
        <>
            <section>
                <div className={s.hey}>
                    {/* <h2>Hey {username}_</h2> */}
                    <h1>Yes man</h1>
                </div>
                <div className={s.favorites__typos}>
                    {/* for each typo favorites */}
                    <div className={s.favorite}>
                        <div className={s.favorite__wrapper}>
                            <div className={s.favorite__wrapper__text}>
                                {/* <span>{font.name}</span> */}
                            </div>
                            <div className={s.favorite__wrapper__note}>{/* rating squares */}</div>
                        </div>
                        {/* <span>{font.name}</span> */}
                    </div>
                </div>
                <TestText fonts={fonts} choosedFonts={choosedFonts} />
            </section>
        </>
    );
}

Home.propTypes = {
    fonts: PropTypes.array.isRequired,
    choosedFonts: PropTypes.array.isRequired,
};
