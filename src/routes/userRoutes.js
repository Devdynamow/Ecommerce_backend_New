const express = require('express');
const {  loginUser, logoutUser, getUserProfile, updateProfile, test, passwordResetUser, otpVerifyUser, passwordUpdateUser, resendOtpUser, followSeller, unfollowSeller, getSellerProfile, getSellerFeed, getActivityFeed, registerUserStepOne, registerUserStepTwo } = require('../controllers/userControllers'); // Import the user controller functions
const upload = require("../config/multer-config");
const { isLoggedIn } = require("../middlewares/checkAuth")

const router = express.Router();

// Route for User Registration
router.post('/register', upload.fields([
    { name: "profilePic", maxCount: 1 },  // Upload single profile picture
    { name: "storeImage", maxCount: 1 }    // Upload single store image
]), registerUserStepOne);

router.post('/register-verify',registerUserStepTwo);

// Route for User Login
router.post('/login', loginUser);

// Route for User Logout
router.get('/logout', logoutUser);

// Route to Get User Profile (Protected)
router.get('/profile', isLoggedIn, getUserProfile);

// Route to Update User Profile (Protected)
router.put('/update-profile',upload.single("profilePic"), updateProfile);

// Test Route
router.get('/', test);

// Password Reset Request
router.post('/reset-password', passwordResetUser);

// OTP Verification
router.post('/otp-verify', otpVerifyUser);

// Update Password
router.post('/update-password', passwordUpdateUser);

// Resend OTP
router.post('/resend-otp', resendOtpUser);

// Follow Seller
router.post('/follow-seller', isLoggedIn, followSeller);

// Unfollow Seller
router.post('/unfollow-seller', isLoggedIn, unfollowSeller);

// Get Seller Profile
router.get('/seller/:sellerId', getSellerProfile);

// Get Seller Feed
router.get('/seller/:sellerId/feed', getSellerFeed);

// Activity Feed
router.get('/activity-feed', isLoggedIn, getActivityFeed);

module.exports = router;
