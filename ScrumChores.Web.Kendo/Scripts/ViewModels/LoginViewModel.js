var loginViewModel = kendo.observable({
    UserName: "",
    FirstName: "",
    LastName: "",
    Password: "",
    RememberMe: false,
    loginDataSource: null,

    initializeLogin: function () {

        var that = this;

        this.set("loginDataSource", new kendo.data.DataSource({
            transport: {
                create: {
                    url: window.loginScrumChores.baseUrl + "Account/Register",
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    data: function () {
                        return {
                            UserName: that.get("UserName"),
                            FirstName: that.get("FirstName"),
                            LastName: that.get("LastName"),
                            Password: that.get("Password"),
                            ConfirmPassword: that.get("Password"),
                            Mobile: "true"
                        }
                    }
                },
                update: {
                    url: window.loginScrumChores.baseUrl + "Account/Login?ReturnUrl=mobile",
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    data: function () {
                        return {
                            UserName: that.get("UserName"),
                            Password: that.get("Password"),
                            RememberMe: that.get("RememberMe")
                        }
                    }
                }
            },
            sync: function (e) {
                console.log("Login complete");

                //Redirect on success.
                window.location.href = 'main.html';
            },
            error: function (e) {
                alert("Invalid Username or Password!  Please try again.");
            },
            schema: {
                model: {
                    id: "UserID",
                    fields: {
                        UserID: { type: "string", validation: { required: true } },
                        UserName: { type: "string", validation: { required: true } },
                        LastName: { type: "string", validation: { required: true } },
                        FirstName: { type: "string", validation: { required: true } },
                        Password: { type: "string", validation: { required: true } },
                        RememberMe: { type: "string", validation: { required: true } }
                    }
                }
            }
        }));

        this.get("loginDataSource").add({ UserID: "LogginIn", UserName: "", Password: "", RememberMe: "" });
    },

    login: function () {

        if ($("#loginform").valid()) {
            //Do the login stuff.
            var thisUser = this.get("loginDataSource").get("LogginIn");
            thisUser.set("UserName", this.get("UserName"));
            thisUser.set("Password", this.get("Password"));
            thisUser.set("RememberMe", this.get("RememberMe"));
            this.get("loginDataSource").sync();
        }
    },
    
    register: function () {
        
        if ($("#regform").valid()) {
            //Do the registration stuff.
            this.get("loginDataSource").add({ UserID: "", UserName: this.get("UserName"), FirstName: this.get("FirstName"), LastName: this.get("LastName"), Password: this.get("Password") });
            this.get("loginDataSource").sync();
        }
    }
});