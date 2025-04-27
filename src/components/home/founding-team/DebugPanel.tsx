
import React from 'react';

interface DebugPanelProps {
  imageLoadState: {
    railiDefault: boolean;
    markoDefault: boolean;
  };
  inView: boolean;
  founders: Array<{ name: string; image: string; }>;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ imageLoadState, inView, founders }) => {
  return (
    <div className="mt-6 p-3 bg-gray-100 text-xs rounded-md max-w-4xl mx-auto">
      <h4 className="font-bold mb-2">Debug Information</h4>
      <p>Image load states: {JSON.stringify(imageLoadState)}</p>
      <p>Section in view: {String(inView)}</p>
      <p className="font-bold mt-2">Image paths:</p>
      <ul className="space-y-1">
        <li>Raili default: {founders[0].image}</li>
        <li>Marko default: {founders[1].image}</li>
      </ul>
    </div>
  );
};
