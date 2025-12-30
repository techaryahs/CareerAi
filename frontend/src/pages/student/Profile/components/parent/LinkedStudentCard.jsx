import { FaUserGraduate, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import "../styles/parent/LinkedStudentCard.css";

const LinkedStudentCard = ({ user }) => {
    // Assuming the user object has student details if linked
    // In CareerGenAI, parents are linked to students.

    return (
        <div className="stats-card animate-entrance" style={{ animationDelay: '0.1s' }}>
            <div className="card-header">
                <h3><FaUserGraduate /> Linked Student</h3>
            </div>
            <div className="card-body">
                {user?.parentOf && user.parentOf.length > 0 ? (
                    <div className="student-info-summary">
                        <div className="student-basic">
                            <p className="student-name">View details on Dashboard</p>
                            <p className="student-email">Monitoring active progress</p>
                        </div>
                        <button
                            className="btn-action-small"
                            onClick={() => window.location.href = '/parent-dashboard'}
                        >
                            <span>Go to Dashboard</span>
                            <FaArrowRight />
                        </button>
                    </div>
                ) : (
                    <div className="no-data-info">
                        <p>No student linked yet.</p>
                        <p className="sub-text">Redirect to dashboard to manage links.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkedStudentCard;
