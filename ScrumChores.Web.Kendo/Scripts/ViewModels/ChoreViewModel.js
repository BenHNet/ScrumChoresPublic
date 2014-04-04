var ChoreViewModel = kendo.observable({

    baseUrl: "",
    storyDataSource: null,
    selectedStory: null,

    initializeStories: function (baseUrl, sprintID) {
        
        this.set("baseUrl", baseUrl);

        var Url;

        if (sprintID == '00000000-0000-0000-0000-000000000000')
            Url = this.get("baseUrl") + "api/Story?$filter=Sprint/SprintID eq null";
        else
            Url = this.get("baseUrl") + "api/Story?$filter=Sprint/SprintID eq guid'" + sprintID + "'";

        // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        this.set("storyDataSource", new kendo.data.DataSource({
            transport: {
                read: {
                    url: Url
                },
                batch: false,
                pageSize: 10,
                schema: {
                    data: function (data) {
                        return data.value;
                    },
                    model: {
                        id: "StoryID",
                        fields: {
                            Title: { type: "string", validation: { required: true } },
                            Description: { type: "string", validation: { required: true } },
                            Effort: { type: "string", validation: { required: true } }
                        }
                    }
                },
                error: function (e) {
                    alert("Error");
                }
            }
        }));
    }
});