using System;
using Microsoft.EntityFrameworkCore;

namespace Clockwork.API.Models
{
    public class ClockworkContext : DbContext
    {
        public DbSet<CurrentTimeQuery> CurrentTimeQueries { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=clockwork.db");
        }
    }

    public class CurrentTimeQuery
    {
        public int CurrentTimeQueryId { get; set; }
        public DateTime Time { get; set; }
        public string ClientIp { get; set; }
        public DateTime UTCTime { get; set; }
        public string TimeZone { get; set; }

        public static DateTime GetTimeZoneTime(string timeZoneId)
        {//explain
            DateTime timeZoneTime = new DateTime();
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
            timeZoneTime = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.Local, timeZoneInfo);
            return timeZoneTime;
        }
    }
}

   
