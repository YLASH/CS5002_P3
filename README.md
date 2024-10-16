# CS5002_P3
 Data and the DOM_American Movies list
##### Aim
 The aim of this assignment is that you should be able to
    • Load JSON data from a local file
    • Use the data to build up a table on a webpage
    • Use the select element to lter the contents of the table
    • Add some interesting extensions of your own invention

 Objective: Develop a JavaScript program to analyze American movies data (from 1900 onward) using JSON data provided in movies.json.

#### Requirements:
    • Data Loading:
    Read JSON data from the movies.json file.
    
    • Table Population:
    Populate a table (with the ID movieTable in the HTML file) with four columns: year, title, genres, and cast, based on the JSON data.
    Each movie in the JSON file should correspond to a row in the table.
    
    • Genre Filtering:
    Implement a genre selection feature using the selectGenre element.
    Users can select from available genres or choose an "All" option to display all movies.
    Ensure that the filtering works in conjunction with year filters.
    
    • Year Range Selection:
    Allow users to select a range of years using the elements selectYearStart and selectYearEnd.
    The table should update to show movies only within the selected year range.
    
    • Title Search:
    Implement a title search functionality that allows users to filter movies by title or part of the title, case-insensitively.