var read = require("readline");
var readLine=read.createInterface({
  input:process.stdin,
  output:process.stdout
})
var num1=Math.floor((Math.random()*10)+1)
var num2=Math.floor((Math.random()*10)+1)
var correct=num1+num2;

readLine.question(`what is the sum of ${num1} + ${num2} \n`,(answer)=>{
    if(answer==correct){
		readLine.close()
	}
	else{
		readLine.setPrompt("wrong answer try again \n")
		readLine.prompt()
		readLine.on("line",(input)=>{
			if(input==correct){
				readLine.close()
			}
			else{
				readLine.setPrompt(`${input} is wrong answer try again \n`)
				readLine.prompt()
			}
		})
	}
})

readLine.on("close",function(){
	console.log("Correct answer !!!!")
})
