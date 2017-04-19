define(['jquery', 'mcs'], function ($, mcs) {
    //define MCS mobile backend connection details
    var mcs_config = {
        "logLevel": mcs.logLevelVerbose,
        "mobileBackends": {
            "DemoHEA": {
                "default": true,
                "baseUrl": "https://mtinstance-gse00003026.mobileenv.us2.oraclecloud.com:443",
                "applicationKey": "37ca39ed-0e9b-48e7-a086-271923a9f8f9",
                "authorization": {
                    "basicAuth": {
                        "backendId": "42c32538-f0f0-48b4-81d7-354f3c5cf1ca",
                        "anonymousToken": "R1NFMDAwMDMwMjZfTVRJTlNUQU5DRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOm55bHRWbTJfNGtuc2Jv"
                    },
                    "oAuth": {
                        "clientId": "dc7538b1-ca11-428e-beca-35eaa957d167",
                        "clientSecret": "uUMvBDbDGwXgsSRIBdh6",
                        "tokenEndpoint": "https://gse00003026.identity.us.oraclecloud.com/oam/oauth2/tokens"
                    }
                }
            }
        }
    };
 
    function MobileBackend() {
        var self = this;
        self.mobileBackend;
        self.usuario = "usr";
        self.password = "pwd";
        //Always using the same collection in this example, called JETCollection. Can be dynamic if using multiple collections, but for example using one collection.
        var COLLECTION_NAME = "DemoHEA";
        function init() {
            mcs.MobileBackendManager.setConfig(mcs_config);
            //MCS backend name for example is DemoHEA. 
            self.mobileBackend = mcs.MobileBackendManager.getMobileBackend('DemoHEA');
            self.mobileBackend.setAuthenticationType("basicAuth");            
        }
 
        //Handles the success and failure callbacks defined here
        //Not using anonymous login for this example but including here. 
        self.authAnonymous = function () {
            console.log("Authenticating anonymously");
            self.mobileBackend.Authorization.authenticateAnonymous(
                    function (response, data) {                        
                        console.log("Success authenticating against mobile backend");
                    },
                    function (statusCode, data) {
                        console.log("Failure authenticating against mobile backend");                         
                    }
            );
        };
 
        //This handles success and failure callbacks using parameters (unlike the authAnonymous example)
        self.authenticate = function (username, password, successCallback, failureCallback) {
            console.log("Autenticando");
            self.usuario = username;
            self.password = password;
            self.mobileBackend.Authorization.authenticate(username, password, successCallback, failureCallback);
        };

        self.autenticar = function (successCallback, failureCallback) {
             console.log("Autentico");
             self.mobileBackend.Authorization.authenticate(self.usuario, self.password, successCallback, failureCallback);
        };
        self.successCallback = function() { }
 
        //this handles success and failure callbacks using parameters
        self.logout = function (successCallback, failureCallback) {
            self.mobileBackend.Authorization.logout();
        };
 
        self.isAuthorized = function () {
            return self.mobileBackend.Authorization.isAuthorized;
        };
        
        self.uploadFile = function (filename, payload, mimetype, callback) {            
            self.getCollection().then(success);                        
             
            function success(collection) {                
                //create new Storage object and set its name and payload
                var obj = new mcs.StorageObject(collection);
                obj.setDisplayName(filename);
                obj.loadPayload(payload, mimetype);                
                return self.postObject(collection, obj).then(function (object) {                                        
                    callback(object);
                });
            }
        }
         
        //getCollection taken from official documentation example at site https://docs.oracle.com/cloud/latest/mobilecs_gs/MCSUA/GUID-7DF6C234-8DFE-4143-B138-FA4EB1EC9958.htm#MCSUA-GUID-7A62C080-C2C4-4014-9590-382152E33B24
        //modified to use JQuery deferred instead of $q as shown in documentaion
        self.getCollection = function () {
            var deferred = $.Deferred();
 
            //return a storage collection with the name assigned to the collection_id variable.
            self.mobileBackend.Storage.getCollection(COLLECTION_NAME, self.mobileBackend.Authorization.authorizedUserName, onGetCollectionSuccess, onGetCollectionFailed);
 
            return deferred.promise();
 
            function onGetCollectionSuccess(status, collection) {
                console.log("Collection id: " + collection.id + ", description: " + collection.description);
                deferred.resolve(collection);
            }
 
            function onGetCollectionFailed(statusCode, headers, data) {
                console.log(mcs.logLevelInfo, "Failed to download storage collection: " + statusCode);
                deferred.reject(statusCode);
            }
        };
 
        //postObject taken from official documentation example at site https://docs.oracle.com/cloud/latest/mobilecs_gs/MCSUA/GUID-7DF6C234-8DFE-4143-B138-FA4EB1EC9958.htm#MCSUA-GUID-7A62C080-C2C4-4014-9590-382152E33B24
        //modified to use JQuery deferred instead of $q as shown in documentaion
        self.postObject = function (collection, obj) {
            var deferred = $.Deferred();
 
            //post an object to the collection
            collection.postObject(obj, onPostObjectSuccess, onPostObjectFailed);
             
            return deferred.promise();
 
            function onPostObjectSuccess(status, object) {            
                console.log("Posted storage object, id: " + object.id);
                deferred.resolve(object.id);
            }
 
            function onPostObjectFailed(statusCode, headers, data) {
                console.log("Failed to post storage object: " + statusCode);
                deferred.reject(statusCode);
            }
        };
        self.getEstadisticas = function(estSuccess, estError) {
          console.log("Consultar Estadisticas");
          self.mobileBackend.customCode.invokeCustomCodeJSONRequest('Siniestros/estadisticas','GET' ,null).then(estSuccess, estError);
          
        }
        self.getSiniestros = function(estSuccess, estError) {
          console.log("Consultar Siniestros");
          self.mobileBackend.customCode.invokeCustomCodeJSONRequest('Siniestros/siniestro','GET' ,null).then(estSuccess, estError);
          
        }
        self.getProductos = function(estSuccess, estError) {
          console.log("Catalogo de Productos");
          self.mobileBackend.customCode.invokeCustomCodeJSONRequest('Productos/productos','GET',null).then(estSuccess, estError);
        }
       
 
        init();
    }
 
    return new MobileBackend();
});