let net;
let output;
const robot = '🤖';

async function app() {
  console.log('Loading mobilenet..');
  document.getElementById('console').innerText = `Loading the model and getting a prediction...`;  

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const img = document.getElementById('source');
  const result = await net.classify(img);
  console.log(result);
  
  // Loop through and print complete prediction array results
  result.forEach((item, index) => {
    //console.log(`index: ${index}, label: ${item.className}, confidence: ${item.probability}`);
    output = `
      <li>index: ${index}, label: ${item.className}, confidence: ${item.probability}</li>
    `;
    document.getElementById('unfiltered').innerHTML += `${output}`;
  });
    
  // Sort by probability
  let resultElements = result.sort((a, b) => a > b)[0];

  if (resultElements.probability > 0.2) {
    // Convert the probability to percentages
    let probabilityPercent = Math.round(resultElements.probability * 100);
    // Display result
    document.getElementById('console').innerText = `
      ${robot} ${probabilityPercent}% certain this is a ${resultElements.className.replace(","," or")}.
    `;
  } else { 
    document.getElementById('console').innerText = `
      ${robot} I am not sure what I should recognize and my prediction probability is low.
    `;
  }

  // Convert the probability to percentages
  //const probabilityPercent = Math.round(result.probability * 100);
  // Print result to target location on the web page
  //document.getElementById('console').innerText = `
    //prediction: ${result[0].className}\n
    //probability: ${result[0].probability} (which is about ${probabilityPercent}% confidence in the prediction)
  //`;
}

app();
