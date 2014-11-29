'use strict';

requirejs.config({
    paths: {
        "angular": "../components/angular/angular.min",
        "angular-bootstrap": "../components/angular-bootstrap/ui-bootstrap-tpls.min",
        "bootstrap": "../components/bootstrap/dist/js/bootstrap.min",
        "jquery": "../components/jquery/dist/jquery.min"
    },
    shim: {
        "angular-bootstrap": {
            deps: ["angular"],
            exports: "angular"
        },
        "angular": {
            exports: "angular"
        },
        "bootstrap": {
            deps: ["jquery"]
        }
    },
    priority: [
        "angular"
    ]
});

require(['app'], function(app) {
    app.init();
});
