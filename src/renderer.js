/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import './scss/app.scss';
import "@fortawesome/fontawesome-free/js/all";

////////////////////// reading from json files ///////////////////////
const sample = require('./data.json');
var jsonLen = sample["list_data"].length;
var resizeHeight = 50 + jsonLen * 56; 


///////////////// resize button events //////////////////////
var isClicked = false;
const myBtn = document.getElementById('extend-button');
myBtn.addEventListener('click', () => {
    if(isClicked == false){
        window.electronAPI.bigSize(resizeHeight);
        isClicked = true;
        
    }
    else{
        window.electronAPI.smallSize();
        isClicked = false;
    }
    
});
//////////////////////////////////////////////////////////////


//////////////////////// adding elements /////////////////////////
const body = document.body;

for(var i = 0; i < jsonLen; i++){

    const interDiv = document.createElement('div');
    interDiv.classList.add("inter-div");

    const wholeWidthDiv = document.createElement('div');
    wholeWidthDiv.classList.add("whole-width-div");

    const centerDiv = document.createElement('div');
    centerDiv.classList.add("center-div");

    const topHr = document.createElement('hr');
    topHr.classList.add("top-hr");

    const timespan = document.createElement('span');
    timespan.classList.add("timespan");
    const timespanText = document.createTextNode(sample["list_data"][i]["time"] + " ");
    timespan.appendChild(timespanText);

    const checkbox = document.createElement('label');
    checkbox.classList.add("checkbox");

    const input = document.createElement('input');
    input.setAttribute("id", `cb${i}`);
    input.setAttribute("type", "checkbox");

    const span = document.createElement('span');
    span.classList.add("checkmark");

    checkbox.appendChild(input);
    checkbox.appendChild(span);
    
    const para = document.createElement('p');
    para.classList.add("all-task");
    const paraText = document.createTextNode(sample["list_data"][i]["title"]);
    para.appendChild(paraText);

    const bottomHr = document.createElement('hr');
    bottomHr.classList.add("bottom-hr");


    centerDiv.appendChild(topHr);
    centerDiv.appendChild(timespan);
    centerDiv.appendChild(checkbox);
    centerDiv.appendChild(para);
    centerDiv.appendChild(bottomHr);
    wholeWidthDiv.appendChild(centerDiv);
    body.appendChild(interDiv);
    body.appendChild(wholeWidthDiv);
}

var total = jsonLen;
var current = 0;
document.getElementById("progress").innerHTML = `${current}/${total}`;
document.getElementById("next-task").innerHTML = sample["list_data"][0]["title"];


const arr = [];
const jsonData = {};
for(var i = 0; i < jsonLen; i++){
    arr.push(document.getElementById(`cb${i}`));
    jsonData[`cb${i}`] = false;
}



arr.forEach(item => {
    item.addEventListener('change', (event) => {
        if(event.currentTarget.checked){
            jsonData[event.target.id] = true;
            
        }
        else{
            jsonData[event.target.id] = false;
        }
        for(var i = 0; i < jsonLen; i++){
            if(jsonData[`cb${i}`] == false){
                console.log(i);
                document.getElementById("next-task").innerHTML = sample["list_data"][i]["title"];
                break;
            }
        }
        current = 0;
        for(var i = 0; i < jsonLen; i++){
            if(jsonData[`cb${i}`] == true){
                current++;
            }

        }
        document.getElementById("progress").innerHTML = `${current}/${total}`;
        
    })
})





