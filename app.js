let net;
let output;
const robot = '🤖';
const img = document.getElementById("source");
const botConsole = document.getElementById("console");
const unfilteredList = document.getElementById("unfiltered");
const getPredictions = document.getElementById("getPredictions");
const predictions = [];

window.onload = () => {
  // Load random image from data.json for prediction analysis
  fetch('./assets/json/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(({images}) => { 
    //console.log(images);
    let imgSrc = images[Math.floor(Math.random() * images.length)];
    //console.log(imgSrc);
    // Set img attributes
    img.setAttribute("src", `./assets/img/${imgSrc}`);
    img.setAttribute("height", '264');
    img.setAttribute("width", '378');
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
};

async function classify() {
  console.log('Loading mobilenet..');
  document.getElementById('console').innerText = `Loading the model and getting a prediction...`;  

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const result = await net.classify(img);
  console.log(result);
  
  // Collect prediction values and preformat for downloadable json file
  const information = {
    name: img.src,
    labels: result,
  }
  predictions.push(information);

  // Loop through and print complete prediction array results
  result.forEach(({className, probability}, index) => {
    output = `
      <li>index: ${index}, label: ${className}, confidence: ${probability}</li>
    `;
    unfilteredList.innerHTML += `${output}`;
  });
    
  // Sort by probability
  let resultElements = result.sort((a, b) => a > b)[0];

  if (resultElements.probability > 0.15) {
    // Convert the probability to percentages
    let probabilityPercent = Math.round(resultElements.probability * 100);
    // Display result
    botConsole.innerText = `
      ${robot} ${probabilityPercent}% certain this is a(n) ${resultElements.className.replace(","," or")}.
    `;
  } else { 
    botConsole.innerText = `
      ${robot} I am not sure what I should recognize and my prediction probability is low. Is this a(n) ${resultElements.className.replace(","," or")}?
    `;
  }
}

function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], {
    type: contentType,
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function savePredictions() {
  predictionsJSON = {
    predictions,
  };
  download(JSON.stringify(predictionsJSON), "predictions.json", "text/plain");
}

classify();
getPredictions.onclick = savePredictions;
