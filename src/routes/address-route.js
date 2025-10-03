const express = require('express');
const router = express.Router();
const AddressController = require('../controller/address-controller');

router.post("/",(req,res,next)=>AddressController.newAddress(req,res,next));
router.get("/:id",(req,res,next)=>AddressController.getAddressByUserId(req,res,next));
router.put("/:id",(req,res,next)=>AddressController.updateAddress(req,res,next));
router.delete("/:id",(req,res,next)=>AddressController.deleteAddress(req,res,next));

module.exports = router ;