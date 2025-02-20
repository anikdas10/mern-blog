import React from 'react';

const Footer = () => {
    return (
      <div className="text-sm text-center">
        © CopyRight {new Date().getFullYear()} All rights reserved By{" "}
        <span className='font-bold'>Anik Das</span>
      </div>
    );
};

export default Footer;