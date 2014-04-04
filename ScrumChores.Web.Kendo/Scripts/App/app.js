(function (window, undefined) {

    var appScrumChores = {

        //kendoui router object
        router: undefined,
        baseUrl: "http://localhost:5155/",
        sprintVM: SprintViewModel,
        choreVM: ChoreViewModel,

        setup: function () {

            this.router = new kendo.Router();

            //setup views and routes
            this.setupViews();
            this.setupRoutes();
            this.setupAppValues();
            this.router.start();

        },

        //define views for KendoUI
        setupViews: function () {

            var that = this,
                homev = document.querySelector("#homeview"),
                chorelistv = document.querySelector("#chorelist"),
                choreboardv = document.querySelector("#choreboard");

            //outerHTML
            that.homeView = new kendo.View(homev.outerHTML);
            that.choreListView = new kendo.View(chorelistv.outerHTML);
            that.choreBoardView = new kendo.View(choreboardv.outerHTML);

        },

        //defined Routes for KendoUI
        setupRoutes: function () {

            var that = this;

            if (that.router) {

                that.router.route("/", function () {

                    console.log("home");

                    //destroy other views or they will be markup artifacts on the screen
                    that.choreBoardView.destroy();
                    that.choreListView.destroy();

                    that.homeView.render("#main");

                });

                that.router.route("/chorelist", function () {

                    console.log("chorelist");

                    //destroy other views or they will be markup artifacts on the screen
                    that.choreBoardView.destroy();
                    that.homeView.destroy();

                    that.choreListView.render("#main");
                    that.sprintVM.initializeSprints(that.baseUrl); 
                    kendo.bind($("#sprintPanel"), window.appScrumChores.sprintVM);
                    kendo.bind($("#sprintAddEdit"), window.appScrumChores.sprintVM);

                });

                that.router.route("/choreboard", function () {

                    console.log("choreboard");

                    //destroy other views or they will be markup artifacts on the screen
                    that.homeView.destroy();
                    that.choreListView.destroy();

                    that.choreBoardView.render("#main");

                });

            }

        },

        //Initialize App Values
        setupAppValues: function () {
            
            var that = this;

            $(document).bind("sprintSelectedEvent", function (e) { // subscribe to the viewSwitchedEvent
                that.choreVM.initializeStories(that.baseUrl, window.appScrumChores.sprintVM.selectedSprint.SprintID);
                kendo.bind($("#chorePanel"), window.appScrumChores.choreVM);
            });

        }
    };

    return (window.appScrumChores = appScrumChores);

}(window));