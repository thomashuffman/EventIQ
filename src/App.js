import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to EventIQ</h1>
        <p>Stay in the loop with all your group events!</p>
      </header>
      <main className="app-main">
        <h2>Join a Group, Stay Updated!</h2>
        <p>Sign up for groups, and get notifications about upcoming events.</p>
        <button className="cta-button">Get Started</button>
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 GroupApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
