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
                comment_timestamp: "",
                img_id: ""
            };
        }, //end of data
        // props: ["id"],
        mounted: function() {
            console.log("testing imageId", this);
            var self = this;
            let picId = self.$attrs.id;
            axios
                .get("/myimageboard/" + picId)
                .then(function(resp) {
                    self.imgInfo = resp.data[0].rows[0];
                    self.comments = resp.data[1].rows;
                    // console.log("testing resp img", self.imgInfo);
                    // console.log("testing resp comment", self.comments);
                })
                .catch(function(err) {
                    console.log("err in get /commentmodal", err);
                });
        }, //end of mounte
        methods: {
            modalsend: function() {
                var self = this;
                let picId = self.$attrs.id;
                let answerobj = {
                    comments: this.comment,
                    username: this.comment_username
                };
                console.log("this is answerobj", answerobj);
                axios
                    .post("/myimageboard/" + picId, answerobj)
                    .then(resp => {
                        console.log(
                            "testing resp modal post",
                            resp.data[1].rows
                        );
                        self.comments = resp.data[1].rows;
                        self.comment = " ";
                        self.comment_username = " ";
                    })
                    .catch(function(err) {
                        console.log("error in post/myimageboard:id ", err);
                    });
            },
            closeMe: function() {
                this.$emit("close");
                console.log("clicking outpg");
            },
            bubble: function(e) {
                e.stopPropagation();
                console.log("click pg");
            }
        }, //end of methods
        watch: {
            picId: function() {
                var self = this;
                let picId = self.$attrs.id;
                axios
                    .get("/myimageboard/" + picId)
                    .then(function(resp) {
                        self.imgInfo = resp.data[0].rows[0];
                        self.comments = resp.data[1].rows;
                    })
                    .catch(function(err) {
                        console.log("err in get /commentmodal", err);
                    });
            }
        },
        template: "#comments-template"
    }); //end of comment-modal vue component
})(); //end of ifi
