(function() {
    new Vue({
        el: ".main",
        data: {
            name: "Livia",
            images: [] //end of images
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
        }
    }); //end of new Vue
})(); //end of ifi d
