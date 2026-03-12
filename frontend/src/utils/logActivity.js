import api from "./api";

/* =========================================
   1️⃣ Log Activity
========================================= */
export const logStudentActivity = async (
    featureType,
    title,
    description = "",
    meta = {},
    duration = 0,
    score = null,
    status = "Completed"
) => {
    try {
        await api.post("/api/feature-activity/log", {
            featureType,
            title,
            description,
            meta,
            duration,   // seconds
            score,      // optional
            status,
        });
    } catch (error) {
        console.error(
            "Activity logging failed:",
            error.response?.data || error.message
        );
    }
};

/* =========================================
   2️⃣ Get Full Activity History
========================================= */
export const getMyActivities = async () => {
    try {
        const { data } = await api.get(
            "/api/feature-activity/my"
        );
        return data;
    } catch (error) {
        console.error(
            "Fetching activities failed:",
            error.response?.data || error.message
        );
        return null;
    }
};

/* =========================================
   3️⃣ Get Summary Result (All Features)
========================================= */
export const getActivitySummary = async () => {
    try {
        const { data } = await api.get(
            "/api/feature-activity/summary"
        );
        return data;
    } catch (error) {
        console.error(
            "Fetching summary failed:",
            error.response?.data || error.message
        );
        return null;
    }
};