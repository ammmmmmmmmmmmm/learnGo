'use strict';

var main = require('./main-b469a114.js');
var service = require('./service-564ff112.js');
var posConfig = require('./posConfig-c7a7f3bf.js');

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    main.aFunction(callbackfn);
    var O = main.toObject(that);
    var self = main.indexedObject(O);
    var length = main.toLength$1(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

var $reduce = arrayReduce.left;



var STRICT_METHOD = service.arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = service.arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
main._export$1({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var reduce = service.entryVirtual('Array').reduce;

var ArrayPrototype = Array.prototype;

var reduce_1 = function (it) {
  var own = it.reduce;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.reduce) ? reduce : own;
};

var FAILS_ON_PRIMITIVES = main.fails$1(function () { main.objectGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
main._export$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !main.correctPrototypeGetter }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return main.objectGetPrototypeOf(main.toObject(it));
  }
});

var getPrototypeOf = main.path.Object.getPrototypeOf;

var getPrototypeOf$1 = getPrototypeOf;

var getPrototypeOf$2 = getPrototypeOf$1;

var nativeGetOwnPropertyNames = service.objectGetOwnPropertyNamesExternal.f;

var FAILS_ON_PRIMITIVES$1 = main.fails$1(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
main._export$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});

var Object$1 = main.path.Object;

var getOwnPropertyNames = function getOwnPropertyNames(it) {
  return Object$1.getOwnPropertyNames(it);
};

var getOwnPropertyNames$1 = getOwnPropertyNames;

var getOwnPropertyNames$2 = getOwnPropertyNames$1;

/**
 * Created by laomao on 2017/11/23.
 */
var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    var _this = this;

    service.classCallCheck(this, Emitter);

    this._config = {
      events: {},
      middles: {},
      action: {},
      middles_g: [],
      output: null
    }; // 注册中间件

    this.use = function (type, middle) {
      //console.log('注册中间件：', typeof type);
      if (typeof type == 'function') {
        _this._config.middles_g.push(type);

        for (var i in _this._config.middles) {
          var guse = function guse() {
            type.apply(void 0, arguments);
          };

          _this.use._use(i, guse);
        }
      } else {
        _this.use.g_use(type);

        _this.use._use(type, middle);
      }
    };

    this.use._use = function (type, middle) {
      var list = _this._config.middles[type];

      if (!list) {
        _this._config.middles[type] = middle;
        return;
      }

      var current = list;

      while (current.next) {
        current = current.next;
      }

      current.next = middle;
    };

    this.use.g_use = function (type) {
      if (!_this._config.middles[type]) {
        var _loop = function _loop(i) {
          //console.log('全局', type, this._config.middles_g[i]);
          var g = function g() {
            var _this$_config$middles;

            (_this$_config$middles = _this._config.middles_g)[i].apply(_this$_config$middles, arguments);
          };

          _this.use._use(type, g);
        };

        //注入全局组件
        for (var i = 0; i < _this._config.middles_g.length; i++) {
          _loop(i);
        }
      }
    };
  } //入口


  service.createClass(Emitter, [{
    key: "entry",
    value: function entry(type) {
      var _this2 = this;

      var formData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        formData: '',
        data: ''
      };
      var this_output = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      //console.log('入口',type,data);
      if (this._config.action[type]) {
        formData = {
          type: type,
          formData: formData.formData,
          data: formData.data
        }; //派发

        var dispatch = function dispatch(data) {
          //console.log('派发', JSON.stringify({type, formData, data}));
          // 调用 middleware
          var middle = _this2._config.middles[type];

          var output = function output(func) {
            //console.log('完成了:', JSON.stringify({type, formData, data}))
            this_output(formData, data);

            if (!_this2._config.output) {
              console.error("没有定义出口");
              return;
            }

            _this2._config.output(formData, data);
          };

          if (middle) {
            var wrapNext = function wrapNext(m) {
              //console.log('m', JSON.stringify({formData, data, m}))
              return function () {
                if (m.next) {
                  m.next(formData, data, wrapNext(m.next));
                } else {
                  output();
                }
              };
            };

            middle(formData, data, wrapNext(middle));
          } else {
            output();
          }
        };

        this._config.action[type](formData, {
          dispatch: dispatch
        });
      } else {
        console.log(type + ' action不存在');
      }
    } //事务

  }, {
    key: "action",
    value: function action(type, func) {
      if (this._config.action[type]) {
        console.error('action必须是唯一的');
        return;
      } //console.log(JSON.stringify(this._config.middles))


      this.use.g_use(type);
      this._config.action[type] = func;
    } //出口

  }, {
    key: "output",
    value: function output(func) {
      if (this._config.output) {
        console.error("出口必须是唯一的");
        return;
      }

      this._config.output = func;
    }
  }]);

  return Emitter;
}();

