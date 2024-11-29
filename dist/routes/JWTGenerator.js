"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JWTGEnerator_1 = require("../handlers/JWTGEnerator");
const router = (0, express_1.Router)();
// /jwt
router.get('/', JWTGEnerator_1.JWTGenerator);
exports.default = router;
