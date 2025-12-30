import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import "../styles/teacher/TeacherRegisterSteps.css";

const STEPS = [
    { id: 1, label: "Profile" },
    { id: 2, label: "Teaching Details" },
    { id: 3, label: "Pricing" },
    { id: 4, label: "Availability" },
];

export default function TeacherRegisterHeader({ currentStep, goToStep }) {
    return (
        <div className="register-header-sticky">
            <div className="register-max-width">
                <div className="header-content-register">
                    <h1 className="register-title-modern">
                        <FaGraduationCap className="title-icon-register" />
                        Become a Teacher
                    </h1>
                    <p className="register-subtitle-modern">
                        Join CareerGenAI and help students achieve their goals
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="progress-steps">
                    {STEPS.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div
                                className={`step ${currentStep >= step.id ? "active" : ""} ${currentStep === step.id ? "current" : ""
                                    }`}
                                onClick={() => goToStep(step.id)}
                            >
                                <div className="step-number">{step.id}</div>
                                <span className="step-label">{step.label}</span>
                            </div>
                            {index < STEPS.length - 1 && <div className="step-line"></div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
