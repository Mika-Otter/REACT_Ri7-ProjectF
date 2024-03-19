import React from "react";
import s from "./home.module.scss";
import TestText from "../../components/testText";
import PropTypes from "prop-types";
import Folder from "../../components/folder";

export default function Home({ choosedFonts }) {
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
                <Folder />
                <TestText />
            </section>
        </>
    );
}

Home.propTypes = {
    choosedFonts: PropTypes.array.isRequired,
};
