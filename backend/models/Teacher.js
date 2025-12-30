const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
}, { _id: false });

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Professional Details - Store both IDs and Names
    experienceYears: { type: Number, required: true },
    bio: { type: String, required: true },

    // Teaching Field (e.g., {fieldId: "eng", fieldName: "Engineering"})
    teachingField: {
        fieldId: { type: String, required: true },
        fieldName: { type: String, required: true }
    },

    // Program/Degree (e.g., {programId: "cse", programName: "Computer Science & Engineering"})
    program: {
        programId: { type: String, required: true },
        programName: { type: String, required: true }
    },

    // Subjects - Store actual subject names (e.g., ["Algebra", "Calculus"])
    selectedSubjects: [{ type: String, required: true }],

    // Teaching Mode & Pricing
    teachingMode: {
        type: String,
        enum: ['online', 'offline', 'both'],
        required: true
    },
    onlinePrice: {
        type: Number,
        required: function () {
            return this.teachingMode === 'online' || this.teachingMode === 'both';
        }
    },
    offlinePrice: {
        type: Number,
        required: function () {
            return this.teachingMode === 'offline' || this.teachingMode === 'both';
        }
    },
    offlineLocation: {
        type: String,
        required: function () {
            return this.teachingMode === 'offline' || this.teachingMode === 'both';
        }
    },

    // Availability
    slots: [slotSchema],

    // Documents (Cloudinary URLs)
    qualificationFile: { type: String },
    idProofFile: { type: String },

    // Status
    isVerified: { type: Boolean, default: false }, // Profile approval
    isPremium: { type: Boolean, default: false },

    // Payment Info
    paymentInfo: {
        upiId: { type: String },
        paymentLink: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
