import React from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function TeacherRegisterNavigation({
    currentStep,
    goToPrevStep,
    goToNextStep,
    handleSubmit,
    loading,
    isStepValid,
}) {
    const isCurrentStepValid = isStepValid(currentStep);

    return (
        <div className="step-navigation">
            {currentStep > 1 && (
                <button type="button" onClick={goToPrevStep} className="nav-btn nav-btn-secondary">
                    <FaArrowLeft /> Previous
                </button>
            )}

            <div className="nav-spacer"></div>

            {currentStep < 4 ? (
                <button
                    type="button"
                    onClick={goToNextStep}
                    disabled={!isCurrentStepValid}
                    className="nav-btn nav-btn-primary"
                >
                    Next <FaArrowRight />
                </button>
            ) : (
                <button
                    type="button"
                    disabled={!isCurrentStepValid || loading}
                    onClick={handleSubmit}
                    className="nav-btn nav-btn-submit"
                >
                    {loading ? (
                        <>
                            <div className="spinner-small"></div>
                            Submitting...
                        </>
                    ) : (
                        <>
                            <FaCheckCircle />
                            Submit for Verification
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
