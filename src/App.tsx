// src/App.tsx
import React from 'react';

interface Props {
  title?: string;
}

const App: React.FC<Props> = ({ title = 'React App' }) => {
  return (
    <div>
      This is my water tracker app
    </div>
  );
};

export default App;