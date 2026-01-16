import React, { useState, useEffect } from 'react';
import './countdownTimer.css'; // Create this file for styling if needed

const CountdownTimer = () => {
    // Define the target date (October 5, 2024)
    const targetDate = new Date('2026-08-01T15:15:00');

    // Define state variables to store remaining time
    const [remainingDays, setRemainingDays] = useState(0);
    const [remainingHours, setRemainingHours] = useState(0);
    const [remainingMinutes, setRemainingMinutes] = useState(0);

    // Calculate remaining time and update state variables
    const calculateTimeRemaining = () => {
        const now = new Date();
        const difference = targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setRemainingDays(days);
        setRemainingHours(hours);
        setRemainingMinutes(minutes);
    };

    // Update the countdown every second
    useEffect(() => {
        const intervalId = setInterval(calculateTimeRemaining, 1000);
        return () => clearInterval(intervalId);
    }, []);

    // Render the countdown timer
    return (
        <div className="countdown-timer">
            <div className="timer-item">
                <span className="timer-value">{remainingDays}</span>
                <span className="timer-label">Nap</span>
            </div>
            <div className="timer-item">
                <span className="timer-value">{remainingHours}</span>
                <span className="timer-label">Óra</span>
            </div>
            <div className="timer-item">
                <span className="timer-value">{remainingMinutes}</span>
                <span className="timer-label">Perc</span>
            </div>
        </div>
    );
};

export default CountdownTimer;
