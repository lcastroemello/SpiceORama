(function() {
    new Vue({
        el: ".main",
        data: {
            name: "Livia",
            imageId: location.hash.slice(1),
            images: [], //end of images
            title: "",
            description: "",
            username: "",
            file: null,
            id: "",
            enoughImages: true
        }, //end of data
        mounted: function() {
            var self = this;
            addEventListener("hashchange", function() {
                self.imageId = location.hash.slice(1);
                console.log("the hash has changed");
            });
            axios
                .get("/myimageboard")
                .then(function(resp) {
                    self.images = resp.data.rows;
                    console.log("resp.data after images: ", self.images);
                })
                .catch(function(err) {
                    console.log("err in GET /myimageboard: ", err);
                });
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
                        self.title = " ";
                        self.description = " ";
                        self.username = " ";
                    })
                    .catch(function(err) {
                        console.log("error in post/upload: ", err);
                    });
            }, //end of handleClick COMMAAAA
            handleChange: function(e, id) {
                this.file = e.target.files[0];
                console.log("handlechange works", id);
                this.id = id;
                this.commentOpen = true;
            }, //end of handleChange
            more: function() {
                let self = this;
                console.log("more button works");
                axios
                    .get("/more/" + self.images[self.images.length - 1].id)
                    .then(resp => {
                        console.log(
                            "testing LASTID",
                            self.images[self.images.length - 1].id
                        );
                        if (resp.data.length) {
                            self.images = self.images.concat(resp.data);
                        } else {
                            self.enoughImages = false;
                        }
                    })
                    .catch(function(err) {
                        console.log("error in more", err);
                    });
            },
            closeModal: function() {
                this.imageId = null;
                location.hash = "";
                history.replaceState(null, null, " ");
                console.log("testing closeModal PARENT");
            }
        } //end of methods
    }); //end of new Vue
})(); //end of ifi d
