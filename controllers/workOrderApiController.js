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

        router.get('/getrandomworkorder', function(req, res) {
            res.send({
                randomWorkOrder: 1003
            });
        });

        router.post("/createWorkOrder", function(req, res) {

            var requestData = {
                "work_order_num": req.body.work_order_num,
                "customer_po_num": req.body.customer_po_num,
                "work_order_by": req.body.work_order_by,
                "created": req.body.date_of_order,
                "date_work_started": req.body.date_work_started
            }

            res.send(requestData);
        })

        router.post("/saveDescription", function(req, res) {
            res.send({
                success: true
            });
        })

        router.post("/updateCustomerDetails", function(req, res) {
            res.send({
                success: "Customer Details Updated"
            })
        })

        router.post("/addNewCustomer", function(req, res) {
            res.send({
                success: "New Customer Added"
            })
        })

        

        app.use('/api', router);

        return app;
    }

})(module.exports);