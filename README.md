# Clockwork-AWH

## Summary

A full stack .NET application that displays the current time based on a user selected time zone and records the selection in a SQLite database. History of all previous time zone choices are stored in the database and are also displayed along with the most recent selection on page load and updated with each additional time zone selection.

## Getting started

1. Open Clockwork.sln in Visual Studio.
2. Allow multiple startup projects so both Clockwork.API and Clockwork.Web will run concurrently by right-clicking Solution 'Clockwork' in the Solution Explorer -> Properties -> Startup Project -> Select Multiple startup projects -> Change the action to `Start` for the Clockwork.API and Clockwork.Web. Your Property window should look like this:
<p align="center"><img src="https://raw.githubusercontent.com/shabnamrahmed/Clockwork-AWH/master/Screenshots/allprojects.PNG" width="640" height="480"/></p> 
3. From the project root run `cd Clockwork.API && dotnet ef database update` in a command prompt to build the EF migration

4. If one of the projects appears to be unloaded or unavailable, right-click the project name and click `Reload Project` as seen below

<p align="center"><img src="https://raw.githubusercontent.com/shabnamrahmed/Clockwork-AWH/master/Screenshots/reload.png" width="640" height="480"/></p>

5. Start the program
6. After the browser loads, make sure it navigates to http://localhost:58676/

<p align="center"><img src="https://raw.githubusercontent.com/shabnamrahmed/Clockwork-AWH/master/Screenshots/Demo.gif" width="640" height="480"/></p> 

## Process

 A single endpoint was provided for persisting an entry to the database and was already set up which included the UTC Time, Server time, and Client IP. 

After building the migration, I made sure that a time date object was returned whenever the API was run.  

I  then created a new model for the time zone which was used to get the current time in that time zone and used a list of time zones from [this stackoverflow article](https://stackoverflow.com/questions/7908343/list-of-timezone-ids-for-use-with-findtimezonebyid-in-c) to populate the drop down on page load.  

Some code was given to make a request to the endpoint using `XMLHttpRequest` which I replaced with `fetch` API because I think it's easier to work with.

## Additional goals

* Add another input field option for user to type in a time zone that will auto-complete 
* Get time zone by city or country
 



