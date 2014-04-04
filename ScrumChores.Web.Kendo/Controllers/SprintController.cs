using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ScrumChores.Business.Repositories;
using ScrumChores.Model.Entities;
using ScrumChores.Model.Interfaces;
using ScrumChores.Web.Kendo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ScrumChores.Web.Kendo.Controllers
{
    public class SprintController : ApiController
    {
        private ISprintRepository _sprintRepo;
        private IUserRepository _userRepo;
        private UserManager<ApplicationUser> _userManager;

         public SprintController()
            : this(new SprintRepository(), new UserRepository(), new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        {
        }

         public SprintController(ISprintRepository repoSprint, IUserRepository repoUser, UserManager<ApplicationUser> userManager)
        {
            _sprintRepo = repoSprint;
            _userRepo = repoUser;
            _userManager = userManager;
        }

        // GET api/<controller>
         [Queryable]
         public IQueryable<Sprint> Get()
        {
            var user = _userRepo.GetUser(_userManager.FindById(this.User.Identity.GetUserId()).UserID);

            var result = _sprintRepo.GetSprintsForUser(user.Result).ToList();
            result.Insert(0, new Sprint() { SprintName = "Backlog" });

            return result.AsQueryable();
        }

        // GET api/<controller>/Guid
        public Sprint Get(Guid id)
        {
            return new Sprint();
        }

        // POST api/<controller>
        public void Post([FromBody]Sprint value)
        {
            _sprintRepo.CreateSprint(value);
        }

        // PUT api/<controller>/Guid
        public void Put(Guid id, [FromBody]Sprint value)
        {
        }

        // DELETE api/<controller>/Guid
        public void Delete(Guid id)
        {
        }
    }
}