'use client';
import React from 'react';
import BannerSection from '../banner/demobannercomponent';
import Footer from '../footer/demofootercomponent';
import './layout.module.css';

const Layout = ({ children, globalData }) => {
    return (
        <div className="container">
            <BannerSection />            
            <main className="content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
