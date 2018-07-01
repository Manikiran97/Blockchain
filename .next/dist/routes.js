'use strict';

var routes = require('next-routes')();

routes.add('/campaigns/new', '/campaigns/new').add('/campaigns/:address', '/campaigns/show').add('/campaigns/:address/requests', '/campaigns/requests/index').add('/campaigns/:address/newrequest', '/campaigns/requests/newRequest');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFHQSxPQUNPLEFBRFAsSUFDVyxBQURYLGtCQUM2QixBQUQ3QixrQkFFTyxBQUZQLElBRVcsQUFGWCx1QkFFa0MsQUFGbEMsbUJBR08sQUFIUCxJQUdXLEFBSFgsZ0NBRzJDLEFBSDNDLDZCQUlPLEFBSlAsSUFJVyxBQUpYLGtDQUk0QyxBQUo1Qzs7QUFRQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IkU6L01hbmkgRm9sZGVyL0Jsb2NrY2hhaW4vRXRoZXJldW1fVWRlbXlfUHJvamVjdHMvUHJvamVjdDNfS2lja3N0YXJ0In0=