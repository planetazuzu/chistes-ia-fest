
import React from 'react';

interface JokeCounterProps {
  count: number;
}

const JokeCounter = ({ count }: JokeCounterProps) => {
  return (
    <div className="text-sm text-gray-500 mt-6">
      Chistes mostrados: <span className="font-semibold">{count}</span>
    </div>
  );
};

export default JokeCounter;
