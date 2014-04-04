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
    public class StoryController : ApiController
    {
        private IStoryRepository _StoryRepo;
        private IUserRepository _userRepo;
        private UserManager<ApplicationUser> _userManager;

         public StoryController()
            : this(new StoryRepository(), new UserRepository(), new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        {
        }

         public StoryController(IStoryRepository repoStory, IUserRepository repoUser, UserManager<ApplicationUser> userManager)
        {
            _StoryRepo = repoStory;
            _userRepo = repoUser;
            _userManager = userManager;
        }

        // GET api/<controller>
        [Queryable]
         public IQueryable<Story> Get()
        {
            var user = _userRepo.GetUser(_userManager.FindById(this.User.Identity.GetUserId()).UserID);

            var result = _StoryRepo.GetStoriesForUser(user.Result);

            return result;
        }

    }
}