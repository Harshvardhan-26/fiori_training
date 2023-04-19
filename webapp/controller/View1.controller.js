sap.ui.define([
	"com/soy/sin/jd/controller/BaseController",
	"sap/ui/core/Fragment",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Filter",
], function (BaseController, Filter ,FilterOperator) {
	"use strict";

	return BaseController.extend("com.soy.sin.jd.controller.View1", {


		// onInit: function(){
        //     this.oRouter = this.getOwnerComponent().getRouter();
        //     this.oRouter.getRoute("superman").attachMatched(this.herculis, this);
        // },
        // //Route Matched handler function
        // herculis: function(oEvent){
        //     debugger;
        //     var fruitId = oEvent.getParameter("arguments").fruitId;
        //     var sPath = '/fruits/' + fruitId;
        //     var oList = this.getView().byId("idList");
        //     var aItems = oList.getItems();
        //     for (let i = 0; i < aItems.length; i++) {
        //         const element = aItems[i];
        //         if(element.getBindingContextPath() === sPath){
        //             var oItemObject = element;
        //             break;
        //         }
        //     }
        //     oList.setSelectedItem(oItemObject);
        // },




		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("superman").attachMatched(this.harshul, this);

		},
		harshul: function(oEvent){
            var fruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = '/fruits/' + fruitId;
            var oList = this.getView().byId("idList");
			if(!oList){
				console.log("nai hai")
			}
			else{
				var aItems = oList.getItems();
            	for (let i = 0; i < aItems.length; i++) {
                const element = aItems[i];
                if(element.getBindingContextPath() === sPath){
                    var oItemObject = element;
                    break;
                }
            }
            oList.setSelectedItem(oItemObject);
			}
           
        },
		onNext: function (myFruitId) {
			this.oRouter.navTo("superman", {
				fruitId: myFruitId
			});
		},
		onItemSelect: function (oEvent) {

			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			var fruitId = sPath.split("/")[sPath.split("/").length - 1];
			this.onNext(fruitId);
		},
		onDelete: function (oEvent) {
			var oToDelete = oEvent.getParameter("listItem");
			var oList = oEvent.getSource();
			oList.removeItem(oToDelete);
		},
		onItemDelete: function () {
			// debugger
			var oList = this.getView().byId("idList");
			var oSelecteditems = oList.getSelectedItems();
			oSelecteditems.forEach(element => {
				oList.removeItem(element)
			})
		},
		onTouch: function(){
			var aFilter =[];
			var oList = this.getView().byId("idList");
			var oSelecteditems = oList.getSelectedItems();
			oSelecteditems.forEach(element =>{
				var sTitle = element.getTitle();
                    var oFilter = new Filter("name",FilterOperator.EQ, sTitle);
                    aFilter.push(oFilter);
			})
			var oFinalFilter = new Filter({
				filters:aFilter,
				and: false
			});
			this.getView().byId("idMyList").getBinding("items").filter(oFinalFilter)
		},

		onSearch: function (oEvent) {
			var sVal = oEvent.getParameter("query");
			if (!sVal) {
				sVal = oEvent.getParameter("newValue");
			}
			// var oVal = oEvent.getParameter("query");
			var oFilter = new sap.ui.model.Filter("CATEGORY", sap.ui.model.FilterOperator.Contains, sVal);
			// var oFilter2 = new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, sVal);
			// var aFilter = [oFilter, oFilter2];
			// var oFilter = new sap.ui.model.Filter({
			// 	filters: aFilter,
			// 	and: false
			// });
			this.getView().byId("idList").getBinding("items").filter(oFilter);
		},
		onAdd:function(){	
			debugger;
			this.oRouter.navTo("add");

		}
	});
});