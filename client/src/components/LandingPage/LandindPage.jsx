import React from 'react';
import { Link } from 'react-router-dom';
export default function LandindPage() {
  return (
    <div>
      <h1>Welcome to my Food-App</h1>
      <Link to="/home">
        <button>Let´s Start</button>
      </Link>
    </div>
  );
};
