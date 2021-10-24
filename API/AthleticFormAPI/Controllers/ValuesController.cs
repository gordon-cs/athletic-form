using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AthleticFormLibrary;
using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.Models;

namespace AthleticFormAPI.Controllers
{
    public class ValuesController : ApiController
    {
        private readonly IDataAccess _dataAccess;

        public ValuesController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        // GET api/values
        public string Get()
        {
            return _dataAccess.Retrieve();
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
