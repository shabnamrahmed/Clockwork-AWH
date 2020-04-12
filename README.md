# Clockwork-AWH

## Summary

A full stack .NET application that displays the current time based on a user selected time zone and records the selection in a SQLite database. History of all previous time zone choices are stored in the database and are also displayed along with the most recent selection on page load and updated with each additional time zone selection.

## Getting started

1. Open Clockwork.sln and make sure Clockwork.API is the default project
2. Run `cd Clockwork.API && dotnet ef database update` in a command prompt to build the EF migration
3. Allow multiple startup projects so both Clockwork.API and Clockwork.Web will run concurrently by right-clicking Solution 'Clockwork' in the Solution Explorer -> Startup Project -> Select Multiple startup projects -> change the action to start for the Clockwork.API and Clockwork.Web.
4. Start the program
5. After the browser loads, make sure it navigates to http://localhost:58676/.

## Process

 A single endpoint was provided for persisting an entry to the database was already set up that included the UTC Time, Server time, and Client IP. 

After building the migration, I made sure that a time date object was returned whenever the API was run.  

I  then created a new model for the time zone which was used to get the current time in that time zone and used a list of time zones from [this stackoverflow article](https://stackoverflow.com/questions/7908343/list-of-timezone-ids-for-use-with-findtimezonebyid-in-c) to populate the drop down on page load.  

Some code was given to make a request to the endpoint using `XMLHttpRequest` which I replaced with `fetch` API because I think it's easier to work with.

## Additional goals

* Add another input field option for user to type in a time zone that will auto-complete 
* Get time zone by city or country

## Known issues

For an unknown reason, at times the time zone drop down menu isn't able to read the timezones.txt file which contains all the time zones and populates the dropdown when the page loads. Currently, the only way to to fix it is to stop and restart the program.  It seems to be an intermittent issue and I'm not sure what behavior reproduces the bug. 



