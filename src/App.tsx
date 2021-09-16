import { initializeIcons } from "@fluentui/font-icons-mdl2";
import Header from "./components/header/Header.component";
import { headerTitle } from "./const/strings";
import { AppRouter } from "./components/AppRouter";

import "./App.css";

const App = () => {
  initializeIcons();

  return (
    <div className="App">
      <div className="container">
        <Header title={headerTitle} />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
