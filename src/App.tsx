// src/App.tsx
import React from "react";
import PaginatedList from "./components/PaginatedList";

const App: React.FC = () => {
  return (
    <div>
      <h1>Paginated List from Fake API</h1>
      <PaginatedList />
    </div>
  );
};

export default App;
