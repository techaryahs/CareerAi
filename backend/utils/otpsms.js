const axios = require("axios");

/**
 * Sends an OTP via MSG91 Flow API.
 * 
 * @param {string} phone - 10-digit mobile number
 * @param {string} otp - 6-digit OTP
 * @returns {Promise<{success: boolean, message: string}>}
 */
const sendSMSOTP = async (phone, otp) => {
    const msg91AuthKey = process.env.MSG91_AUTH_KEY;
    const msg91TemplateId = process.env.MSG91_TEMPLATE_ID;

    if (!msg91AuthKey || !msg91TemplateId) {
        console.error("[OTP DEBUG] MSG91 credentials missing (AuthKey/TemplateId)");
        return { success: false, message: "SMS provider configuration missing" };
    }

    // Ensure 10-digit phone number is prepended with +91
    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    console.log("OTP Generated:", otp);
    console.log("Sending OTP to:", formattedPhone);

    const payload = {
        template_id: msg91TemplateId,
        short_url: 0,
        realTimeResponse: 1,
        recipients: [
            {
                mobiles: formattedPhone,
                OTP: otp
            }
        ]
    };

    try {
        console.log("[OTP DEBUG] MSG91 Payload:", JSON.stringify(payload, null, 2));

        const response = await axios.post(
            "https://control.msg91.com/api/v5/flow",
            payload,
            {
                headers: {
                    authkey: msg91AuthKey,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("MSG91 Response:", response.data);

        if (response.data.type === "success") {
            return { success: true, message: "OTP sent successfully" };
        } else {
            return { success: false, message: response.data.message || "Failed to send OTP" };
        }
    } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.error("[OTP DEBUG] MSG91 API Error:", errorMsg);
        return { success: false, message: errorMsg };
    }
};

module.exports = { sendSMSOTP };
