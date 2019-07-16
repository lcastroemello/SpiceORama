(function() {
    new Vue({
        el: ".main",
        data: {
            name: "Livia",
            images: [], //end of images
            title: "",
            description: "",
            username: "",
            file: null
        }, //end of data
        mounted: function() {
            var self = this;
            axios
                .get("/myimageboard")
                .then(function(resp) {
                    self.images = resp.data.rows;
                    console.log("resp.data after images: ", resp.data.rows);
                })
                .catch(function(err) {
                    console.log("err in GET /myimageboard: ", err);
                });
            // those parabrand
        }, //end of mounted COMMAAAA!!
        methods: {
            handleClick: function() {
                console.log("this ", this);
                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("username", this.username);
                formData.append("description", this.description);
                formData.append("file", this.file);
                console.log("formdata ", formData);
                let self = this;
                axios
                    .post("/upload", formData)
                    .then(function(resp) {
                        console.log(
                            "resp.data after new post: ",
                            resp.data.rows
                        );
                        self.images = resp.data.rows;
                    })
                    .catch(function(err) {
                        console.log("error in post/upload: ", err);
                    });
            }, //end of handleClick COMMAAAA
            handleChange: function(e) {
                this.file = e.target.files[0];
            } //end of handleChange
        }
    }); //end of new Vue
})(); //end of ifi d
