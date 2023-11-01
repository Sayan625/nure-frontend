import React from 'react';
import NavBar from './Navbar';
import Footer from './Footer';

const PageLayout = ({ page }) => {
  return (
    <div className="h-100 d-flex justify-content-between flex-column" style={{ overflowY: "scroll" }}>
      {/* Display the navigation bar */}
      <NavBar />
      
      {/* Display the content of the page passed as a prop */}
      {page}
      
      {/* Display the footer */}
      <Footer />
    </div>
  );
};

export default PageLayout;
