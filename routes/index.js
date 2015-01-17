module.exports = function(server) {
    var route = {};
    // index.html
    route.index = function (req, res, next) {
        /** Code to get the list of routes**/
        var routes = [];

        server.router.routes.GET.forEach(
            function(value){
                console.log(value.spec.path);
                routes.push({
                    path : value.spec.path,
                    method : 'GET'
                });
            }
        );

        server.router.routes.PUT.forEach(
            function(value){
                console.log(value.spec.path);
                routes.push({
                    path : value.spec.path,
                    method : 'PUT'
                });
            }
        );

        server.router.routes.DELETE.forEach(
            function(value){
                console.log(value.spec.path);
                routes.push({
                    path : value.spec.path,
                    method : 'DELETE'
                });
            }
        );

        server.router.routes.POST.forEach(
            function(value){
                console.log(value.spec.path);
                routes.push({
                    path : value.spec.path,
                    method : 'POST'
                });
            }
        );

        res.send({locals: { routes: routes }});
    };

    server.get('/', route.index);
};
