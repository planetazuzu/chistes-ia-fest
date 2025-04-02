
import React from 'react';

interface VisitCounterProps {
  visits: number;
}

const VisitCounter = ({ visits }: VisitCounterProps) => {
  return (
    <div className="text-sm text-gray-500 mt-2">
      Visitas totales: <span className="font-semibold">{visits}</span>
    </div>
  );
};

export default VisitCounter;