var interceptor = new Emitter();

var response = new Emitter(); // xu - 和上一句返回的一样

var emitterName = function emitterName(serviceName) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_use";
  return function (target, name, descriptor) {
    var oldValue = descriptor.value;
    oldValue[type] = true;

    if (service.isArray(serviceName)) {
      oldValue._emitterName = serviceName;
    } else if (typeof serviceName == 'string') {
      oldValue._emitterName = serviceName.split(",");
    }

    return oldValue;
  };
}; //


var use = function use(serviceName) {
  return emitterName(serviceName);
};
var res = function res(serviceName) {
  return emitterName(serviceName, '_res');
};

function _toArray(arr) {
  return service.arrayWithHoles(arr) || service.iterableToArray(arr) || service.unsupportedIterableToArray(arr) || service.nonIterableRest();
}

var toArray = _toArray;

var nativeReverse = [].reverse;
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
main._export$1({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (service.isArray$1(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

var reverse = service.entryVirtual('Array').reverse;

var ArrayPrototype$1 = Array.prototype;

var reverse_1 = function (it) {
  var own = it.reverse;
  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.reverse) ? reverse : own;
};

var reverse$1 = reverse_1;

var reverse$2 = reverse$1;

var reduce$1 = reduce_1;

var reduce$2 = reduce$1;

var forEach = service.forEach_1;

var forEach$1 = forEach;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var _context, _context2, _context3;

  var desc = {};

  forEach$1(_context = posConfig.keys(descriptor)).call(_context, function (key) {
    desc[key] = descriptor[key];
  });

  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = reduce$2(_context2 = reverse$2(_context3 = service.slice$1(decorators).call(decorators)).call(_context3)).call(_context2, function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    service.defineProperty$2(target, property, desc);

    desc = null;
  }

  return desc;
}

var applyDecoratedDescriptor = _applyDecoratedDescriptor;

function assert(condition, error) {
  if (!condition) throw error;
}

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function ownKeys(object, enumerableOnly) { var keys = service.keys(object); if (service.getOwnPropertySymbols) { var symbols = service.getOwnPropertySymbols(object); if (enumerableOnly) symbols = service.filter(symbols).call(symbols, function (sym) { return service.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context6; service.forEach(_context6 = ownKeys(Object(source), true)).call(_context6, function (key) { service.defineProperty(target, key, source[key]); }); } else if (service.getOwnPropertyDescriptors) { service.defineProperties(target, service.getOwnPropertyDescriptors(source)); } else { var _context7; service.forEach(_context7 = ownKeys(Object(source))).call(_context7, function (key) { service.defineProperty$1(target, key, service.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var GetOrderDb = service.DbProxy.GetOrderDb;
var OrderProxy = (_dec = res('TableService.getOrdersByTable'), _dec2 = res('TableService.getOrderById'), _dec3 = res('TableService.getOrdersByZone'), _dec4 = res('TableService.merge'), _dec5 = res('TableService.switch'), _dec6 = use(['OrderService.PlaceOrder', 'OrderService.AddOrder', 'OrderService.AddSkuProduct', 'OrderService.AddLineOrder', 'OrderService.CleanLocalOrder', 'OrderService.AddProduct', 'OrderService.AddCombo', 'OrderService.IncreaseOrder', 'OrderService.MinusOrder', 'OrderService.UpdateQty', 'OrderService.UpdateName', 'OrderService.UpdatePlateNo', 'OrderService.AddTopping', 'OrderService.AddComboTopping', 'OrderService.IncreaseTopping', 'OrderService.IncreaseComboTopping', 'OrderService.MinusTopping', 'OrderService.MinusComboTopping', 'OrderService.UpdateToppingQty', 'OrderService.UpdateComboQty', 'OrderService.GetOrderObj', 'OrderService.GetOrderLine', 'OrderService.GetOrderTotal', 'OrderService.GetOrderData', 'OrderService.GetOrderPartLine', 'OrderService.OnEmpty', 'OrderService.EmptyTopping', 'OrderService.EmptyComboTopping', 'OrderService.DelOrder', 'OrderService.DelTopping', 'OrderService.DelComboTopping', 'OrderService.SetPeopleNumber', 'OrderService.SaveTicket', 'OrderService.Payment', 'OrderService.CloseOrder', 'OrderService.CouponVerification', 'OrderService.DownOrder', 'OrderService.Hangup', 'OrderService.Checkout', 'OrderService.Retreat', 'OrderService.Freedish', 'OrderService.SetGroess', 'OrderService.SetServiceFee', 'OrderService.TaxCalculate', 'OrderService.SetPromotionParam', 'OrderService.PaymentToOrder', 'OrderService.ForceEndOrder', 'OrderService.CancelPayment', 'OrderService.PrintSecondScreen', 'OrderService.CancelOrder', 'OrderService.PushMembers', 'OrderService.RemoveZero', 'OrderService.SetMembers', 'OrderService.SetCoupons', 'OrderService.RemoveMembers', 'OrderService.GetMembers', 'OrderService.RetryPayment', 'PromotionService.Execute', 'PromotionService.GetList', 'CouponService.PayProCoupon', 'CouponService.CancelPayProCoupon', 'CouponService.DelCoupon', 'CouponService.Query', 'OrderService.DelTianmao', 'OrderService.AddTianmao', 'OrderService.CustomDiscount', 'OrderService.ChangePeopleNumber', 'OrderService.UpdateSeatNum', // 更新座位号，默认为空
'OrderService.UpdateKitchenInfo', // 更新厨房信息，默认为空
'OrderService.GoToPrint', //更新isPrint
'OrderService.CreateSplitOrder', //拆单后创建子订单
'OrderService.DeletSplitOrder', //子订单添加商品
'OrderService.AddSplitOrder', //子订单添加商品
'OrderService.AddSplitDirectGoods', //子订单添加商品
'OrderService.SetMessage', 'OrderService.SaveSplitOrder', 'OrderService.SetRounding', 'OrderService.MoveRounding', 'OrderService.ReselectSkuOrder', 'OrderService.UpdatePrior']), (_class = /*#__PURE__*/function () {
  function OrderProxy() {
    service.classCallCheck(this, OrderProxy);
  }

  service.createClass(OrderProxy, [{
    key: "main",
    value: function main(formData, req) {
      req.dispatch({
        res: formData.data
      });
    }
    /*@use('TableService.getOrdersByTable')
     getOrdersByTable22222(formData, obj, next){
     console.log("拦截",obj)
     next();
     }*/

  }, {
    key: "getOrdersByTable",
    value: function getOrdersByTable(formData, obj, next) {
      obj.res = obj.res.then(function (res) {
        // console.log('拦截桌位getOrdersByTable接口：', res);
        if (res.status_code == 0) {
          var orderData = [];
          var _data = [];

          for (var i in res.data) {
            var o = res.data[i]; //console.log('当前桌位信息', o);

            if (o && o.id) {
              _data.push(o);

              var t = GetOrderDb(formData.formData[0].store_id || '').GetOrder(o.id);
              orderData.push(t);
            } else {
              console.log('桌位数据异常');
            }
          }

          res.data = _data;

          if (orderData.length) {
            return service.promise.all(orderData).then(function (os) {
              // console.log("成功！！！", os)
              for (var key in os) {
                var _orderData = os[key];

                if (_orderData && _orderData.status != 1) {
                  //过滤record
                  for (var j in _orderData.orderLine) {
                    delete _orderData.orderLine[j].record;
                  }

                  res.data[key] && (res.data[key].orderData = _orderData);
                }
              }

              return res;
            })["catch"](function (e) {
              console.log('proxy error:', e);
              return {
                status_code: 0,
                description: "获取订单失败"
              };
            });
          }
        }

        return res;
      });
      next();
    }
  }, {
    key: "getOrderById",
    value: function getOrderById(formData, obj, next) {
      obj.res = obj.res.then(function (res) {
        //console.log('拦截桌位getOrdersByTable接口：', res);
        if (res.data && res.data.id && res.status_code == 0) {
          return GetOrderDb(formData.formData[0].store_id || '').GetOrder(res.data.id).then(function (data) {
            res.data.orderData = data;
            return res;
          });
        }

        return res;
      });
      next();
    }
  }, {
    key: "getOrdersByZone",
    value: function getOrdersByZone(formData, obj, next) {
      obj.res = obj.res.then(function (res) {
        if (res) {
          var ids = service.map(res).call(res, function (o) {
            return o.id;
          });

          return GetOrderDb(formData.formData[0].store_id || '').GetOrder(ids).then(function (data) {
            // console.log('打开订单结果：', data);
            if (data && data.docs) {
              var _context;

              return service.map(_context = res || []).call(_context, function (o, index) {
                var orderData = data.docs[index];

                if (orderData) {
                  o.orderData = orderData;
                }

                return o;
              });
            }

            return res;
          }); //console.log('getOrdersByZone！！！！！！！！', ids, res);
        }

        return res;
      });
      next();
    } //并单

  }, {
    key: "merge",
    value: function merge(formData, obj, next) {
      obj.res = obj.res.then(function (res) {
        var _formData$formData = toArray(formData.formData),
            c = _formData$formData[0],
            ids = service.slice(_formData$formData).call(_formData$formData, 1);

        if (ids.length > 1) {
          return GetOrderDb(formData.formData[0].store_id || '').GetOrder(ids).then(function (_o) {
            // console.log('打开之后的', _o);
            if (_o && _o.docs) {
              var _o$docs = toArray(_o.docs),
                  order = _o$docs[0],
                  data = service.slice(_o$docs).call(_o$docs, 1);

              if (order) {
                order.peopleNumber = service._parseInt(order.peopleNumber);

                for (var i in data) {
                  var o = data[i];

                  if (o) {
                    var _context2;

                    order.peopleNumber += service._parseInt(o.peopleNumber);
                    order.orderLine = service.concat(_context2 = []).call(_context2, service.toConsumableArray(order.orderLine), service.toConsumableArray(o.orderLine));
                  }
                } // console.log('合并之后的', order);
                //todo 先计算一下价格再保存


                var _order = new service.OrderIndex(order); //console.log('什么鬼',_order);


                return _order.Save(formData.formData[0]).then(function (r) {
                  if (r.status_code === 0) {
                    console.log('合并成功！！！'); //todo 先暂时删除

                    for (var _i in data) {
                      GetOrderDb(formData.formData[0].store_id || '').DeleteOrderById(data[_i].ticketId);
                    }
                  }

                  return res;
                });
                /*return GetOrderDb(formData.formData[0].store_id || '').SaveOrder(order).then(r => {
                 if (r.ok) {
                 console.log('合并成功！！！');
                 //todo 先暂时删除
                 for (let i in data) {
                 GetOrderDb(formData.formData[0].store_id || '').DeleteOrderById(data[i].ticketId);
                 }
                  }
                 return res;
                 })*/
              }
            }

            return res;
          });
        } //console.log('并桌了：', ids, formData, res);


        return res;
      });
      next();
    } //转桌

  }, {
    key: "switch",
    value: function _switch(formData, obj, next) {
      obj.res = obj.res.then(function (res) {
        //console.log('拦截转桌', formData.formData[0],"||||", obj, res);
        if (res.data && res.data.id && res.status_code == 0) {
          return GetOrderDb(formData.formData[0].store_id || '').GetOrder(res.data.id).then(function (data) {
            if (data) {
              var _context3;

              var order = new service.OrderIndex(data);
              data = order.GetOrderData();

              service.map(_context3 = data.orderLine).call(_context3, function (_goods) {
                //console.log('转桌的菜',_goods.status);
                if (!_goods.status || _goods.status == 'INIT') {
                  return _goods;
                }

                _goods.SetRecord({
                  status: 'TURNORDER',
                  ticketFrom: res.data.id,
                  //被转菜订单id
                  ticketTo: res.data.id,
                  //转菜订单id
                  tableFrom: res.data.from && res.data.from.id,
                  //被转菜桌位id
                  tableTo: res.data.to && res.data.to.id,
                  //转菜桌位id
                  msg: '转菜'
                });

                return _goods;
              });

              data.SetTableId(res.data.tid);
              data.SetTableNo(res.data.to && res.data.to.name);
              data.SetTableZoneId(res.data.to && res.data.to.zone_id); //console.log('订单数据：：>>', data);
              //console.log('厨房打印》》', data);

              service.Print.Kitchen(data, formData.formData[0]);
              return order.Save(formData.formData[0], false).then(function (_res) {
                //console.log('保存结果：', _res);
                if (_res.status_code == 0) {
                  return res;
                }

                return _res;
              });
            }

            return res;
          });
        }

        return res;
      });
      next();
    } //

  }, {
    key: "getOrder",
    value: function () {
      var _getOrder = main.asyncToGenerator( /*#__PURE__*/main.C__Users____Documents_hipos_service_node_modules__babel_runtimeCorejs3_regenerator.mark(function _callee(payload, obj, next) {
        var _context4, _obj$res, client, ticketId, order, store, _obj$res2, c, ticketId2, args;

        return main.C__Users____Documents_hipos_service_node_modules__babel_runtimeCorejs3_regenerator.wrap(function _callee$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _obj$res = service.slicedToArray(obj.res, 2), client = _obj$res[0], ticketId = _obj$res[1];
                assert(ticketId, {
                  status_code: 1,
                  err: 'ticketId 不可为空'
                });
                _context5.next = 5;
                return GetOrderDb(client === null || client === void 0 ? void 0 : client.store_id).GetOrder(ticketId);

              case 5:
                order = _context5.sent;
                _context5.next = 8;
                return service.Store.Order(client).Current();

              case 8:
                store = _context5.sent;
                _obj$res2 = toArray(obj.res), c = _obj$res2[0], ticketId2 = _obj$res2[1], args = service.slice(_obj$res2).call(_obj$res2, 2); //console.log('过虑参数',[c,res, ...args],obj.res)

                obj.res = service.concat(_context4 = [c, _objectSpread(_objectSpread({}, store), {}, {
                  order: new service.OrderIndex(order)
                })]).call(_context4, service.toConsumableArray(args));
                next();
                _context5.next = 19;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](0);
                obj.end = true;
                obj.res = _context5.t0;
                next();

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));

      function getOrder(_x, _x2, _x3) {
        return _getOrder.apply(this, arguments);
      }

      return getOrder;
    }()
  }]);

  return OrderProxy;
}(), (applyDecoratedDescriptor(_class.prototype, "getOrdersByTable", [_dec], service.getOwnPropertyDescriptor(_class.prototype, "getOrdersByTable"), _class.prototype), applyDecoratedDescriptor(_class.prototype, "getOrderById", [_dec2], service.getOwnPropertyDescriptor(_class.prototype, "getOrderById"), _class.prototype), applyDecoratedDescriptor(_class.prototype, "getOrdersByZone", [_dec3], service.getOwnPropertyDescriptor(_class.prototype, "getOrdersByZone"), _class.prototype), applyDecoratedDescriptor(_class.prototype, "merge", [_dec4], service.getOwnPropertyDescriptor(_class.prototype, "merge"), _class.prototype), applyDecoratedDescriptor(_class.prototype, "switch", [_dec5], service.getOwnPropertyDescriptor(_class.prototype, "switch"), _class.prototype), applyDecoratedDescriptor(_class.prototype, "getOrder", [_dec6], service.getOwnPropertyDescriptor(_class.prototype, "getOrder"), _class.prototype)), _class));

var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5$1, _dec6$1, _dec7, _dec8, _dec9, _dec10, _dec11, _class$1;
var GetTsDb = service.DbProxy.GetTsDb;
var TableProxy = (_dec$1 = res('OrderService.GetOrderData'), _dec2$1 = res('OrderService.PlaceOrder'), _dec3$1 = res('OrderService.AddOrder'), _dec4$1 = res('OrderService.AddSkuProduct'), _dec5$1 = res('OrderService.IncreaseOrder'), _dec6$1 = res('OrderService.MinusOrder'), _dec7 = res('OrderService.AddTopping'), _dec8 = res('OrderService.IncreaseTopping'), _dec9 = res('OrderService.MinusTopping'), _dec10 = res('OrderService.OnEmpty'), _dec11 = res('OrderService.GetOrderList'), (_class$1 = /*#__PURE__*/function () {
  function TableProxy() {
    service.classCallCheck(this, TableProxy);
  }

  service.createClass(TableProxy, [{
    key: "main",
    value: function main(formData, req) {
      req.dispatch({
        res: formData.data
      });
    }
  }, {
    key: "_orderData",
    value: function _orderData(p, store_id) {
      return service.promise.resolve(p).then(function (res) {
        if (res.status_code === 0 && res.data && res.data.tableId) {
          return GetTsDb(store_id).getTableById(res.data.tableId).then(function (ret) {
            res.data.tableData = ret;
            return res;
          })["catch"](function (e) {
            return e;
          });
        }

        return res;
      });
    }
  }, {
    key: "GetOrderData",
    value: function GetOrderData(formData, obj, next) {
      // console.log('OrderService GetOrderData', 'formData', formData,  formData.formData, 'obj', obj)
      var store_id = formData.formData[0].store_id || ''; // console.log('store_id', store_id)

      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "PlaceOrder",
    value: function PlaceOrder(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "AddOrder",
    value: function AddOrder(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "AddSkuProduct",
    value: function AddSkuProduct(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "IncreaseOrder",
    value: function IncreaseOrder(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "MinusOrder",
    value: function MinusOrder(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "AddTopping",
    value: function AddTopping(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "IncreaseTopping",
    value: function IncreaseTopping(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "MinusTopping",
    value: function MinusTopping(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "OnEmpty",
    value: function OnEmpty(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = this._orderData(obj.res, store_id);
      next();
    }
  }, {
    key: "GetOrderList",
    value: function GetOrderList(formData, obj, next) {
      var store_id = formData.formData[0].store_id || '';
      obj.res = obj.res.then(function (res) {
        if (res.status_code == 0) {
          //console.log('历史订单：', res);
          var tableData = [];

          for (var i in res.data) {
            var o = res.data[i];

            if (o.tableId) {
              tableData.push(GetTsDb(store_id).getTableById(o.tableId));
            } else {
              tableData.push(service.promise.resolve(null));
            }
          }

          return service.promise.all(tableData).then(function (tdata) {
            var _context;

            //console.log('桌位数据！！！！！！！！', tdata);
            service.map(_context = res.data).call(_context, function (obj, index) {
              obj.tableData = tdata[index];
              return obj;
            });

            return res;
          });
          /*let kk = res.data.map((o) => {
           if (o.tableId) {
           //console.log('有桌位：', o);
           return ts.getTableById(o.tableId).then((ret) => {
           o.tableData = ret;
           return o;
           })
           }
           return o;
           })*/
        }

        return res;
      });
      next();
    }
  }]);

  return TableProxy;
}(), (applyDecoratedDescriptor(_class$1.prototype, "GetOrderData", [_dec$1], service.getOwnPropertyDescriptor(_class$1.prototype, "GetOrderData"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "PlaceOrder", [_dec2$1], service.getOwnPropertyDescriptor(_class$1.prototype, "PlaceOrder"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "AddOrder", [_dec3$1], service.getOwnPropertyDescriptor(_class$1.prototype, "AddOrder"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "AddSkuProduct", [_dec4$1], service.getOwnPropertyDescriptor(_class$1.prototype, "AddSkuProduct"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "IncreaseOrder", [_dec5$1], service.getOwnPropertyDescriptor(_class$1.prototype, "IncreaseOrder"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "MinusOrder", [_dec6$1], service.getOwnPropertyDescriptor(_class$1.prototype, "MinusOrder"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "AddTopping", [_dec7], service.getOwnPropertyDescriptor(_class$1.prototype, "AddTopping"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "IncreaseTopping", [_dec8], service.getOwnPropertyDescriptor(_class$1.prototype, "IncreaseTopping"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "MinusTopping", [_dec9], service.getOwnPropertyDescriptor(_class$1.prototype, "MinusTopping"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "OnEmpty", [_dec10], service.getOwnPropertyDescriptor(_class$1.prototype, "OnEmpty"), _class$1.prototype), applyDecoratedDescriptor(_class$1.prototype, "GetOrderList", [_dec11], service.getOwnPropertyDescriptor(_class$1.prototype, "GetOrderList"), _class$1.prototype)), _class$1));

/**
 * 代理
 */

var ProxyObj = /*#__PURE__*/Object.freeze({
  __proto__: null,
  OrderProxy: OrderProxy,
  TableProxy: TableProxy
});

/**
 * Created by laomao on 2017/12/12.
 */

/**
 * 代理
 */
var ModelBase = /*#__PURE__*/function () {
  function ModelBase() {
    service.classCallCheck(this, ModelBase);
  }

  service.createClass(ModelBase, [{
    key: "main",
    value: function main(formData, req) {
      req.dispatch({
        res: formData.data
      });
    }
  }]);

  return ModelBase;
}();

/**
 * 业务总线
 * 返回装饰器 针对类的
 */
var debug = require('debug')('hex:hiposNewAge:api:mbus');
var ProxyClass = {}; //const ServiceClass = {};
var invokeNumber = 1; //总出口

interceptor.output(function (formData, data) {
  /*console.log("\n\n\n")
   console.log('总出口', JSON.stringify({formData, data}))
   console.log("\n\n\n")*/
});
response.output(function (formData, data) {
  /*console.log("\n\n\n")
   console.log('总出口', JSON.stringify({formData, data}))
   console.log("\n\n\n")*/
}); //收集api

var _tmpapiData = {};

window.getApiData = function () {

  for (var i in _tmpapiData) {
    var _arr = _tmpapiData[i];

    for (var j in _arr) {
      var name = _arr[j];
    }
  }
};

var timeVaue = {};

var mtime = function mtime(data) {
  timeVaue[data] = new Date().getTime();
}; // 记录执行时间

var Name = function Name(__name) {
  var ProxyName = __name + 'Proxy';
  var ServiceName = __name + 'Service';

  if (!ProxyClass[ProxyName]) {
    var M = ProxyObj[ProxyName] || ModelBase;
    ProxyClass[ProxyName] = new M();

    var Ms = getOwnPropertyNames$2(getPrototypeOf$2(ProxyClass[ProxyName])); //serviceName


    var _loop = function _loop(i) {
      var _func = ProxyClass[ProxyName][Ms[i]];

      if (typeof _func == 'function') {
        if (_func._use) {
          //console.log('中间件',_func,_func._emitterName)
          for (var _i in _func._emitterName) {
            //console.log('use:',_func._emitterName[i])
            interceptor.use(_func._emitterName[_i], function () {
              for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
              }

              console.log('@Name args：', arg); //debug("invoke use %s to %s %o", ProxyName, _func._emitterName, arg);

              _func.apply(ProxyClass[ProxyName], arg);
            });
          }
        } else if (_func._res) {
          for (var _i2 in _func._emitterName) {
            //console.log(_func._emitterName[i])
            response.use(_func._emitterName[_i2], function () {
              for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arg[_key2] = arguments[_key2];
              }

              //debug("invoke res %s to %s %o", ProxyName, _func._emitterName, arg);
              _func.apply(ProxyClass[ProxyName], arg);
            });
          }
        }
      }
    };

    for (var i in Ms) {
      _loop(i);
    }
  }

  return function (c) {
    var Service = function Service() {};

    var proxy = ProxyClass[ProxyName];
    var ServiceClass = new c();

    var serviceFuns = getOwnPropertyNames$2(getPrototypeOf$2(ServiceClass));

    var _loop2 = function _loop2(_i3) {
      var name = serviceFuns[_i3];
      if (name == 'constructor') return "continue";
      var type = ServiceName + '.' + name; //临时收集

      var __model = ServiceName.replace(/Service/, '');

      _tmpapiData[__model] || (_tmpapiData[__model] = []);

      _tmpapiData[__model].push(name);

      debug("Registration mbus %s", type);
      interceptor.action(type, function (formData, req) {
        //console.log('use::::::::::::::::',formData, req);
        req.dispatch({
          res: formData.data
        });
      });
      response.action(type, function () {
        for (var _len3 = arguments.length, arg = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          arg[_key3] = arguments[_key3];
        }

        proxy.main.apply(proxy, arg);
      });

      Service.prototype[name] = function () {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        var clientData = args.pop(); //console.log("客户端信息",clientData)
        //console.log('请求接口：'+type);
        //console.log('ServiceName:',ServiceName,"name:",name);
        //Log录制

        if (service.Store.Local(clientData).log) {
          service.Store.PushLog(clientData, {
            server_name: ServiceName,
            // fun_name_cn: api_cn[type] || "",
            fun_name_en: name,
            fun_in_parameter: args,
            timestamp: new Date().getTime()
          });
        } //debug("client %o", clientData);
        //console.log('clientData',clientData);
        //debug("invoke metho %s with args %o", type, args);


        return new service.promise(function (resolve, reject) {
          var _context, _context2;

          var number = invokeNumber;
          mtime(number + '');
          invokeNumber++;

          if (args.length) {
            var str = '';

            for (var _i4 in args) {
              var o = args[_i4];

              var t = service._typeof_1(o);

              if (t == 'object') {
                str += service.stringify(o);
              } else if (t == 'string') {
                str += "\"".concat(o, "\"");
              } else {
                str += o;
              }

              if (_i4 < args.length - 1) {
                str += ',';
              }
            }
          } //这个拦截有点儿诡异，需要优化，暂时注释 by Eric
          // if (type != 'SysService.register' && !SysData.pos_id) {
          //     let res = { status_code: 1, code: "NOT_REGISTER", description: "还没激活！！" };
          //     console.log(mtimeEnd(number + '') + ',invoke metho: ' + type + invokeArgs, ' -> restful:', res);
          //     resolve(res);
          //     return res;
          // }
          //console.log('服务：：', ServiceName)


          if ((ServiceName == 'OrderService' || ServiceName == 'TableService') && type !== 'OrderService.GetExtendData' && type !== 'OrderService.OnExtend') {
            //let user = Store.Local(clientData).user || {};
            //if (!user.id) {
            if (!service.Store.IsLogin(clientData) && clientData.source !== 'kiosk') {
              var res = {
                status_code: 1,
                code: "EMPTY_USER_AUTH",
                description: "login failed"
              };

              resolve(res);
              return res;
            }
          } //拦截器


          interceptor.entry(type, {
            formData: service.concat(_context = [clientData]).call(_context, args),
            data: service.concat(_context2 = [clientData]).call(_context2, args)
          }, function (formData, obj) {
            if (obj.end) {
              // console.log(mtimeEnd(number + '') + ',invoke metho2: ' + type + invokeArgs, ' -> restful:', obj.res);
              resolve(obj.res);
              return;
            }

            service.promise.resolve(obj.res).then(function (res) {
              //console.log("结果：",res);
              //结果集拦截
              response.entry(type, {
                formData: service.toConsumableArray(formData.formData),
                data: ServiceClass[name].apply(ServiceClass, service.toConsumableArray(res))
              }, function (formData, obj) {
                service.promise.resolve(obj.res).then(function (res) {

                  resolve(res);
                });
              });
            });
          });
        });
      };
    };

    for (var _i3 in serviceFuns) {
      var _ret = _loop2(_i3);

      if (_ret === "continue") continue;
    }

    return Service;
  };
};

exports.Name = Name;
exports.reduce_1 = reduce_1;
