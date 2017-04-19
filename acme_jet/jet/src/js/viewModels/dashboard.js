/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe/mbe', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojchart', 'ojs/ojtoolbar', 'appController'],
 function(oj, ko, $, app, mbe) {
  
    function DashboardViewModel() {
      var self = this;

      // Header Config
       self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};
      
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };


	self.isLoggedIn = ko.observable(false);
 
    //set user to a default value to quicken your login testing
     self.username = ko.observable("heraym");
     self.password = ko.observable("Mostaza.1107");
 
      self.picture = ko.observable(null);
 
//pass callbacks to the login to trigger page behavior on success or failure
 //      self.login = function () {
 //          
 //      mbe.authenticate(self.username(), self.password(), self.loginSuccess, self.loginFailure);
 //               };



 //set user to a default value to quicken your login testing
               self.username = ko.observable("heraym");
               self.picture = ko.observable(null);
 
                //pass callbacks to the login to trigger page behavior on success or failure
                self.login = function () {
                   
                    mbe.authenticate(self.username(), self.password(), self.loginSuccess, self.loginFailure);
                };
 
                //pass callbacks to the login to trigger page behavior on success or failure
                self.logout = function () {
                    mbe.logout();
                    self.isLoggedIn(false);
                };
 
                self.loginSuccess = function (response) {
                    console.log(response);                    
                    self.isLoggedIn(true);
                
            /* chart data */
        
           mbe.getEstadisticas(estSuccess, estError);
           var barSeries = [{name: "Series 1", items: [42, 34]},
                         {name: "Series 2", items: [55, 30]},
                         {name: "Series 3", items: [36, 50]}];
    
          var barGroups = ["Automotor"];
             };

        function estSuccess(response) {
         
             for (i = 0; i < response.data.length; i++) {
                 barSeries[i].name = response.data[i].mes;
                 barSeries[i].items = [ response.data[i].cantidad];
	     }
         
          self.barSeriesValue(barSeries);
          self.barGroupsValue(barGroups);

         }
  
        function estError(response) {
    
         }
 
                self.loginFailure = function (statusCode) {
                    self.isLoggedIn(false);
                    alert("Login failed! " + statusCode);
                };


/***********************************************************************************
Graficos
**************************************************************************************/

/* toggle button variables */
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');
        
        /* chart data */
        var barSeries = [{name: "Series 1", items: [42, 34]},
                         {name: "Series 2", items: [55, 30]},
                         {name: "Series 3", items: [36, 50]}];
    
        var barGroups = ["Group A"];
   
        self.barSeriesValue = ko.observableArray(barSeries);
        self.barGroupsValue = ko.observableArray(barGroups);
        
        /* toggle buttons*/
        self.stackOptions = [
            {id: 'unstacked', label: 'unstacked', value: 'off', icon: 'oj-icon demo-bar-unstack'},
            {id: 'stacked', label: 'stacked', value: 'on', icon: 'oj-icon demo-bar-stack'}
        ];
        self.orientationOptions = [
            {id: 'vertical', label: 'vertical', value: 'vertical', icon: 'oj-icon demo-bar-vert'},
            {id: 'horizontal', label: 'horizontal', value: 'horizontal', icon: 'oj-icon demo-bar-horiz'}
        ];
 
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
