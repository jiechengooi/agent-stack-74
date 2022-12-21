import React from 'react';
import Header from './Headers';
import Footer from './Footer';
import '../scss/style.scss';

const Layout = props => (
  <>
    <div className={`page${props.bodyClass ? ` ${props.bodyClass}` : ''}`}>
      <div id="wrapper" className="wrapper">
        <Header />
        {props.children}
      </div>
      <Footer />
      {/* <SubFooter /> */}
    </div>
  </>
);

export default Layout;