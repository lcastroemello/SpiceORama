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
                commentInfo: [],
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
                    self.imgInfo = resp.data[0].rows[0];
                    self.commentInfo = resp.data[1].rows[0];
                    console.log("testing resp img", self.imgInfo);
                    console.log("testing resp comment", self.commentInfo);
                })
                .catch(function(err) {
                    console.log("err in get /commentmodal", err);
                });
        }, //end of mounted
        methods: {
            // console.log('this component', this);
        }, //end of methods
        template: "#comments-template"
    }); //end of comment-modal vue component
})(); //end of ifi
