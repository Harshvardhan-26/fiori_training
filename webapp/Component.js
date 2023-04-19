sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";
    return UIComponent.extend("com.soy.sin.jd.Component",{
        metadata:{
            manifest: "json"
        },
        init: function(){
            UIComponent.prototype.init.apply(this);

            var oRouter = this.getRouter();
            oRouter.initialize();

        },
        // createContent: function(){
        //     var oView = new sap.ui.view("idRootView",{
        //         viewName:"com.soy.sin.jd.view.App",
        //         type:"XML"
        //     });

        //     var oView1 = new sap.ui.view("idView1",{
        //         viewName:"com.soy.sin.jd.view.view1",
        //         type:"XML"
        //     });

        //     var oView2 = new sap.ui.view("idView2",{
        //         viewName:"com.soy.sin.jd.view.view2",
        //         type:"XML"
        //     });

        //     var oAppCon = oView.byId("idAppCon");
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);





        //     return oView;

        // },
        destroy: function(){

        }
    });

    
});