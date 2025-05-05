// src/App.tsx

import React from 'react';
import Quiz from './components/Quiz'; // ✅ .tsx хаяг авсан

const App: React.FC = () => {
  return (
    <div>
      <Quiz />
    </div>
  );
};

export default App;
