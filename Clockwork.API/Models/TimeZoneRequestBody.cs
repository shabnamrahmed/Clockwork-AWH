
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Clockwork.API.Models
{
    public class TimeZoneRequestBody
    {
        public int id { get; set; }
        public string TimeZoneId { get; set; }
    }
   
}
