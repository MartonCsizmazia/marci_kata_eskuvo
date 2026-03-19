import React, { useState, useEffect } from 'react';
import './menuBar.scss';

const MenuBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClick = (e) => {
            const dropdown3 = document.getElementById('dropdown-3');
            const dropdownVisible = document.getElementById('dropdown-visible-text');

            // Check if the click occurred on the icon
            if (dropdownVisible.contains(e.target)) {
                // Toggle the 'close' class to rotate the icon
                dropdown3.classList.toggle('close');
                // Toggle dropdown open state
                setDropdownOpen(!dropdownOpen);
            } else {
                // Click occurred outside the dropdown, remove the 'close' class to reset the icon position
                dropdown3.classList.remove('close');
                // Close dropdown
                setDropdownOpen(false);
            }
        };

        // Add event listener for clicks on the document body
        document.body.addEventListener('click', handleClick);

        // Remove event listener when component unmounts
        return () => {
            document.body.removeEventListener('click', handleClick);
        };
    }, [dropdownOpen]); // Re-run effect when dropdownOpen state changes

    const scrollToSection = (id, e) => {
        e.preventDefault();
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="menu">
            <div className="menu-button" onClick={(e) => scrollToSection('kezdolap', e)}><a>Kezdőlap</a></div>
            <div className="menu-button" onClick={(e) => scrollToSection('datum', e)}><a>Dátum</a></div>
            <div className="menu-button" onClick={(e) => scrollToSection('helyszin', e)}><a>Helyszín & tudnivalók</a></div>
            {/*<div className="menu-button" onClick={(e) => scrollToSection('program', e)}><a>Fontos Tudnivalók</a></div>*/}
            {/* Add more menu items as needed */}

            <div className="mobile-dropdown">
                <div id="dropdown-visible-text">
                    <a className="dropdown-title">Menü</a>
                    <div id="icon-3" className="icon">
                        <div id="dropdown-3" className="dropdown"></div>
                    </div>
                </div>

                <div className={`dropdown-content ${dropdownOpen ? 'open' : ''}`}>
                    <div className="dropdown-item" onClick={(e) => scrollToSection('kezdolap', e)}><a>Kezdőlap</a></div>
                    <div className="dropdown-item" onClick={(e) => scrollToSection('datum', e)}><a>Dátum</a></div>
                    <div className="dropdown-item" onClick={(e) => scrollToSection('helyszin', e)}><a>Helyszín & tudnivalók</a></div>
                    {/*<div className="dropdown-item" onClick={(e) => scrollToSection('program', e)}><a>Fontos Tudnivalók</a></div>*/}
                </div>
            </div>
        </div>
    );
};

export default MenuBar;
