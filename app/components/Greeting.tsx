// src/components/Greeting.tsx
import React from 'react';

interface GreetingProps {
  name?: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div>
      {name ? (
        <h1>Hello, {name}!</h1>
      ) : (
        <p>Hello, Guest!</p>
      )}
      <button>Click Me</button>
    </div>
  );
};

export default Greeting;