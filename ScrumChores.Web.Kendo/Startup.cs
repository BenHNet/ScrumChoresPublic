using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ScrumChores.Web.Kendo.Startup))]
namespace ScrumChores.Web.Kendo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
