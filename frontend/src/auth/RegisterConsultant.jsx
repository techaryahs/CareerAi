import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const STEPS = ["Account", "Profile", "Availability"];

const RegisterConsultant = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: ''
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        body {
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          background: #eef2f7;
        }

        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .card {
          width: 100%;
          max-width: 720px;
          background: #f8fafc;
          border-radius: 22px;
          padding: 32px 36px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          position: relative;
        }

        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 22px 22px 0 0;
          background: linear-gradient(90deg, #6366f1, #ec4899);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
        }

        .title span {
          background: linear-gradient(90deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f1f5f9;
          cursor: pointer;
          font-size: 18px;
        }

        /* Stepper */
        .steps {
          display: flex;
          align-items: center;
          margin: 28px 0;
        }

        .step {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          background: #e5e7eb;
          color: #6b7280;
        }

        .circle.active {
          background: #6366f1;
          color: #fff;
        }

        .label {
          margin-left: 8px;
          font-size: 12px;
          letter-spacing: 0.05em;
          color: #9ca3af;
        }

        .label.active {
          color: #6366f1;
        }

        .line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
          margin: 0 10px;
        }

        /* Form */
        .section-title {
          font-size: 14px;
          margin-bottom: 10px;
          color: #374151;
        }

        .input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #fff;
          margin-bottom: 14px;
          font-size: 14px;
          outline: none;
        }

        .input:focus {
          border-color: #6366f1;
        }

        /* Button */
        .btn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: none;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(90deg, #6366f1, #6366f1);
          box-shadow: 0 6px 16px rgba(99,102,241,0.4);
          transition: 0.2s;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        /* Responsive */
        @media (max-width: 600px) {
          .card {
            padding: 24px;
          }

          .title {
            font-size: 22px;
          }

          .steps {
            flex-direction: column;
            gap: 10px;
          }

          .step {
            justify-content: flex-start;
          }

          .line {
            display: none;
          }
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="top-bar" />

          <div className="header">
            <div className="title">
              Register as a <span>Consultant</span>
            </div>
            <button className="close-btn" onClick={() => navigate('/')}>
              ×
            </button>
          </div>

          {/* Stepper */}
          <div className="steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className="step">
                  <div className={`circle ${i === step ? 'active' : ''}`}>
                    {i + 1}
                  </div>
                  <div className={`label ${i === step ? 'active' : ''}`}>
                    {s.toUpperCase()}
                  </div>
                </div>
                {i < STEPS.length - 1 && <div className="line" />}
              </React.Fragment>
            ))}
          </div>

          {/* FORM */}
          {step === 0 && (
            <>
              <div className="section-title">Account Details</div>

              <input className="input" name="name" placeholder="Full Name" onChange={handleChange} />
              <input className="input" name="email" placeholder="Email Address" onChange={handleChange} />
              <input className="input" type="password" name="password" placeholder="Password" onChange={handleChange} />
              <input className="input" name="role" placeholder="Your Role (e.g. Career Coach)" onChange={handleChange} />

              <button className="btn" onClick={() => setStep(1)}>
                Continue →
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterConsultant;