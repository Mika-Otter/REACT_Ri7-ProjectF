import { useState } from "react";

import TestText from "../components/testText";
import Folder from "../components/folder";

export default function App() {
    const [fonts, setFonts] = useState([]);
    const [choosedFonts, setChoosedFonts] = useState([]);

    return (
        <>
            <TestText fonts={fonts} choosedFonts={choosedFonts} />
            <Folder
                fonts={fonts}
                setFonts={setFonts}
                choosedFonts={choosedFonts}
                setChoosedFonts={setChoosedFonts}
            />
        </>
    );
}
