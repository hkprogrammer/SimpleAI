const brain = require('brain.js');
const data = require('./data.json');
const fs = require('fs');

//const trainedBrain = fs.readFileSync('brain.json');
// const network = JSON.parse(trainedBrain);

const network = new brain.recurrent.LSTM();



const trainingData = data.map(item => ({
	input: item.text,
	output: item.category
}));


network.train(trainingData, {
	iterations: 200
});

var str = JSON.stringify(network, null, 4);
fs.writeFileSync("brain.json",str, (err) =>{
	console.log(err);
});

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
var output;
readline.question(`Type your question: `, (question) => {
  output = network.run(question);
  console.log(output);
  readline.close()
})



