import { useState } from "react";

import TestText from "../components/testText";
import Folder from "../components/folder";
import VariableText from "../components/variableText";

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
            <VariableText />
        </>
    );
}
