// json URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// use D3 to read in samples.json from the URL.

function init() {
    var dropDown = d3.select("#selDataset");
    d3.json(url).then(function(data) {
        var sampleNames = data.names; 
        sampleNames.forEach((sample)=> {
            dropDown.append("option").text(sample).property("value", sample)
        });
        var initSample = sampleNames[0];
        buildCharts(initSample);
       
    });
};

//create a horizontal bar chart with dropdown menuto display the top 10 OTUs found in an individual

function buildCharts(sample) {
    d3.json(url).then(function(data) {
        //defining variables
        var samplesComplete = data.samples;
        var sampleInfo = samplesComplete.filter(row => row.id == sample);
        var sampleValues = sampleInfo[0].sample_values;
        var sampleValuesSlice = sampleValues.slice(0,10).reverse();
        var otuIds = sampleInfo[0].otu_ids;
        var otuIdsSlice = otuIds.slice(0,10).reverse();
        var otuLabels = sampleInfo[0].otu_labels;
        var otuLabelsSlice = otuLabels.slice(0,10).reverse();
        var metaData = data.metadata;
        var metaDataSample = metaData.filter(row => row.id == sample);
        var wash = metaDataSample[0].wfreq;
        
        //buiding bar chart
        var trace1 = {
            x: sampleValuesSlice,
            y: otuIdsSlice.map(item => `OTU ${item}`),
            type: "bar",
            orientation: "h",
            text: otuLabelsSlice,
        };
        var data = [trace1];
        Plotly.newPlot("bar", data);

        //building a bubble chart
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            },
            text: otuIds
        };
        var bubbleData = [trace2];
        var bubbleLayout = {title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"},
            showlegend:false
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        //gauge chart
        var trace3 = [
            {
                domain: {x: [0,1], y: [0,1]},
                value: wash,
                title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {range: [null, 9]},
                    bar: {color: "red"},
                    steps: [
                    {range: [1,2], color: "orange"},
                    {range: [2,3], color: "yellow"},
                    {range: [3,4], color: "beige"},
                    {range: [4,5], color: "lightyellow"},
                    {range: [5,6], color: "powderblue"},
                    {range: [6,7], color: "lightskyblue"},
                    {range: [7,8], color: "lightgreen"},
                    {range: [8,9], color: "green"}
                    ],
                    threshold: {
                        line: {color: "black", width: 4},
                        thickness: 0.75,
                        value: wash
                    }
                }
            }
            ];
            var gaugeLayout = {width: 600, height: 250, margin: {t: 0, b: 0}};
            Plotly.newPlot('gauge', trace3, gaugeLayout);
    });
};

//demographic metadata
function buildDemographic(sample) {
    var demographic = d3.select("#sample-metadata");
    d3.json(url).then(function(data){
        var metaData = data.metadata;
        var metaDataSample = metaData.filter(row => row.id == sample);
        demographic.selectAll("p").remove();
        metaDataSample.forEach((row) => {
            for (const [key,value] of Object.entries(row)) {
                demographic.append("p").text(`${key}: ${value}`);
            };
        });
    });
};

//run the function to change option from the dropdown menu
function optionChanged(sample) {
    buildDemographic(sample);
    buildCharts(sample);
};

init();