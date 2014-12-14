'use strict';

requirejs.config({
    paths: {
        "angular":           "/components/angular/angular.min",
        "angular-bootstrap": "/components/angular-bootstrap/ui-bootstrap-tpls.min",
        "angular-cookies":   "/components/angular-cookies/angular-cookies.min",
        "bootstrap":         "/components/bootstrap/dist/js/bootstrap.min",
        "jquery":            "/components/jquery/dist/jquery.min"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-bootstrap": ["angular"],
        "angular-cookies": ["angular"],
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
