# belly-button-challenge

The link to the visualization dashboard can be found at : https://detmanski.github.io/belly-button-challenge/

This repository contains the assignment for module 14. This challenge asks us to create an interactive dashboard using JavaScript.
The dataset we were provided is the 'Belly Button Biodiversity' dataset which catalogs the microbes that colonize in human navels. 
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs) were present in more
than 70% of people, while the rest were relatively rare. 

The D3 library was used to read the json file from the provided URL. 

The horizontal bar chart shows the top 10 OTUs found in that individual. This chart used sample_values as the values, otu_ids as labels and 
otu_labels as the hovertext for the chart. 

The bubble chart displays each sample using otu_ids for the x values and sample_values for the y values. Marker colors and text values
used otu_its and otu_labels respectvely. 

The gauge chart displays the washing frequency using the wash value. 

The sample metadata summarizes each individual's demographic information.

Further analysis could be done by comparing demographic information to presence or frequency of different microbes to see if there is any
correlation. 

The values for the bar, bubble, and gauge chart as well as the sample metadata will change to display each individual by using the 
dropdown menu to select an id number. 

The javascript code can be found in static/js/app.js and the html in the index.html file. 

Thanks for reading!


