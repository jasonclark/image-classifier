let net;

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

    // Make a prediction through the model on our image.
    const img = document.getElementById('source');
    const result = await net.classify(img);
    console.log(result);
  
    // Print result to target location on the web page
    document.getElementById('console').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;
}

app();
