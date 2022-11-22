const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('../.env')
});
require("dotenv").config();

fs.writeFile("../.env", "", function(cb, err){if(err)throw err;});
let counter = 0;
for (let index = 1; index < 19; index++) {
	const newUuid = uuidv4();
	if(index < 4) {
		counter++
		fs.appendFileSync("../.env", `car_porsche${counter}=${newUuid}\n`, function(cb, err) {if(err) throw err;});
	}
	else if(index === 4) {
		counter++;
		fs.appendFileSync("../.env", `car_porsche${counter}=${newUuid}\n`, function(cb, err) {if(err) throw err;});
		counter = 0;
	}
	else if(10 > index && index > 4) {
		counter++;
		fs.appendFileSync("../.env", `car_volkswagen${counter}=${newUuid}\n`, function(cb, err) {if(err) throw err;});
	}
	else if(index === 10) {
		counter++;
		fs.appendFileSync("../.env", `car_volkswagen${counter}=${newUuid}\n`, function(cb, err) {if(err) throw err;});
		counter = 0;
	}
	else if(15 > index && index > 10) {
		counter++;
		fs.appendFileSync("../.env", `car_audi${counter}=${newUuid}\n`, function(cb, err) {if(err) throw err;});
	}
	else if(index === 15) {
		counter++;
		fs.appendFileSync("../.env", `car_audi${counter}=${newUuid}\n`, function(cb, err) {if(err) throw err;});
		counter = 0;
	}
	else if(index === 16 || index === 17) {
		counter++;
		fs.appendFileSync("../.env", `car_bmw${counter}=${newUuid}\n`, function(cb, err) {if(err) throw err;});
	}
	else if(index === 18) {
		counter++;
		fs.appendFileSync("../.env", `car_bmw${counter}=${newUuid}\n`, function(cb, err) {if(err) throw err;});
		counter = 0;
		console.log("E");
		fs.writeFile("carUuid.json", "[\n", function(cb, err) {if(err) throw err;})
		lineReader.on('line', (line) => {
			// console.log('Line from file:', line);
			line = line.replace(/=/g,'":"')
			line = line.replace(/^/,'{"')
			line += '"}'
			line = JSON.parse(line);
			console.log(line);
			fs.appendFileSync("carUuid.json", JSON.stringify(line, null, 2)+",\n" , function(cb, err) {if(err) throw err;})
		})
		lineReader.on("close", () => {
			fs.appendFileSync("carUuid.json", "{}]", function(cb, err) {if(err) throw err;});
		})		
	}
}