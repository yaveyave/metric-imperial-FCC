function numberSplitterCheck(input){
  let number = input.match(/[.\d\/]+/g)|| ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];
  console.log("number split: "+[number[0], string]);
  return [number[0], string];
}

function divCheck(inputFraction){
  let nums = inputFraction.split("/");
  if(nums.length > 2){
    return false; 
  };
  console.log(nums)
  return nums;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberSplitterCheck(input)[0];
    let nums = divCheck(result)
    
    if(!nums){
      return undefined;
    };

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    if(isNaN(num1)||isNaN(num2)){
      return undefined
    };
    return num1/num2;

  };
  
  this.getUnit = function(input) {
    let result = numberSplitterCheck(input)[1];
    if (typeof result !== "string"){
      return undefined;
    }
    result = result.toLowerCase()    ;

    switch(result){
      case "km":
      case "mi":
      case "gal":
      case "lbs":
      case "kg":
        return result;
      case "l":
        return "L"; 
      default:
        return undefined; 
    }
  };
  
  this.getReturnUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    let result = unit.toLowerCase();
    switch(result){
      case "km":
        return 'kilometers';
      case "mi":
        return 'miles';
      case 'gal':
        return 'galons';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'l':
        return 'Liters';
      default:
        return "Unknow";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();

    switch (unit){
      case 'km':
        result = initNum / miToKm;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'lbs':
          result = initNum * lbsToKg;
          break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5))
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };  
}



module.exports = ConvertHandler;
