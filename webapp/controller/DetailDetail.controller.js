sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
	"use strict";

	return Controller.extend("utg.app.OrderDetail.DetailDetail", {
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();

			this.oRouter = this.oOwnerComponent.getRouter();
			this.oModel = this.getView().getModel("appView");

			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
		},

		handleAboutPress: function () {
			var oNextUIState;
			// this.oOwnerComponent.getHelper().then(function (oHelper) {
				oNextUIState = this.oOwnerComponent.getHelper().getNextUIState(3);
				this.oRouter.navTo("page2", {layout: oNextUIState.layout});
			// }.bind(this));
		},

		_onPatternMatch: function (oEvent) {
			// this._supplier = oEvent.getParameter("arguments").supplier || this._supplier || "0";
			this._product = oEvent.getParameter("arguments").productId || this._product || "0";

			this.getView().bindElement({
				path: "/Products(" + this._product + ")"
			});
		},

		handleFullScreen: function () {
			var sNextLayout = this.getView().getModel("appView").getProperty("/actionButtonsInfo/endColumn/fullScreen");
			this.oRouter.navTo("detailDetail", {layout: sNextLayout, product: this._product});
		},

		handleExitFullScreen: function () {
			var sNextLayout = this.getView().getModel("appView").getProperty("/actionButtonsInfo/endColumn/exitFullScreen");
			this.oRouter.navTo("detailDetail", {layout: sNextLayout, product: this._product});
		},

		handleClose: function () {
			var sNextLayout = this.getView().getModel("appView").getProperty("/actionButtonsInfo/endColumn/closeColumn");
			this.oRouter.navTo("detail", {layout: sNextLayout, product: this._product});
		},

		onExit: function () {
			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});