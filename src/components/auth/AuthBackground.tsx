
import React from 'react';

const AuthBackground: React.FC = () => {
  return (
    <>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gryt-blue/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gryt-blue/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gryt-purple/10 to-transparent rounded-full blur-3xl"></div>
    </>
  );
};

export default AuthBackground;
