let net;

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

    // Calculate the probability in percentages
    const probabilityPercentage = Math.round(parseFloat(result[0].probability) * 100);

    // Print result to target location on the web page
    document.getElementById('console').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability} (which is about ${probabilityPercentage}% confidence in the prediction)
    `;
}

app();
