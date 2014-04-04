using ScrumChores.Business.Repositories;
using ScrumChores.Model.Entities;
using ScrumChores.Model.Interfaces;
using System;
using System.Linq;
using System.Web.Http;

namespace ScrumChores.Web.Kendo.Controllers
{
    public class TaskController : ApiController
    {
        private ISprintTaskRepository _sprintTaskRepo;

         public TaskController()
            : this(new SprintTaskRepository())
        {
        }

         public TaskController(ISprintTaskRepository repoSprintTask)
        {
            _sprintTaskRepo = repoSprintTask;
        }
        
        // GET api/<controller>/5
        public SprintTask Get(Guid id)
        {
            return new SprintTask();
        }

        // POST api/<controller>
        public void Post([FromBody]SprintTask value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]SprintTask value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(Guid id)
        {
        }
    }
}