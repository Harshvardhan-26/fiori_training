sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "com/soy/sin/jd/util/lifeSaver"
], function(Controller,lifeSaver,
	Component) {
	"use strict";
    return Controller.extend("com.soy.sin.jd.controller.BaseController",{
        formatter: lifeSaver
    })

}); 