/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'utils', 'jquery', 'appController', 'mbe/mbe', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model'],
        function (oj, ko, utils, $, app, mbe)
        {
            function ProductosViewModel() {
                var self = this;
              
                // Header Config
                self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};

		self.handleActivated = function(info) {
		        // Implement if needed
		        };
                
 		self.handleAttached = function(info) {
		        // Implement if needed
	        };
		self.handleBindingsApplied = function(info) {
        		// Implement if needed
      		};
                self.handleDetached = function(info) {
        	// Implement if needed
      		};
                var defaultLayout = utils.readCookie('productosLayout');
                if (defaultLayout) {
                    self.productosLayoutType = ko.observable(defaultLayout);
                } else {
                    self.productosLayoutType = ko.observable('productosCardLayout');
                }
                self.productos = ko.observableArray([]);
                self.ready = ko.observable(false);
                
                mbe.authAnonymous(self.loginSuccess, self.loginFailure);
		self.loginSuccess = function (response) {
                    console.log(response);                    
		}
                self.loginFailure = function (response) {
                    console.log(response);                    
		}


                self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
                var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_UP);
                var smOnlyQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);

                self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
                self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
                self.small = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                self.smallOnly = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smOnlyQuery);

                //mbe.getProductos(estSuccess, estError);
            
                self.productos([{ "id": "100","nombre": "Notebook RCA C44C2500 Intel Celeron","categoria": "Notebook","genero": "hombre",
"marca": "RCA", "modelo": "",
"descripcion": "Pantalla: 14'' LED. Resolucion 1366 x 768. Procesador Intel Celeron 3215U  1.7 GHz RAM 2 GB 500 GB Disco"},
{ "id": "101","nombre": "Notebook Positivo BGH FX1000 Intel Core M","categoria": "Notebook","genero": "hombre",
"marca": "BGH", "modelo": "",
"descripcion": "Pantalla: 14'' LED. Resolucion 1920 x 1080. Procesador Intel Core M M-SY10c 2 GHz RAM 4 GB 128 GB Disco"},
{ "id": "102","nombre": "Tablet EXO WAVE I007 7'' Intel Negra 16 GB","categoria": "Tablet","genero": "hombre",
"marca": "EXO", "modelo": "",
"descripcion": "Pantalla: 7'' LCD Touch. Resolucion 1024 x 600. Wifi, Bluetooth 4.0, USB 2.0"},
{ "id": "103","nombre": "Tablet EXO WAVE I007 7'' Intel Negra 16 GB","categoria": "Tablet","genero": "hombre",
"marca": "EXO", "modelo": "",
"descripcion": "Pantalla: 7'' LCD Touch. Resolucion 1024 x 600. Wifi, Bluetooth 4.0, USB 2.0"},
{ "id": "104","nombre": "Tablet EXO WAVE I007 7'' Intel Negra 16 GB","categoria": "Tablet","genero": "hombre",
"marca": "EXO", "modelo": "",
"descripcion": "Pantalla: 7'' LCD Touch. Resolucion 1024 x 600. Wifi, Bluetooth 4.0, USB 2.0"},
{ "id": "105","nombre": "Tablet EXO WAVE I007 7'' Intel Negra 16 GB","categoria": "Tablet","genero": "hombre",
"marca": "EXO", "modelo": "",
"descripcion": "Pantalla: 7'' LCD Touch. Resolucion 1024 x 600. Wifi, Bluetooth 4.0, USB 2.0"}]);
                function estSuccess(response) {
                  console.log("Hay productos");
                  var info = self.data();
        
                  for (i = 0; i < response.data.length; i++) {
                     info[i].id = response.data[i].id;
                     info[i].name = response.data[i].descripcion;
                     info[i].asegurado = response.data[i].asegurado;
		     info[i].fecha = response.data[i].fecha;  
	          }
                 self.data(info);
                 }
  
              function estError(response) {
	       console.log("No hay siniestros");    
              }
 
                /* data.fetchData('js/data/employees.json').then(function (people) {
                    self.allPeople(people.employees);
                }).fail(function (error) {
                    console.log('Error in getting People data: ' + error.message);
                }); */

                self.parsePeople = function (response) {
                    return response['employees'];
                };

                self.model = oj.Model.extend({
                    idAttribute: 'empId'
                });

                self.collection = new oj.Collection(null, {
                    url: 'js/data/employees.json',
                    model: self.model
                });

                self.nameSearch = ko.observable('');

                self.filteredProductos = ko.computed(function () {
                    var productosFilter = new Array();

                    if (self.productos().length !== 0) {
                        if (self.nameSearch().length === 0)
                        {
                            productosFilter = self.productos();
                        } else {
                            ko.utils.arrayFilter(self.productos(),
                                    function (r) {
                                        var token = self.nameSearch().toLowerCase();
                                        if (r.nombre.toLowerCase().indexOf(token) === 0) {
                                            productosFilter.push(r);
                                        }
                                    });
                        }
                    }

                    self.ready(true);
                    return productosFilter;
                });

                self.listViewDataSource = ko.computed(function () {
                    return new oj.ArrayTableDataSource(self.filteredProductos(), {idAttribute: 'id'});
                });

                self.cardViewPagingDataSource = ko.computed(function () {
                    return new oj.ArrayPagingDataSource((self.filteredProductos()));
                });

                self.cardViewDataSource = ko.computed(function () {
                    return self.cardViewPagingDataSource().getWindowObservable();
                });

                self.getPhoto = function (id) {
                    var src;
                        src = 'css/images/productos/' + id + '.png';
                     
                    return src;
                };

                self.getEmail = function (emp) {
                    return "mailto:" + emp.email + '@example.net';
                };

                self.getFacetime = function (emp) {
                    return "#";
                };

                self.getChat = function (emp) {
                    return "#";
                };

                self.getOrg = function (org, event) {
                    alert('This will take you to the employee page and highlight the team infotile');
                };

                

                self.cardLayoutHandler = function () {
                    utils.createCookie('productosLayout', 'productosCardLayout');
                    self.productosLayoutType('productosCardLayout');
                };

                self.listLayoutHandler = function () {
                    utils.createCookie('productosLayout', 'productosListLayout');
                    self.productosLayoutType('productosListLayout');
                };

                self.loadPersonPage = function (emp) {
                    if (emp.empId) {
                        // Temporary code until go('person/' + emp.empId); is checked in 1.1.2
                        history.pushState(null, '', 'index.html?root=person&emp=' + emp.empId);
                        oj.Router.sync();
                    } else {
                        // Default id for person is 100 so no need to specify.
                        oj.Router.rootInstance.go('person');
                    }
                };

                self.onEnter = function(data, event){
                    if(event.keyCode === 13){
                        var emp = {};
                        emp.empId = data.empId;
                        self.loadPersonPage(emp);
                    }
                    return true;
                };
                
                self.changeHandler = function (page, event) {
                    if (event.option === 'selection') {
                        if (event.value[0]) {
                            var emp = {};
                            emp.empId = event.value[0];
                            self.loadPersonPage(emp);
                        }
                    }
                };

            }

            return ProductosViewModel;
        });
