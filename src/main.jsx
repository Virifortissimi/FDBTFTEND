import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5012').replace(/\/$/, '');
const fallbackStartAt = '2026-06-01T00:00:00+01:00';
const foodbotLogoColored = 'https://res.cloudinary.com/virifortissimi/image/upload/e_trim/c_scale,w_320/v1780138048/Foodbot/logo-colored.png';
const foodbotIconColored = 'https://res.cloudinary.com/virifortissimi/image/upload/v1780138049/Foodbot/favicon-colored.png';

const initialForm = {
  name: '',
  email: '',
  location: '',
  role: '',
  device: '',
  nutritionGoal: '',
  availability: '',
  whyJoin: ''
};

function getTimeLeft(targetDate) {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, finished: diff === 0 };
}

function App() {
  const [status, setStatus] = useState({
    name: 'FoodBot Beta',
    startAt: fallbackStartAt,
    message: 'Apply now to help shape FoodBot before public launch.'
  });
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date(fallbackStartAt)));
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const targetDate = useMemo(() => new Date(status.startAt || fallbackStartAt), [status.startAt]);
  const bannerVisible = submitState.status === 'success' || submitState.status === 'error';

  useEffect(() => {
    let cancelled = false;

    fetch(`${apiBaseUrl}/api/v1/beta/status`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load beta status')))
      .then((payload) => {
        if (!cancelled && payload?.success && payload.data) {
          setStatus(payload.data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus((current) => current);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetDate));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitApplication(event) {
    event.preventDefault();
    setSubmitState({ status: 'submitting', message: 'Sending your application...' });

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/beta/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          location: form.location,
          role: form.role,
          device: form.device,
          nutritionGoal: form.nutritionGoal,
          availability: form.availability,
          whyJoin: form.whyJoin
        })
      });
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        const message = payload?.errors?.[0] || 'We could not submit the application. Please check the form and try again.';
        setSubmitState({ status: 'error', message });
        return;
      }

      setForm(initialForm);
      setSubmitState({
        status: 'success',
        message: payload?.data?.message || 'Application received. We will review it and follow up by email.'
      });
    } catch {
      setSubmitState({ status: 'error', message: 'The beta API is not reachable right now. Please try again shortly.' });
    }
  }

  const countdownItems = [
    ['Days', timeLeft.days],
    ['Hours', timeLeft.hours],
    ['Minutes', timeLeft.minutes],
    ['Seconds', timeLeft.seconds]
  ];

  return (
    <main className="page-shell">
      {bannerVisible && (
        <div className={`status-banner ${submitState.status}`} role={submitState.status === 'error' ? 'alert' : 'status'}>
          <div>
            <strong>{submitState.status === 'success' ? 'Application sent' : 'Submission failed'}</strong>
            <span>{submitState.message}</span>
          </div>
          <button
            className="status-banner-close"
            type="button"
            aria-label="Dismiss message"
            onClick={() => setSubmitState({ status: 'idle', message: '' })}
          >
            Close
          </button>
        </div>
      )}

      <section className="hero-panel">
        <div className="brand-lockup">
          <img className="brand-logo" src={foodbotLogoColored} alt="FoodBot" />
          <span className="brand-beta-pill">Beta</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Beta testing starts June 1</p>
            <h1 className="hero-title">
              <span>Be the first</span>
              <em>inside FoodBot.</em>
            </h1>
            <p className="lede">
              Get early access before public launch and help tune the meal planning, nutrition insights, and recipe chat experience in real use.
            </p>

            <div className="countdown" aria-label="Countdown to beta start">
              {countdownItems.map(([label, value]) => (
                <div className="count-card" key={label}>
                  <strong>{String(value).padStart(2, '0')}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p className="launch-note">
              {timeLeft.finished ? 'The beta window is open. Applications are still welcome.' : status.message}
            </p>
          </div>

          <aside className="preview-panel" aria-label="FoodBot beta preview">
            <div className="meal-card meal-card-large">
              <span className="pill">Beta focus</span>
              <h2>Personal meal planning</h2>
              <p>Test plan quality, local food suggestions, shopping flow, and coaching prompts.</p>
              <div className="macro-row">
                <span>Protein 82g</span>
                <span>Fiber 31g</span>
                <span>Water 2.1L</span>
              </div>
            </div>
            <div className="mini-stack">
              <div className="meal-card">
                <span>Recipe Chat</span>
                <strong>12 prompts ready</strong>
              </div>
              <div className="meal-card">
                <span>Meal Plan</span>
                <strong>7 days mapped</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="application-section">
        <div className="section-copy">
          <p className="eyebrow">Apply for access</p>
          <h2>Tell us how you would test FoodBot.</h2>
          <p>
            We are looking for people who will use it seriously, report friction clearly, and help us understand what should improve before launch.
          </p>
        </div>

        <form className="application-form" onSubmit={submitApplication}>
          <div className="field-grid">
            <label>
              Full name
              <input name="name" value={form.name} onChange={updateField} autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required />
            </label>
            <label>
              Location
              <input name="location" value={form.location} onChange={updateField} placeholder="City, country" required />
            </label>
            <label>
              Role
              <select name="role" value={form.role} onChange={updateField}>
                <option value="">Select one</option>
                <option>Everyday user</option>
                <option>Fitness enthusiast</option>
                <option>Nutrition professional</option>
                <option>Personal trainer</option>
                <option>Health coach</option>
              </select>
            </label>
            <label>
              Primary device
              <select name="device" value={form.device} onChange={updateField}>
                <option value="">Select one</option>
                <option>Android phone</option>
                <option>iPhone</option>
                <option>Desktop web</option>
                <option>Tablet</option>
              </select>
            </label>
            <label>
              Availability
              <select name="availability" value={form.availability} onChange={updateField}>
                <option value="">Select one</option>
                <option>15 minutes daily</option>
                <option>30 minutes daily</option>
                <option>A few times weekly</option>
                <option>Weekend testing</option>
              </select>
            </label>
          </div>

          <label>
            Nutrition goal
            <input name="nutritionGoal" value={form.nutritionGoal} onChange={updateField} placeholder="Weight loss, muscle gain, better planning..." />
          </label>

          <label>
            Why do you want to join the beta?
            <textarea name="whyJoin" value={form.whyJoin} onChange={updateField} rows="5" required />
          </label>

          <button type="submit" disabled={submitState.status === 'submitting'}>
            {submitState.status === 'submitting' ? 'Submitting...' : 'Apply for beta access'}
          </button>

          {submitState.status === 'submitting' && (
            <p className="form-message submitting" role="status">{submitState.message}</p>
          )}
        </form>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
