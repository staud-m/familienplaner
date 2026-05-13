import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ShoppingList from "./modules/shopping/ShoppingList";

function App() {
  const [activeItemsCount, setActiveItemsCount] = useState(0);

  return (
    <div className="app-shell">
      <Sidebar activeItemsCount={activeItemsCount} />

      <main className="main-area">
        <ShoppingList onActiveCountChange={setActiveItemsCount} />
      </main>
    </div>
  );
}

export default App;
