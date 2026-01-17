// App.js
import React from 'react';
import MenuBar from './MenuBar';
import './App.css';
import backgroundImage from './pictures/WhatsAppImage2026-01-17at10.56.27.jpeg';
import backgroundImage2 from './pictures/WhatsAppImage2026-01-17at13.01.37.jpeg';
import backgroundImage3 from './pictures/WhatsAppImage2026-01-17at10.57.29.jpeg';
import backgroundImage4 from './pictures/WhatsAppImage2026-01-17at11.02.29.jpeg';
import decorImage1 from './pictures/Nevtelen-terv-17.png';
import decorImage3 from './pictures/9.png';
import decorImage4 from './pictures/Nevtelen-terv-25.png';
import CountdownTimer from "./CountdownTimer";
import "@fontsource/great-vibes"

const App = () => {

    return (
        <div className="App">
            <MenuBar/>
            <div id="kezdolap">

                <div id="kezdolap-content" style={{backgroundImage: `url(${backgroundImage2})`}}>
                    <div id="kezdolap-content-text">
                        {/*<div className="segment-title">Kezdőlap</div>*/}
                        {/*<img className="decor1" src={decorImage1} alt="Decor Image 1"/>*/}
                        <div>
                            <div className="handwriting">Kata & Marci</div>
                            <span className="generic-text">Szeretettel meghívunk Titeket, hogy együtt ünnepeljük az esküvőnk napját.</span>
                        </div>
                        {/*<img className="decor2" src={decorImage2} alt="Decor Image 2"/>*/}
                    </div>
                </div>
            </div>

            <div id="datum"></div>
            <img className="decor decor3" src={decorImage3} alt="Decor Image 3"/>
            <div id="datum-outer">
                <div className="segment-title handwriting nagy-napon" style={{color: "#446e44"}}>
                    Vegyél részt a nagy napon
                </div>
                {/*<div id="datum-wrapper" style={{backgroundImage: `url(${backgroundImage2})`}}>*/}
                <div id="datum-wrapper">
                    <div className="datum-content">
                        <div className="date-text">
                            {/*<div className="date-generic">VEGYÉL RÉSZT A NAGY NAPON</div>*/}
                            <div className="line-container">
                                <div className="horizontal-line"></div>
                                <div className="actual-date"> 2026. Augusztus 1.</div>
                                <div className="horizontal-line"></div>
                            </div>
                            <div className="date-generic2">Budapest, Mátyás Templom, 15:15</div>
                        </div>
                        <CountdownTimer/> {/* Place the CountdownTimer component here */}
                    </div>
                </div>
            </div>
            <img className="decor decor4" src={decorImage3} alt="Decor Image 4"/>

            <div className="datum-utani-kep" style={{backgroundImage: `url(${backgroundImage4})`}}>
            </div>

            <div id="helyszin"></div>
            <img className="decor decor5" src={decorImage4} alt="Decor Image 5"/>
            <div id="helyszin-outer">
                <div className="segment-title handwriting" style={{color: "#446e44"}}>Helyszín <div className="andsign">&</div> tudnivalók</div>
                <div className="googleForm"><a href="https://docs.google.com/forms/d/11num8gRay2QrTdex9d2vpXKmu4i612bbpIzAhxqAlVY/edit?ts=6696e568"><span className="kLetter"></span>KÉRLEK KATTINTS A KÉRDŐÍV KITÖLTÉSÉHEZ</a></div>
                <div className="helyszin-es-tudnivalok">
                    <div className="helyszin-container">
                        <div className="helyszin-title">
                            Helyszín
                        </div>
                        <div className="helyszin-text">
                            <div className="sub-title">Szertatás:</div>
                            <div className="sub-text">&#8287;&#8287;&#8287;Mátyás Templom <br/> Budapest, Szentháromság tér 2, 1014</div>
                            <div className="sub-title">Vacsora és lagzi:</div>
                            <div className="sub-text">&#8287;&#8287;&#8287;ÖbölHáz Rendezvényközpont, Budapest, Kopaszi-gát 2. 1117</div>
                        </div>
                    </div>
                    <div className="helyszin-container">
                        <div className="helyszin-title">
                            Tudnivalók
                        </div>
                        <div className="helyszin-text">
                            <div className="sub-title">Kezdés:</div>
                            <div className="sub-text kezdes" style={{marginBottom: "2.9rem"}}>&#8287;&#8287;&#8287;15:15
                            </div>
                            <div className="sub-title">Szállás:</div>
                            <div className="sub-text">&#8287;&#8287;&#8287;Szállás a Radisson Hotel Budapest Budapartban elérhető.
                            </div>
                        </div>
                    </div>
                    <img className="decor decor6" src={decorImage4} alt="Decor Image 6"/>
                </div>
                <br/>
                <div className="hivd-volegenyt" >Kérlek hívd a vőlegényt
                    (+36 30 316 5634) vagy a menyasszonyt (+36 20 291 2555), ha igényt tartanál a helyszínen szállásra.
                </div>
            </div>


            <div className="helyszin-utani-kep" style={{backgroundImage: `url(${backgroundImage3})`}}>
            </div>

            {/*<div className="datum-utani-kep" style={{backgroundImage: `url(${backgroundImage3})`}}>*/}
            {/*</div>*/}
            {/*<div id="program">*/}
            {/*    <div className="segment-title handwriting">Fontos tudnivalók</div>*/}
            {/*</div>*/}
            {/* Add more sections as needed */}
        </div>
    );
};

export default App;