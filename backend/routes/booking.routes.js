const express = require("express");
const router = express.Router();
const bookingCtrl = require("../controllers/booking.controller");

router.post("/book-consultant", bookingCtrl.bookConsultant);
router.get("/booked-slots", bookingCtrl.getBookedSlots);
router.post("/book-teacher", bookingCtrl.bookTeacher);
router.get("/search-teachers", bookingCtrl.searchTeachers);
router.get("/teacher-slots", bookingCtrl.getTeacherBookedSlots);

router.get("/counselling/:email", bookingCtrl.getUserCounselling);
router.get("/user/:email", bookingCtrl.getUserBookings); // ✅ NEW - Get bookings by user email
router.get("/consultants", bookingCtrl.getAllConsultants);
router.get("/consultant/:consultantId", bookingCtrl.getConsultantBookings);
router.get("/teacher-bookings/:teacherId", bookingCtrl.getTeacherBookings);
router.put("/:id/accept", bookingCtrl.acceptBooking);
router.put("/:id/reject", bookingCtrl.rejectBooking);

module.exports = router;
