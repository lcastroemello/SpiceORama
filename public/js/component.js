(function() {
    Vue.component("comment-modal", {
        data: function() {
            return {
                imgInfo: [],
                url: "",
                title: "",
                description: "",
                username: "",
                timestamp: "",
                comments: [],
                comment: "",
                comment_username: "",
                comment_timestamp: ""
            };
        }, //end of data
        mounted: function() {
            var self = this;
            let picId = self.$attrs.id;
            axios
                .get("/myimageboard/" + picId)
                .then(function(resp) {
                    var formData = new FormData();
                    formData.append("url", resp.data[0].rows[0].url);
                    formData.append("title", resp.data[0].rows[0].title);
                    formData.append(
                        "description",
                        resp.data[0].rows[0].description
                    );
                    // let imgTime = moment(
                    //     resp.data[0].rows[0].created_at,
                    //     moment.ISO_8601
                    // ).format("d MMM YYYY, h:mma");
                    formData.append("timestamp", 2);
                    self.imgInfo = resp.data[0].rows[0];
                    self.comments = resp.data[1].rows;
                    console.log("testing resp img", self.imgInfo);
                    console.log("testing resp comment", self.comments);
                })
                .catch(function(err) {
                    console.log("err in get /commentmodal", err);
                });
        }, //end of mounted
        methods: {
            modalsend: function() {
                console.log("modal this", this);
            }
        }, //end of methods
        template: "#comments-template"
    }); //end of comment-modal vue component
})(); //end of ifi
