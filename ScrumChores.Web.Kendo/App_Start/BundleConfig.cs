using System.Web;
using System.Web.Optimization;

namespace ScrumChores.Web.Kendo
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/chorelist").Include(
                        "~/Scripts/ViewModels/SprintViewModel.js",
                        "~/Scripts/ViewModels/ChoreViewModel.js"));

            bundles.Add(new ScriptBundle("~/bundles/scrumchores").Include(
                        "~/Scripts/App/app.js"));

            bundles.Add(new ScriptBundle("~/bundles/kendoall").Include(
                        "~/Scripts/Kendo/kendo.all.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr.custom.28468.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/Kendo/kendo.common.css",
                      "~/Content/Kendo/kendo.kendo.blueopal.css",
                      "~/Content/bootstrap.css",
                      "~/Content/font-awesome.css",
                      "~/Content/style.css",
                      "~/Content/blue.css"));
        }
    }
}
