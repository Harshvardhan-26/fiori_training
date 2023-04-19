sap.ui.define([
    'com/soy/sin/jd/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
	"sap/ui/core/Fragment",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
], function(BaseController,
	MessageBox,
	MessageToast,
	Fragment,
	FilterOperator,
	Filter) {
    'use strict';
    return BaseController.extend("com.soy.sin.jd.controller.View2",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("superman").attachMatched(this.harshul,this);

        },
        harshul: function(oEvent){
            var fruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = '/' + fruitId;
            this.getView().bindElement(sPath,{
                expand: 'To_Supplier'
            });
        },
        onBack: function(){
            debugger;
            this.getView().getParent().to("idView1");
        },
        onSubmit:function(){
            var oResourceModel = this.getView().getModel("i18n");
            var oBundle = oResourceModel.getResourceBundle();
            var msgSucc = oBundle.getText('msgSuccess',["Something"]);
            var msgError = oBundle.getText('msgError');
            MessageBox.confirm("Do you want to save?",{
                title: "Confirmation",
                onClose: function(status){
                    if(status === "OK"){
                        MessageToast.show(msgSucc);
                    }else{
                        MessageBox.error(msgError);
                    }
                }
            })
        },  
        oPopupSupplier: null,
        oCityPopup: null,
        oField: null,
        onFilter: function () {
            var that = this;
            if (!this.oPopupSupplier) {
                Fragment.load({
                    name: 'com.soy.sin.jd.fragments.popup',
                    id: 'supplier',
                    controller: this
                }).then(function (oFragment) {
                    that.oPopupSupplier = oFragment;
                    that.oPopupSupplier.setTitle("Supplier");
                    that.getView().addDependent(that.oPopupSupplier);
                    that.oPopupSupplier.bindAggregation("items",{
                        path : '/suppliers',
                        template: new sap.m.ObjectListItem({
                            title: '{name}',
                            intro: '{sinceWhen}',
                            number: '{contactNo}'
                        })
                    });
                    that.oPopupSupplier.open();
                });
            } else {
                this.oPopupSupplier.open();
            }
        },
        onF4Help: function (oEvent) {
            this.oField = oEvent.getSource();
            var that = this;
            if (!this.oCityPopup) {
                Fragment.load({
                    name: 'com.soy.sin.jd.fragments.popup',
                    id: 'city',
                    controller: this
                }).then(function (oFragment) {
                    that.oCityPopup = oFragment;
                    that.oCityPopup.setTitle("Supplier");
                    that.getView().addDependent(that.oCityPopup);
                    that.oCityPopup.setMultiSelect(false);
                    that.oCityPopup.bindAggregation("items",{
                        path : '/cities',
                        template: new sap.m.ObjectListItem({
                            title: '{name}',
                            intro: '{famousFor}',
                            number: '{otherName}'
                        })
                    });
                    that.oCityPopup.open();
                });
            } else {
                this.oCityPopup.open();
            }
        },
        onConfirmPopup: function(oEvent){
            debugger;
            var sId = oEvent.getSource().getId();
            if(sId.indexOf("city") != -1){
                var oSelectedItemObject = oEvent.getParameter("selectedItem");
                var sText = oSelectedItemObject.getTitle();
                this.oField.setValue(sText);
            }else{
                var aFilter = [];
                var aItems = oEvent.getParameter("selectedItems");
                for(let i=0; i<aItems.length; i++){
                    const element = aItems[i];
                    var sTitle = element.getTitle();
                    var oFilter = new Filter("name",FilterOperator.EQ, sTitle);
                    aFilter.push(oFilter);
                }
                var oFinalFilter = new Filter({
                    filters:aFilter,
                    and: false
                });
                this.getView().byId("idTable").getBinding("items").filter(oFinalFilter)
            }
            
        },
        onSearchEvent:function(oEvent){
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("name", FilterOperator.Contains, sValue );
            var oSelectDialog = oEvent.getSource();
            oSelectDialog.getBinding("items").filter(oFilter);
		},
        onCancel:function(){
            var oResourceModel = this.getView().getModel("i18n");
            var oBundle = oResourceModel.getResourceBundle();
            var msgSuccess = oBundle.getText('msgSuccess',["Something"]);
            var msgError = oBundle.getText('msgError');
            MessageBox.confirm("Do you want to save?",{
                title: "Confirmation",
                onClose: function(status){
                    if(status === "OK"){
                        MessageToast.show(msgSuccess);
                    }else{
                        MessageBox.error(msgError);
                    }
                }
            })
        },
        onPressSupp: function(oEvent){
            // MessageBox.alert("this is under const!")

            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length -1];
            this.oRouter.navTo("ironman",{
                suppId: sIndex  
            });
        }
        
    });
});