sap.ui.define([
    'com/soy/sin/jd/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(BaseController,JSONModel, MessageBox,MessageToast) {
    'use strict';
    return BaseController.extend("com.soy.sin.jd.controller.Add",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("add").attachMatched(this.herculis, this);
            this.oLocalModel = new JSONModel();
            this.oLocalModel.setData({
                "prodData": {
					"PRODUCT_ID": "HT-2225",
					"TYPE_CODE": "PR",
					"CATEGORY": "Notebooks",
					"NAME": "Notebook Basic 17",
					"DESCRIPTION": "Notebook Basic 17",
					"SUPPLIER_ID": "0100000047",
					"SUPPLIER_NAME": "Becker Berlin",
					"TAX_TARIF_CODE": "1",
					"MEASURE_UNIT": "EA",
					"PRICE": "1249.00",
					"CURRENCY_CODE": "EUR",
					"DIM_UNIT": "CM",
				}
            });
            this.getView().setModel(this.oLocalModel,"prod");
        },
        herculis: function(oEvent){
            this.setMode("Create");
        },

		//Here we check if the mode is Create mode or Update mode on Create mode the delete is disabled

        mode: "Create",
        setMode: function(sMode){
            this.mode = sMode;
            if(this.mode === "Create"){
                this.getView().byId("idSave").setText("Save");
                this.getView().byId("idDelete").setEnabled(false);
                this.getView().byId("prodId").setEnabled(true);
            }else{
                this.getView().byId("idSave").setText("Update");
                this.getView().byId("idDelete").setEnabled(true);
                this.getView().byId("prodId").setEnabled(false);
            }
        },
        productId: "",

		//when we press enter this function will hit and check whether your data is available on backend if available then we can 
		//update the data if not available then we can create the data
        getImageForProduct: function(sProdId, oDataModel){
            debugger;
            this.getView().byId("myImage").setSrc("/sap/opu/odata/sap/ZHAR_ODATA_SRV/ProductImgSet('" + sProdId + "')/$value");
        },
		onEnter: function(oEvent){
            this.productId = oEvent.getParameter("value");
            var oDataModel = this.getView().getModel();
            var that = this;
            oDataModel.read("/ProductSet('" + this.productId + "')",{
                success: function(data){
                    that.oLocalModel.setProperty("/prodData", data);
                    that.setMode("Update");
                },
                error: function(oError){
                    MessageToast.show("Product not found, please create it");
                    that.setMode("Create");
                }
            })

            this.getImageForProduct(this.productId,oDataModel);

        },

		//This function will hit when we press delete button REMEMBER: Delete button only visible when the data is availabe on the backend other wise button
		//is disabled
		onDelete: function(){
            if(this.productId === ""){
                MessageBox.error("Please enter a valid product id for delete😂");
                return;
            }
            var oDataModel = this.getView().getModel();
            var that = this;
            MessageBox.confirm("Are you sure you want to delete?🥺",{
                onClose: function(status){
                    if(status === "OK"){
                        var that2 = that;
                        oDataModel.remove("/ProductSet('" + that.productId + "')",{
                            success: function(){
                                MessageBox.confirm("Your data is now deleted 😢");
                                that2.onClear();
                            }
                        });
                    }
                }
            });
        },

		//It will give the the expensive product by id
        onExpensive: function(){
            var category = this.getView().byId("category").getSelectedKey();
            var oDataModel = this.getView().getModel();
            var that = this;
            oDataModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters: {
                    "I_CATEGORY" : category
                },
                success : function(data){
                    that.oLocalModel.setProperty("/prodData", data);
                    that.productId = data.PRODUCT_ID;
                    that.setMode("Update");
                }
            });
        },


		//It checks if the data is already on sap with same id then we can update the data if we want to and on the other hand if the data is not available 
		//for that particular id then we can create
        onSave: function(){
            var payload = this.oLocalModel.getProperty("/prodData");
            if(payload.PRODUCT_ID === ""){
                MessageBox.error("Please enter a valid new product Id");
                return;
            }
            var oDataModel = this.getView().getModel();
            if(this.mode === "Create"){
                //POST
                oDataModel.create("/ProductSet", payload,{
                    success: function(data){
                        MessageToast.show("Congratulations! Your Data Is Posted");
                    },
                    error: function(oError){
                        MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                    }
                });
            }else{
                //PUT
                oDataModel.update("/ProductSet('" + this.productId + "')", payload,{
                    success: function(data){
                        MessageToast.show("Hurrey! The data is updated");
                    },
                    error: function(oError){
                        //debugger;
                        MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                    }
                });
            }
        },


        //It will get the image from the backend
        onClear: function(){
            this.setMode("Create");
            this.oLocalModel.setProperty("/prodData",{
				"PRODUCT_ID": "HT-2225",
				"TYPE_CODE": "PR",
				"CATEGORY": "Notebooks",
				"NAME": "Notebook Basic 17",
				"DESCRIPTION": "Notebook Basic 17",
				"SUPPLIER_ID": "0100000047",
				"SUPPLIER_NAME": "Becker Berlin",
				"TAX_TARIF_CODE": "1",
				"MEASURE_UNIT": "EA",
				"PRICE": "1249.00",
				"CURRENCY_CODE": "EUR",
				"DIM_UNIT": "CM",
            });
        }
    });
});