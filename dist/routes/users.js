"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../handlers/users");
const router = (0, express_1.Router)();
// /api/users
router.get('/', users_1.getUsers);
// /api/users/:id
router.get('/:id', users_1.getUserById);
exports.default = router;
