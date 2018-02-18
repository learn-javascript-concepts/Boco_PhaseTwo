(function(apiController) {

    apiController.init = function(app) {

        var bodyParser = require('body-parser');  
        var express = require("express");

        var workOrderData = require("../appData/workOrderData");

        var router = express.Router();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        router.get('/getworkorder/:workordernumber', function(req, res) {

            res.json(workOrderData.dataService.getWorkOrderByNumber(req.params.workordernumber));

        });

        router.get('/getdetailedworkorder/:workordernumber', function(req, res) {

            res.json(workOrderData.dataService.getDetailedWorkOrder(req.params.workordernumber));

        });

        router.get('/getallworkorders', function(req, res) {

            res.json(workOrderData.dataService.getAllWorkOrders());

        });

        router.post("/createWorkOrder", function(req, res) {

            var returnData =  {
                "work_order_num": "1001",
                "customer_po_num": "1234567",
                "work_order_by": "Shashank",
                "creationStatus": true
           }

            res.send(returnData);
        })

        app.use('/api', router);

        return app;
    }

})(module.exports);