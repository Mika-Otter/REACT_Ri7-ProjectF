import React from "react";
import s from "../pages.module.scss";
import Folder from "../../components/Folder/Folder";
import Menu from "../../components/Menu/Menu";
import Variable from "../../components/Variable/Variable";

export default function VariablePage() {
  return (
    <>
      <section>
        <Menu />
        <div className={s.content}>
          <Variable />
        </div>
        <Folder />
      </section>
    </>
  );
}
