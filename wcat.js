let fs = require("fs");
let path = require("path");
let inputArr = process.argv.slice(2);

// let fileArr = inputArr;

let opArr = [];
let filesArr = [];

// seperate options and files path..............
for(let i = 0; i<inputArr.length; i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        opArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}
// cheack if file exists or not................
for(let i = 0; i < filesArr.length; i++){
    let ans = fs.existsSync(filesArr[i]);
    if(ans == false){
        console.log("File does not exists");
        return;
    }
}
// read contents of each file then add them to content............
let content = "";
for(let i = 0; i<filesArr.length; i++){
    content = content + fs.readFileSync(filesArr[i]) + "\n";
}
// console.log(content.split("\r\n"));
let contentArr = content.split("\r\n");

// -s case.................................
let isPresents = opArr.includes("-s");
if(isPresents){
    for(let i = 0; i< contentArr.length; i++) {
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempsArr = [];
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != null){
            tempsArr.push(contentArr[i]);
        }
    }
    contentArr = tempsArr;
}

// console.log(contentArr.join("\n"));
//console.log(opArr);

let isPresentn = opArr.includes("-n")
if(isPresentn) {
    if((opArr.indexOf("-n") < opArr.indexOf("-b")) || opArr.indexOf("-b") == -1){

        let tempnArr = contentArr;
        for(let i = 0; i < tempnArr.length; i++){
            tempnArr[i] = (i + 1) + "). " + tempnArr[i];
        }
        contentArr = tempnArr;
    }
}
console.log(contentArr.join("\n"));