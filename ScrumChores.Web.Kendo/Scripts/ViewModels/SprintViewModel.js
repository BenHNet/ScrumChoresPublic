var SprintViewModel = kendo.observable({

    baseUrl: "",
    sprintsDataSource: null,
    storyDataSource: null,
    selectedSprintIndex: null,
    selectedSprint: null,
    selectedName: null,
    selectedStartDate: null,
    selectedEndDate: null,
    formTitle: null,
    isSprintAddEditVisible: 'none',

    initializeSprints: function (baseUrl) {

        var that = this;

        console.log("Setting sprintListView to selectable");

        $("#sprintListView").kendoListView({
            selectable: true,
            change: function () {
                var selected = this.select();
                var selectedItem = this.dataSource.getByUid(selected.attr("data-uid"));

                that.set("selectedSprintIndex", this.dataSource.indexOf(selectedItem));
                that.set("selectedSprint", selectedItem);
                that.set("selectedName", that.get("selectedSprint").SprintName);
                that.set("selectedStartDate", that.get("selectedSprint").SprintStartDate);
                that.set("selectedEndDate", that.get("selectedSprint").SprintEndDate);
                console.log(that.selectedSprint.SprintName + " selected!");
                $(document).trigger("sprintSelectedEvent", {});

            }
        });

        this.set("baseUrl", baseUrl);

        this.set("isSprintAddEditVisible", 'none');

        // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        this.set("sprintsDataSource", new kendo.data.DataSource({
            transport: {
                read: {
                    url: baseUrl + "api/Sprint"
                },
                create: {
                    url: baseUrl + "api/Sprint",
                    type: "POST",
                    data: function () {
                        return {
                            SprintID: "",
                            SprintName: that.get("selectedName"),
                            SprintStartDate: that.get("selectedStartDate"),
                            SprintEndDate: that.get("selectedEndDate")
                        }
                    }
                },
                update: {
                    url: function (sprint) {
                        return baseUrl + "api/Sprint" + sprint.SprintID
                    },
                    type: "PUT"
                },
                destroy: {
                    url:function (sprint) {
                        return baseUrl + "api/Sprint" + sprint.SprintID
                    },
                    type: "DELETE"
                }
            },
            sync: function (e) {
                console.log("sync complete");
            },
            schema: {
                model: {
                    id: "SprintID",
                    fields: {
                        SprintID: { type: "string", editable: false, nullable: true },
                        SprintName: { type: "string", validation: { required: true } },
                        SprintStartDate: { type: "string", validation: { required: true } },
                        SprintEndDate: { type: "string", validation: { required: true } }
                    }
                }
            },
            batch: true,
            pageSize: 10,
            error: function (e) {
                alert("Error");
            }
        }));
    },

    createSprint: function () {
        console.log("Creating Sprint");
        this.set("formTitle", "Create New Sprint");
        this.set("selectedName", '');
        this.set("selectedStartDate", '');
        this.set("selectedEndDate", '');
        this.set("isSprintAddEditVisible", 'inline');
    },

    editSprint: function () {
        console.log("Edit Sprint");
        this.set("formTitle", "Edit Sprint");
        this.set("isSprintAddEditVisible", 'inline');
    },

    cancelAddEditSprint: function () {
        console.log("Cancel AddEdit Sprint");
        this.set("isSprintAddEditVisible", 'none');
    },

    saveSprint: function (e) {
        e.preventDefault();

        if (this.get("formTitle") == "Create New Sprint") {
            console.log("Saving Created Sprint");
            this.get("sprintsDataSource").add({ SprintName: this.get("selectedName"), SprintStartDate: this.get("selectedStartDate"), SprintEndDate: this.get("selectedEndDate") });  
        }
        else if (this.get("formTitle") == "Edit Sprint") {
            console.log("Saving Edited Sprint");
            var thisSprint = this.get("sprintsDataSource").get(this.get("selectedSprint").SprintID);
            thisSprint.SprintName = this.get("selectedName");
            thisSprint.selectedStartDate = this.get("selectedStartDate");
            thisSprint.SprintEndDate = this.get("SprintEndDate");
        }

        this.get("sprintsDataSource").sync();
        this.set("isSprintAddEditVisible", 'none');
    },

    deleteSprint: function () {
        console.log("Delete Sprint");
        this.get("sprintsDataSource").remove(this.get("selectedSprintIndex"));
        this.get("sprintsDataSource").sync();
    },
});