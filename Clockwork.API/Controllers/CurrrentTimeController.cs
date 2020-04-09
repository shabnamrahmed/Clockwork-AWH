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
        {
            var utcTime = DateTime.UtcNow;
            var serverTime = DateTime.Now;
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();

            var returnVal = new CurrentTimeQuery
            {
                UTCTime = utcTime,
                ClientIp = ip,
                Time = CurrentTimeQuery.GetTimeZoneTime(requestBody.TimeZoneId),
                TimeZone = requestBody.TimeZoneId
            };

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

            return Ok(returnVal);
        }
    }   

    [Route("api/AllTimes")]
    public class GetAllTimeEntries : Controller
    {
        [HttpGet]
        public IActionResult All ()
        {
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

