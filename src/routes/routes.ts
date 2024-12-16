import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Element={<Login />} />
        <Route path="/signup" Element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
