'use client';

import { useMemo, useState } from 'react';
import styles from '../css/ageyearoverlay.module.css';

export default function AgeYearOverlay() {
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const currentYear = new Date().getFullYear();
  const maxLegalYear = useMemo(() => currentYear - 21, [currentYear]); // year-only gate

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    const y = parseInt(year, 10);
    if (isNaN(y) || y < 1900 || y > currentYear) {
      setError('Enter a valid birth year.');
      return;
    }
    if (currentYear - y < 21) {
      setError('Access restricted to 21+ only.');
      return;
    }
    // Ask server to set secure HttpOnly cookie
    const res = await fetch('/api/age/verify', { method: 'POST' });
    if (res.ok) {
      location.reload(); // SSR will see the cookie and not render the overlay
    } else {
      setError('Unable to verify at the moment. Please try again.');
    }
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className={styles.card}>
        <h2 id="age-title" className={styles.title}>Age Verification</h2>
        <p className={styles.subtitle}>Enter birth year to continue</p>
        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            Birth year
            <input
              className={styles.input}
              type="number"
              inputMode="numeric"
              min="1900"
              max={String(currentYear)}
              placeholder={String(maxLegalYear)}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.cta}>Continue</button>
        </form>
        <p className={styles.note}>Confirmation is given that the legal drinking age has been met.</p>
      </div>
    </div>
  );
}
