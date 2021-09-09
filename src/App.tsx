import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { SharedStateProvider } from "./context/App.context";
import { SharedApp } from "./components/shared-app.tsx/SharedApp";
import "./App.css";
import Header from "./components/header/Header.component";
import { headerTitle } from "./const/strings";

const App = () => {
  initializeIcons();

  return (
    <div className="App">
      <div className="container">
        <Header title={headerTitle} />
        <SharedStateProvider>
          <SharedApp />
        </SharedStateProvider>
      </div>
    </div>
  );
};

export default App;
