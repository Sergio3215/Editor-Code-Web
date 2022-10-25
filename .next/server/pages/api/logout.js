"use strict";
(() => {
var exports = {};
exports.id = 30;
exports.ids = [30];
exports.modules = {

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ 1535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
const cookie = __webpack_require__(4802);
const createToken = (userToken, secretWord, expiresIn)=>{
    // console.log(userToken);
    const { __id , email , password , account , name  } = userToken;
    return jwt.sign({
        __id,
        email,
        name,
        account,
        password
    }, secretWord, {
        expiresIn
    });
};
async function handler(req, res) {
    try {
        res.status(200).setHeader("Set-Cookie", cookie.serialize("Token", null, {
            httpOnly: true,
            secure: process.env.MODE == "prod",
            maxAge: 0,
            sameSite: "strict",
            path: "/"
        })).json({
            success: true
        });
    } catch (err) {
        // console.log(err)
        res.json({
            data: [],
            error: err.message,
            success: false
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1535));
module.exports = __webpack_exports__;

})();