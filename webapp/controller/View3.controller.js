sap.ui.define([
	"com/soy/sin/jd/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController,
	History) {
	"use strict";

	return BaseController.extend("com.soy.sin.jd.controller.View3", {
		onInit: function(){
		 this.oRouter = this.getOwnerComponent().getRouter();
		 this.oRouter.getRoute("ironman").attachMatched(this.harshul,this);
		},
		harshul: function(oEvent){
			debugger;
			var suppId = oEvent.getParameter("arguments").suppId;
            var sPath = 'fruit>/suppliers/' + suppId;
            this.getView().bindElement(sPath);
		},
		onSelect: function(oEvent){
			debugger;
            var key = oEvent.getSource().getSelectedKey();
            this.getView().byId("idVizFrame").setVizType(key);
        },
		onBack: function(){
			debugger;
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("spiderman", {}, true /*no history*/);
			}
		}
	});
});