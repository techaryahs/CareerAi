import React from 'react';
import { FaClock, FaHistory } from 'react-icons/fa';
import '../styles/teacher/AvailabilitySlots.css';

const AvailabilitySlots = ({ teacher }) => {
    const slots = teacher.slots || [];

    return (
        <div className="card-v3 availability-slots-v4 animate-entrance" style={{ animationDelay: '0.4s' }}>
            <h2 className="slots-title-v4" style={{ fontSize: '18px', marginBottom: '16px' }}>
                <FaClock /> Availability
            </h2>

            <div className="slots-grid-v4" style={{ gap: '10px' }}>
                {slots.length > 0 ? (
                    slots.map((slot, index) => (
                        <div key={index} className="slot-item-v4" style={{ padding: '12px', background: 'var(--border-subtle)' }}>
                            <span className="slot-day-v4" style={{ fontSize: '12px' }}>{slot.day}</span>
                            <div className="slot-time-v4" style={{ fontSize: '11px' }}>
                                <FaHistory /> {slot.startTime} - {slot.endTime}
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'var(--text-sub)', fontSize: '13px' }}>Schedule yet to be defined.</p>
                )}
            </div>
        </div>
    );
};

export default AvailabilitySlots;
