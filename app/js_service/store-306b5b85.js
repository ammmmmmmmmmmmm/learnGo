'use strict';

require('./main-c092fbbe.js');
var service = require('./service-1fe2dbf4.js');
var mbus = require('./mbus-015f1fcd.js');
require('./posConfig-01f26cba.js');
var sysdata = require('./sysdata-5b03b800.js');

var _dec, _class;
var StoreService = (_dec = mbus.Name("Store"), _dec(_class = /*#__PURE__*/function () {
  function StoreService() {
    service.classCallCheck(this, StoreService);
  }

  service.createClass(StoreService, [{
    key: "Start",
    value: function Start(client, time) {
      sysdata.initialize(client.store_id);
      return {
        username: "Eric",
        action: time
      };
    }
  }]);

  return StoreService;
}()) || _class);

exports.default = StoreService;
