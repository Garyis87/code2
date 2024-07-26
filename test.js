const button  = document.getElementById("add");
const inputElement1 = document.getElementById("input1");
const inputElement2 = document.getElementById("input2");
const answer = document.getElementById("answer");

button.addEventListener("click", function(){
    const grade = inputElement1.value;
    if(grade>100){
        console.log("??? no head?");
    }
    if(grade>=60){
        console.log("good");
    }
    else{
        console.log("you suck");
    }
});
