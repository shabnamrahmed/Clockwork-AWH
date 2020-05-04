using System;
using Microsoft.AspNetCore.Mvc;
using Clockwork.API.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace Clockwork.API.Controllers
{
    [Route("api/CurrentTime")]
    public class CurrentTimeController : Controller
    {
        [HttpPost]
        public IActionResult GetTimeByTimeZone([FromBody] TimeZoneRequestBody requestBody)
        {   // Takes users requested time zone, 
            // creates entry in db and 
            // returns the current time in the requested time zone 
            
            var utcTime = DateTime.UtcNow;            
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();

            // object to be added to db and returned to browser
            var returnVal = new CurrentTimeQuery
            {   
                UTCTime = utcTime,
                ClientIp = ip,
                // converts local time to requested time zone time
                Time = CurrentTimeQuery.GetTimeZoneTime(requestBody.TimeZoneId),                
                TimeZone = requestBody.TimeZoneId
            };
            // Makes connection to the db
            // Adds the CurrentTimeQuery object to the db by the values I outlined
            // Saves those changes 
            using (var db = new ClockworkContext())
            {
                db.CurrentTimeQueries.Add(returnVal);
                var count = db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);

                Console.WriteLine();
                foreach (var CurrentTimeQuery in db.CurrentTimeQueries)
                {
                    Console.WriteLine(" - {0}", CurrentTimeQuery.UTCTime);
                }
            }
            // Response to browser doesn't need all properties in currenttimequery object
            // can select only time and time zone
            return Ok(returnVal);
        }
    }   

    [Route("api/AllTimes")]
    public class GetAllTimeEntries : Controller
    {
        [HttpGet]
        public IActionResult All ()
        {   // Retrieves all saved entries from db
            using (var db = new ClockworkContext())
            {
                List<CurrentTimeQuery> queries = new List<CurrentTimeQuery>();

                Dictionary<string, List<CurrentTimeQuery>> response = new Dictionary<string, List<CurrentTimeQuery>>();

                foreach (CurrentTimeQuery entry in db.CurrentTimeQueries)
                {
                    queries.Add(entry);
                }

                response.Add("data", queries);

                return Ok(response);
            }
            
        }
    }
}

