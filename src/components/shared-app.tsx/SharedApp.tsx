import { BrowserRouter } from "react-router-dom";

import { headerTitle } from "../../const/strings";

import Header from "../header/Header.component";

import { AnimatedSwitch } from "./Animated.componet";

export const SharedApp = () => {
  return (
    <div className="container">
      <Header title={headerTitle} />
      <BrowserRouter>
        <AnimatedSwitch />
      </BrowserRouter>
    </div>
  );
};
