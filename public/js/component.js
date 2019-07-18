(function() {
    Vue.component("comment-modal", {
        data: function() {
            return {
                images: [],
                url: "",
                title: "",
                description: "",
                username: "",
                timestamp: "",
                comment: "",
                comment_username: "",
                comment_timestamp: ""
            };
        }, //end of data
        mounted: function() {
            var self = this;
            console.log("testing id", self.$attrs.id);
            let picId = self.$attrs.id;
            axios
                .get("/myimageboard/" + picId)
                .then(function(resp) {
                    console.log("testing resp img", resp.data[0].rows[0]);
                    console.log("testing resp comment", resp.data[1].rows[0]);
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
