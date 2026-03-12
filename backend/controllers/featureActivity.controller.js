const FeatureActivity = require("../models/featureActivity");

/* =====================================================
   1. LOG FEATURE ACTIVITY
===================================================== */
exports.logFeatureActivity = async (req, res) => {
    try {
        const { featureType, title, description, meta, duration, score, status } =
            req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Map role → Mongo model
        let userModel = "User";
        if (req.user.role === "teacher") userModel = "Teacher";
        if (req.user.role === "consultant") userModel = "Consultant";

        const activity = await FeatureActivity.create({
            userId: req.user._id,
            userModel,
            role: req.user.role || "student",
            featureType,
            title,
            description,
            meta: meta || {},
            duration: duration || 0,     // in seconds
            score: score || null,        // optional
            status: status || "Completed",
        });

        res.status(201).json({
            success: true,
            message: "Activity logged successfully",
            data: activity,
        });
    } catch (error) {
        console.error("Error in logFeatureActivity:", error);
        res.status(500).json({
            success: false,
            message: "Error logging feature activity",
            error: error.message,
        });
    }
};

/* =====================================================
   2. GET MY ACTIVITIES (Full History)
===================================================== */
exports.getMyFeatureActivities = async (req, res) => {
    try {
        const activities = await FeatureActivity.find({
            userId: req.user._id,
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: activities.length,
            data: activities,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching activities",
        });
    }
};

/* =====================================================
   3. GET COMPLETE SUMMARY RESULT (ALL FEATURES)
===================================================== */
exports.getActivitySummary = async (req, res) => {
    try {
        const activities = await FeatureActivity.find({
            userId: req.user._id,
        });

        const totalActivities = activities.length;

        const completedActivities = activities.filter(
            (a) => a.status === "Completed"
        ).length;

        // Total Time (convert seconds → minutes)
        const totalDurationSeconds = activities.reduce(
            (sum, a) => sum + (a.duration || 0),
            0
        );

        const totalTimeMinutes = Math.floor(totalDurationSeconds / 60);

        // Average Score
        const scores = activities
            .filter((a) => a.score !== null && a.score !== undefined)
            .map((a) => a.score);

        const avgScore =
            scores.length > 0
                ? Math.round(
                    scores.reduce((a, b) => a + b, 0) / scores.length
                )
                : 0;

        // Feature-wise breakdown (Structured Analytics)
        const featureBreakdown = {};

        activities.forEach((activity) => {
            if (!featureBreakdown[activity.featureType]) {
                featureBreakdown[activity.featureType] = {
                    count: 0,
                    totalTime: 0,
                    totalScore: 0,
                    scoreCount: 0,
                };
            }

            featureBreakdown[activity.featureType].count++;
            featureBreakdown[activity.featureType].totalTime += activity.duration || 0;

            if (activity.score !== null && activity.score !== undefined) {
                featureBreakdown[activity.featureType].totalScore += activity.score;
                featureBreakdown[activity.featureType].scoreCount++;
            }
        });

        // Calculate avgScore per feature
        Object.keys(featureBreakdown).forEach((key) => {
            const feature = featureBreakdown[key];
            feature.avgScore =
                feature.scoreCount > 0
                    ? Math.round(feature.totalScore / feature.scoreCount)
                    : 0;

            // Remove temporary calculation fields
            delete feature.totalScore;
            delete feature.scoreCount;
        });

        // Overall Performance %
        const overallPerformance =
            totalActivities > 0
                ? Math.round((completedActivities / totalActivities) * 100)
                : 0;

        res.json({
            success: true,
            summary: {
                totalActivities,
                completedActivities,
                totalTimeMinutes,
                avgScore,
                overallPerformance,
                featureBreakdown,
            },
        });
    } catch (error) {
        console.error("Error in getActivitySummary:", error);
        res.status(500).json({
            success: false,
            message: "Error generating activity summary",
        });
    }
};