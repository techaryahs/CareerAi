import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaQrcode, FaCopy, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PaymentRedirection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { teacher, booking } = location.state || {};

    if (!teacher || !booking) {
        return <div className="p-10 text-center">Invalid session. Please book again.</div>;
    }

    const upiId = teacher.paymentInfo?.upiId || "Not Provided";
    const paymentLink = teacher.paymentInfo?.paymentLink;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-slate-200"
            >
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaQrcode size={30} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-800">Final Step: Payment</h1>
                    <p className="text-slate-500">Pay directly to <span className="font-bold text-blue-600">{teacher.fullName}</span></p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100">
                    <div className="flex justify-between mb-2">
                        <span className="text-slate-500 text-sm">Amount to Pay:</span>
                        <span className="font-black text-slate-800">₹{booking.classMode === 'online' ? teacher.onlinePrice : teacher.offlinePrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">Class Type:</span>
                        <span className="font-bold text-slate-700 capitalize">{booking.classMode}</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">UPI ID</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value={upiId}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold"
                            />
                            <button
                                onClick={() => copyToClipboard(upiId)}
                                className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200"
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>

                    {paymentLink && (
                        <a
                            href={paymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-blue-600 text-white text-center font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all"
                        >
                            Pay via Link
                        </a>
                    )}
                </div>

                <div className="bg-amber-50 rounded-xl p-4 flex gap-3 border border-amber-100 mb-8">
                    <FaExclamationTriangle className="text-amber-500 mt-1" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                        After payment, please take a screenshot for your records. Your class is already marked as <strong>Pending</strong> in your history.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/history')}
                    className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all"
                >
                    Go to My History
                </button>
            </motion.div>
        </div>
    );
};

export default PaymentRedirection;
