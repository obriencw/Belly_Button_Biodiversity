function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts1(firstSample);
    buildCharts2(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts1(newSample);
  buildCharts2(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts1(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var sampleNames = data.samples
    var resultArray = sampleNames.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;
    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    var yticks = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(); 

    var trace1 = {
      type: "bar",
      orientation: "h",
      x: sampleValues.slice(0,10).reverse(),
      y: yticks
    }
    var barData = [trace1]; 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
     
    };
    Plotly.newPlot("bar", barData, barLayout); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
        { x: otuIds,
          y: sampleValues,
          text: otuLabels,
          mode: 'markers',
          marker: {size: sampleValues, color: otuIds, colorscale: 'Portland'},
          hoverinfo: otuLabels
        }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: 'OTU ID'},
      hovermode: "closest"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}


function buildCharts2(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    var metadata = data.metadata
    // Create a variable that holds the samples array. 
    var sampleNames = data.samples
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = sampleNames.filter(sampleObj => sampleObj.id == sample);
    console.log(resultArray)
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filteredMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(filteredMetadata)
    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = resultArray[0].otu_ids
    var otu_labels = resultArray[0].otu_labels
    var sample_values = resultArray[0].sample_values

    // 3. Create a variable that holds the washing frequency.
    var wfreq = filteredMetadata[0].wfreq
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
     domain: {x: [0,1], y: [0,1]},
     value: wfreq,
     title: {text: "Washing Frequency"},
     type: "indicator",
     mode: "gauge+number",
     gauge: {
      axis: { range: [null, 10]},
      bar: { color: "black" },
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange" },
        { range: [4, 6], color: "yellow"},
        { range: [6, 8], color: "#7FFF00"},
        { range: [8, 10], color: "green"},
      ]
    }}
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 500, margin: { t: 0, b: 0 } };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
