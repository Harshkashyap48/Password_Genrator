// import { elementaryChargeDependencies } from "mathjs";

const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector(" [data-copyMsg]"); 
const uppercaseCheck = document.querySelector("#uppercase"); 
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn"); 
const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbols = ' ~`! @#$%^&*()_-+={[}]|\:;"<,>.?/';


let password='';
let passwordLength= 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText =passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "% 100%"
}


function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

function getRandomInteger(min, max) {
     return Math.floor(Math.random()*(max-min))+ min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91))
}

function generateSymbol(){
   const randomNumbor = getRandomInteger(0, symbols.length);
   return symbols.charAt(randomNumbor);
}

function calcStrength(){
   let hasUpper = false; 
   let hasLower = false;
   let hasNum = false; 
   let hasSym = false;

   if (uppercaseCheck.checked) hasUpper = true; 
   if (lowercaseCheck.checked) hasLower = true;
   if (numbersCheck.checked) hasNum = true;
   if (symbolsCheck.checked) hasSym= true;

   if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
       setIndicator("#0f0");
      }
       else if ((hasLower || hasUpper) &&(hasNum || hasSym) && passwordLength >= 6 ) {
         setIndicator("#ff0");
        }
         else {
        setIndicator("#f00");
     }
    
}

async function copyContent(){
     
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";

    }
    catch(e){
        copyMsg.innerText = "failed";

    }
    copyMsg.classList.add("active");
   
    setTimeout(() => {
        copyMsg.classList.remove('active');
    },4000 );
 }
    
    function shufflePassword(array){
        for ( let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j]; 
            array[j] = temp;
        }
            
            let str = "";
            
           array.forEach((el)=> (str += el));
            return str;
     }
function handleCheckBoxChange(){
    checkCount =0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked)
        checkCount++;
    });
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

}
allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange);
    })

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value ;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value )
    copyContent();
})

generateBtn.addEventListener('click', () =>{
     if(checkCount==0) return;
     if(passwordLength < checkCount){
        passwordLength = checkboxCount;
        handleSlider();
     }
 console.log("Starting the Journey");
//  for new password removing old
    password ="";

 
    let functionArr =[];

    if(uppercaseCheck.checked)
        functionArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
       functionArr.push(generateLowerCase);

    if(numbersCheck.checked)
       functionArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
       functionArr.push(generateSymbol);

    // addition
    for(let i=0; i<functionArr.length; i++){
        password += functionArr[i]();
    }
    console.log("addition done");
    // remaining additon
    for(let i=0; i<passwordLength-functionArr.length; i++){
        let randIndex = getRandomInteger(0, functionArr.length);
        console.log("randIndex"+ randIndex);
        password += functionArr[randIndex]();
    }
    console.log("remaining  done");

    password = shufflePassword(Array.from(password));
    console.log("shuffling done");

    passwordDisplay.value = password;
    console.log("UI addition done");

    calcStrength();
});
