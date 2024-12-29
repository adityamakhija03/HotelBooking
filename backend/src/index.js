"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
require("dotenv/config");
var mongoose_1 = require("mongoose");
var users_1 = require("./routes/users");
var auth_1 = require("./routes/auth");
var cookie_parser_1 = require("cookie-parser");
var path_1 = require("path");
var cloudinary_1 = require("cloudinary");
var my_hotels_1 = require("./routes/my-hotels");
var hotels_1 = require("./routes/hotels");
var my_bookings_1 = require("./routes/my-bookings");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/my-hotels", my_hotels_1.default);
app.use("/api/hotels", hotels_1.default);
app.use("/api/my-bookings", my_bookings_1.default);
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
});
app.listen(7000, function () {
    console.log("server running on localhost:7000");
});
