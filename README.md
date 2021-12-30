# Belly Button Biodiversity

![Header](/Header.PNG)

## Overview

This project focuses analyzing the bacteria that is found in our belly buttons.  To visualize the data, this project utilizes Javascript and Plotly.js library to create interactive charts and graphs that are automatically updated based on the ID number of the test subject data being examined.

The user can select the Test Subject ID number from a dropdown menu which will populate the test subject's demographic info from the JSON file.

![Test Subject ID](/ID_info.PNG)

When the user selects the ID number of the test subject that they want to examine data for, this also updates three additional graphs.  The first graph is a bar chart which shows the top 10 bacteria cultures found in the subject's belly button and the ID number of the bacteria found there.  By hovering over the various lines of the bar chart, the user can see the exact amount of each bacteria that was measured in the subject's belly button.  The most prevalant bacteria found in test subject 940's belly button was OTU 1167.

![Top 10 Bacteria](/10_cultures.PNG)

The second visualization is a gauge chart which shows how frequently the test subject reported that they washed their belly button.  Test subject 940 washed their belly button twice per week.

![Wash Frequency](/wash_freq.PNG)

The final visualization is a bubble chart which shoes the bacteria cultures per sample for the chosen subject.  The bubbles are ordered by bacteria ID on the X-axis and by the quantity of bacteria on the Y-axis.  The size of the bubble also indicates the quantity of bacteria and when the user hovers their mouse over each bubble, the amount any type of bacteria are displayed.

![Bubble Chart](/bubble.PNG)