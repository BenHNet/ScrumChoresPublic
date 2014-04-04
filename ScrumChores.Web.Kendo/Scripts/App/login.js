(function (window, undefined) {

    var loginScrumChores = {

        router: undefined,
        baseUrl: "http://localhost:5155/",
        loginVM: loginViewModel,

        setup: function () {

            this.router = new kendo.Router();

            //setup views and routes
            this.setupViews();
            this.setupRoutes();
            this.router.start();
            this.router.navigate("/login");
        },

        //define views for KendoUI
        setupViews: function () {

            var that = this,
                loginv = document.querySelector("#loginview"),
                regv = document.querySelector("#regview");

            //outerHTML
            that.loginView = new kendo.View(loginv.outerHTML);
            that.registrationView = new kendo.View(regv.outerHTML);

        },

        //defined Routes for KendoUI
        setupRoutes: function () {

            var that = this;

            if (that.router) {

                that.router.route("/login", function () {

                    console.log("login");

                    //destroy other views or they will be markup artifacts on the screen
                    that.registrationView.destroy();

                    that.loginView.render("#main");
                    kendo.bind($("#loginform"), window.loginScrumChores.loginVM);

                });

                that.router.route("/register", function () {

                    console.log("register");

                    //destroy other views or they will be markup artifacts on the screen
                    that.loginView.destroy();

                    that.registrationView.render("#main");
                    kendo.bind($("#regform"), window.loginScrumChores.loginVM);

                });
            }

        },

    };

    return (window.loginScrumChores = loginScrumChores);

}(window));