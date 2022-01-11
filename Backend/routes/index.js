var express = require("express");
var router = express.Router();
const { cvUpload } = require('../services/multer');
const {
  registeration,
  login,
  changeApplicationStatus,
  getAdminStatus,
  getApplication,
  saveApplication,
} = require("../controller/api.controller");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/isAdminExist", getAdminStatus);

router.post("/adminSignup", registeration);

router.post("/adminLogin", login);

router.get("/getAllApplication", getApplication);

router.get("/changeApplicationStatus", changeApplicationStatus);

router.post("/saveApplication", cvUpload, saveApplication);


module.exports = router;
