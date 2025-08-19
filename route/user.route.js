const express = require("express");
const userRoute = express.Router();
const { register,login,refreshAccessToken,changePassword,getCurrentUser,logout, deleteUser,getUpdateUserDetails } = require("../controllers/users.controller");
const { veriFyRefreshToken, verifyAccessToken } = require("../middlewares/auth.middleware");
const { verifyJWT } = require("../middlewares/logout.middleware");
const { checkBlacklists } = require("../middlewares/checkBlacklists.middleware");
userRoute.post("/user-register", register);
userRoute.post("/user-login", login);
userRoute.post("/new-access-token",   checkBlacklists, veriFyRefreshToken , refreshAccessToken);
userRoute.post("/user-new-password", verifyAccessToken, changePassword);
userRoute.get("/get-current-user", verifyAccessToken,getCurrentUser);
userRoute.post("/user-logout",verifyJWT, checkBlacklists,logout);
userRoute.delete("/user-account-delete/:id", verifyAccessToken, deleteUser);
userRoute.all("/update-user-details/:id", verifyAccessToken, getUpdateUserDetails);
/**admin route */
// for the admin purpose
userRoute.post("/admin-register", register);
userRoute.post("/admin-login", login);
userRoute.post("/admin-new-access-token", checkBlacklists, veriFyRefreshToken, refreshAccessToken);
userRoute.post("/admin-change-password",verifyAccessToken,changePassword);
userRoute.get("/admin-information",verifyAccessToken,getCurrentUser);
userRoute.post("/admin-logout", verifyJWT, checkBlacklists, logout);
userRoute.delete("/admin-delete-profile/:id",verifyAccessToken,deleteUser); 
userRoute.all("/admin-update/:id", verifyAccessToken,getUpdateUserDetails);

module.exports = userRoute;
console.log("The user route is ready to use.");