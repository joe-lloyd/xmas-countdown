"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Snowfall from '@/app/components/SnowFall';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number | null;
    hours: number | null;
    minutes: number | null;
    seconds: number | null;
  }>({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    const countdownDate = new Date("December 25, 2024 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run once immediately

    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <Snowfall />
    <main className={styles.container}>
      <h1 className={styles.title}>
        🎄 <span>Christmas <br /> Countdown</span> 🎅
      </h1>
      <div className={styles.countdown}>
        <div className={styles.timeBox}>
          <span>
            {timeLeft.days !== null ? timeLeft.days : <div className={styles.loader}></div>}
          </span>
          <label className={styles.label}>Days</label>
        </div>
        <div className={styles.timeBox}>
          <span>
            {timeLeft.hours !== null ? timeLeft.hours : <div className={styles.loader}></div>}
          </span>
          <label className={styles.label}>Hours</label>
        </div>
        <div className={styles.timeBox}>
          <span>
            {timeLeft.minutes !== null ? timeLeft.minutes : <div className={styles.loader}></div>}
          </span>
          <label className={styles.label}>Min</label>
        </div>
        <div className={styles.timeBox}>
          <span>
            {timeLeft.seconds !== null ? timeLeft.seconds : <div className={styles.loader}></div>}
          </span>
          <label className={styles.label}>Sec</label>
        </div>
      </div>
    </main>
    </>
  );
}
