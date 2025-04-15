
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

interface VersionInfoHeaderProps {
  currentDateTime: {
    date: string;
    time: string;
    iso: string;
  };
}

const VersionInfoHeader = ({ currentDateTime }: VersionInfoHeaderProps) => {
  return (
    <div className="mb-8">
      <Link to="/" className="inline-flex items-center text-sapp-blue hover:text-sapp-blue/80 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mt-4 mb-2">Version Information</h1>
      <p className="text-sapp-gray max-w-3xl">
        Technical information about the SAPP Security website versions and builds.
        <span className="block mt-2 text-sm">
          <Clock className="inline h-4 w-4 mr-1" /> 
          Information collected: {currentDateTime.date} at {currentDateTime.time}
        </span>
      </p>
    </div>
  );
};

export default VersionInfoHeader;
