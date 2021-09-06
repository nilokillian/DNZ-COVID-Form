import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { SharedStateProvider } from "./context/App.context";
import { SharedApp } from "./components/shared-app.tsx/SharedApp";
import "./App.css";

const App = () => {
  initializeIcons();

  return (
    <div className="App">
      <SharedStateProvider>
        <SharedApp />
      </SharedStateProvider>
    </div>
  );
};

export default App;
