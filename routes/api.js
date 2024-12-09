'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get( (req, res)=> {
    let input = req.query.input;
    console.log("Input received:", input);

    if (!input){
      req.status(400).send("Input is required");
      return;
    }

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if(!initNum && !initUnit){
      res.send("Invalid number and unit");
      return;
    }else if (!initNum){
      res.send("Invalid number");
      return;
    }else if(!initUnit){
      res.send("Invalid Unit");
      return;
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({initNum, initUnit, returnNum, returnUnit, string: toString});
  });  

};
