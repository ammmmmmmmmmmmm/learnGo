'use strict';

require('./main-b469a114.js');
var service = require('./service-564ff112.js');
var mbus = require('./mbus-a32fcde3.js');
require('./posConfig-c7a7f3bf.js');
var sysdata = require('./sysdata-e88d01b3.js');

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
