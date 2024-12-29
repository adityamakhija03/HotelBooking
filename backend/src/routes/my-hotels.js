"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = require("multer");
var cloudinary_1 = require("cloudinary");
var hotel_1 = require("../models/hotel");
var auth_1 = require("../middleware/auth");
var express_validator_1 = require("express-validator");
var router = express_1.default.Router();
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
router.post("/", auth_1.default, [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("type").notEmpty().withMessage("Hotel type is required"),
    (0, express_validator_1.body)("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
    (0, express_validator_1.body)("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
], upload.array("imageFiles", 6), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageFiles, newHotel, imageUrls, hotel, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                imageFiles = req.files;
                newHotel = req.body;
                return [4 /*yield*/, uploadImages(imageFiles)];
            case 1:
                imageUrls = _a.sent();
                newHotel.imageUrls = imageUrls;
                newHotel.lastUpdated = new Date();
                newHotel.userId = req.userId;
                hotel = new hotel_1.default(newHotel);
                return [4 /*yield*/, hotel.save()];
            case 2:
                _a.sent();
                res.status(201).send(hotel);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500).json({ message: "Something went wrong" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hotels, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, hotel_1.default.find({ userId: req.userId })];
            case 1:
                hotels = _a.sent();
                res.json(hotels);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: "Error fetching hotels" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, hotel, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, hotel_1.default.findOne({
                        _id: id,
                        userId: req.userId,
                    })];
            case 2:
                hotel = _a.sent();
                res.json(hotel);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ message: "Error fetching hotels" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put("/:hotelId", auth_1.default, upload.array("imageFiles"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedHotel, hotel, files, updatedImageUrls, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                updatedHotel = req.body;
                updatedHotel.lastUpdated = new Date();
                return [4 /*yield*/, hotel_1.default.findOneAndUpdate({
                        _id: req.params.hotelId,
                        userId: req.userId,
                    }, updatedHotel, { new: true })];
            case 1:
                hotel = _a.sent();
                if (!hotel) {
                    return [2 /*return*/, res.status(404).json({ message: "Hotel not found" })];
                }
                files = req.files;
                return [4 /*yield*/, uploadImages(files)];
            case 2:
                updatedImageUrls = _a.sent();
                hotel.imageUrls = __spreadArray(__spreadArray([], updatedImageUrls, true), (updatedHotel.imageUrls || []), true);
                return [4 /*yield*/, hotel.save()];
            case 3:
                _a.sent();
                res.status(201).json(hotel);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(500).json({ message: "Something went throw" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
function uploadImages(imageFiles) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadPromises, imageUrls;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uploadPromises = imageFiles.map(function (image) { return __awaiter(_this, void 0, void 0, function () {
                        var b64, dataURI, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    b64 = Buffer.from(image.buffer).toString("base64");
                                    dataURI = "data:" + image.mimetype + ";base64," + b64;
                                    return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(dataURI)];
                                case 1:
                                    res = _a.sent();
                                    return [2 /*return*/, res.url];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(uploadPromises)];
                case 1:
                    imageUrls = _a.sent();
                    return [2 /*return*/, imageUrls];
            }
        });
    });
}
exports.default = router;
