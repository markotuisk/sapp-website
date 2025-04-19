
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
      <img 
        src="/favicon/favicon-180x180.png" 
        alt="SAPP Security Logo" 
        width="48"
        height="48"
        className="transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3"
      />
      <div className="flex flex-col transition-all duration-300 group-hover:translate-x-1">
        <span className="font-display font-bold text-xl text-sapp-dark">
          SAPP <span className="text-sapp-blue">Security</span>
        </span>
        <span className="text-xs text-sapp-gray leading-tight">Security and Privacy Partners</span>
      </div>
    </Link>
  );
};

export default Logo;
