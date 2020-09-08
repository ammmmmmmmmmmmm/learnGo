'use strict';

require('./main-b469a114.js');
var service = require('./service-564ff112.js');
var CouponsConfig = require('./CouponsConfig-a5a54ea1.js');

function ownKeys(object, enumerableOnly) { var keys = service.keys(object); if (service.getOwnPropertySymbols) { var symbols = service.getOwnPropertySymbols(object); if (enumerableOnly) symbols = service.filter(symbols).call(symbols, function (sym) { return service.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context6; service.forEach(_context6 = ownKeys(Object(source), true)).call(_context6, function (key) { service.defineProperty(target, key, source[key]); }); } else if (service.getOwnPropertyDescriptors) { service.defineProperties(target, service.getOwnPropertyDescriptors(source)); } else { var _context7; service.forEach(_context7 = ownKeys(Object(source))).call(_context7, function (key) { service.defineProperty$1(target, key, service.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initFunc = /*#__PURE__*/function () {
  function initFunc() {
    var _this = this;

    service.classCallCheck(this, initFunc);

    this.getParentIds = function (parent) {
      var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (parent && parent.id) {
        ids = service.concat(service.lodash).call(service.lodash, ids, parent.id);
        return _this.getParentIds(parent.parent, ids);
      } else {
        return ids;
      }
    };
  }

  service.createClass(initFunc, [{
    key: "formatProduct",
    //格式化商品
    value: function formatProduct() {
      var _this2 = this;

      var productList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var categoryList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var categoryObj = {};

      service.forEach(service.lodash).call(service.lodash, categoryList, function (c) {
        categoryObj[c.id] = _objectSpread({}, c);
      });

      var productObj = {};

      service.forEach(service.lodash).call(service.lodash, productList, function (p) {
        productObj[p.product_id] = _objectSpread({}, p);
        var prd_categories = []; //商品的分类id，将每一级分类id都放入数组中

        if (p.relation && p.relation.product_category) {
          prd_categories = _this2.getParentIds(categoryObj[p.relation.product_category], prd_categories);
        }

        productObj[p.product_id].categories = prd_categories;
        productObj[p.product_id].has_topping = !!(p.topping && p.topping.length > 0);
      });

      service.productFormatting(productObj);

      for (var key in productObj) {
        var _productObj$key = productObj[key],
            product_id = _productObj$key.product_id,
            code = _productObj$key.code,
            labels = _productObj$key.labels;
        productObj[key] = {
          product_id: product_id,
          code: code,
          extend: _objectSpread({}, productObj[key]),
          labels: labels
        };
      }

      return productObj;
    } //格式化卡券信息

  }, {
    key: "formatCoupon",
    value: function formatCoupon(couponList) {
      return CouponsConfig.sync(couponList);
    } //组装支付键盘

  }, {
    key: "paymentKeyboardAssemble",
    value: function paymentKeyboardAssemble() {
      var _context;

      var keyboard_payment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var paymentObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var childrenData = []; //合并数据

      var mergeKeys = function mergeKeys(data) {
        var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var result = service.map(service.lodash).call(service.lodash, data, function (item) {
          var id = item.id,
              object_id = item.object_id,
              parent_id = item.parent_id,
              bg_color = item.bg_color,
              bg_img = item.bg_img,
              children = item.children,
              type = item.type,
              x = item.x,
              y = item.y;
          var newItem = {
            id: id,
            object_id: object_id,
            parent_id: parent_id,
            bg_color: bg_color,
            bg_img: bg_img,
            children: children,
            type: type,
            x: x,
            y: y,
            depth: depth,
            visible: false
          };

          if (paymentObj[object_id]) {
            newItem.visible = true;
            newItem.payment = paymentObj[object_id];
          } else {
            newItem.payment = {
              name: item.name
            };

            if (type === 'PAYMENT_T') {
              //支付分类
              newItem.visible = true;
            }
          }

          newItem.payment = service.setConfig(newItem.payment);

          if (children) {
            newItem.children = mergeKeys(newItem.children, depth + 1);
          }

          if (depth) {
            childrenData.push(newItem);
          }

          return newItem;
        });

        return result;
      };

      var payment = mergeKeys(keyboard_payment);
      return service.concat(_context = []).call(_context, service.toConsumableArray(payment), childrenData);
    } //格式化支付键盘

  }, {
    key: "formatPaymentKeyboard",
    value: function formatPaymentKeyboard(keyboard_payment, paymentObj, cooperationObj) {
      keyboard_payment = keyboard_payment || [];
      paymentObj = paymentObj || {};
      cooperationObj = cooperationObj || {};
      var data = this.paymentKeyboardAssemble(keyboard_payment, paymentObj);

      var result = service.map(service.lodash).call(service.lodash, data, function (item) {
        item.payment = item.payment || {};

        if (item.payment.cooperation_id) {
          var coop = cooperationObj[item.payment.cooperation_id];
          item.payment.local_app_path = coop.local_app_path || "";
        }

        var id = item.id,
            depth = item.depth;
        return {
          id: id,
          depth: depth,
          extend: _objectSpread({}, item)
        };
      });

      return result;
    }
  }, {
    key: "formatMainKeyboard",
    value: function formatMainKeyboard(mainKeyboardData, ProductObj) {
      var _context5;

      // console.log('mainKeyboardAssemble 商品键盘组装', ProductObj)
      if (!ProductObj) {
        return service.promise.reject({
          status_code: 1,
          code: "DB_DATA_EMPTY",
          description: "没有商品数据"
        });
      }

      var childrenData = []; //合并数据

      var mergeKeys = function mergeKeys(data) {
        var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        data = service.map(data).call(data, function (_item) {
          var alias = _item.alias,
              children = _item.children,
              bg_color = _item.bg_color,
              code = _item.code,
              created = _item.created,
              created_by = _item.created_by,
              font_color = _item.font_color,
              has_sku = _item.has_sku,
              high = _item.high,
              id = _item.id,
              is_overflow = _item.is_overflow,
              key_order = _item.key_order,
              keyboard_id = _item.keyboard_id,
              keyboard_type = _item.keyboard_type,
              name = _item.name,
              object_id = _item.object_id,
              parent_id = _item.parent_id,
              partner_id = _item.partner_id,
              section_id = _item.section_id,
              sku = _item.sku,
              section_order = _item.section_order,
              type = _item.type,
              width = _item.width,
              x = _item.x,
              y = _item.y,
              meal = _item.meal,
              sale_type = _item.sale_type,
              has_topping = _item.has_topping;
          var item = {
            alias: alias,
            children: children,
            bg_color: bg_color,
            code: code,
            created: created,
            created_by: created_by,
            font_color: font_color,
            has_sku: has_sku,
            high: high,
            id: id,
            is_overflow: is_overflow,
            key_order: key_order,
            keyboard_id: keyboard_id,
            keyboard_type: keyboard_type,
            name: name,
            object_id: object_id,
            parent_id: parent_id,
            partner_id: partner_id,
            section_id: section_id,
            sku: sku,
            section_order: section_order,
            type: type,
            width: width,
            x: x,
            y: y,
            depth: depth,
            meal: meal,
            sale_type: sale_type,
            has_topping: has_topping
          };
          item.sale_type || (item.sale_type = "");
          item.meal || (item.meal = {});
          item.children || (item.children = []); //item._id = item.id;

          if (item.type === 'CATEGORY' || item.type === 'EMPTY') {
            //商品分类与自定义分类的按钮
            var _depth = depth + 1;

            item.children = item.children.length > 0 ? mergeKeys(item.children, _depth) : [];
            item.visible = true;
          } else if (item.type === 'ACTION') {
            //操作按钮
            item.visible = true;
          } else {
            //商品按钮
            if (ProductObj[item.object_id]) {
              item.has_topping = ProductObj[item.object_id].has_topping;
              item.make_time = ProductObj[item.object_id].make_time;
              item.visible = true; //console.log('价格>' + ProductObj[item.object_id].retail);

              item.categories = ProductObj[item.object_id].categories || [];
              item.retail = ProductObj[item.object_id].retail || 0;
              item.tax_rate = ProductObj[item.object_id].tax_rate;
              item.relation = ProductObj[item.object_id].relation;
              item.sale_type = ProductObj[item.object_id].sale_type || "";
              item.server_order = ProductObj[item.object_id].server_order || ""; // 上菜顺序

              item.server_order_index = ProductObj[item.object_id].server_order_index || ""; // 上菜顺序

              item.zjm = ProductObj[item.object_id].alias || ""; //助记码

              item.is_price_changeable = !!ProductObj[item.object_id].is_price_changeable; //是否可以改价
              //console.log('is_price_changeable', item.is_price_changeable)

              item.meal = ProductObj[item.object_id].meal || {};
              item.has_weight = ProductObj[item.object_id].has_weight || false;
              item.barcode = ProductObj[item.object_id].barcode || []; //console.log(ProductObj[item.object_id].sale_type)
              //console.log(ProductObj[item.object_id])

              item.name_en = ProductObj[item.object_id].name_en || '';
              item.cup_notice = ProductObj[item.object_id].cup_notice || '';
              item.relation && item.relation.print_category && (item.printCategory = item.relation.print_category); //console.log('是否需要厨打', item.relation, item.printCategory)  

              if (ProductObj[item.object_id].data_state === "DISABLE") {
                item.visible = false;
              } //处理加料


              if (ProductObj[item.object_id].topping) {
                var _context2;

                //console.log(ProductObj[item.object_id].name,'加料_______________-',ProductObj[item.object_id].topping)
                service.map(_context2 = ProductObj[item.object_id].topping).call(_context2, function (top) {
                  //console.log('top',top)
                  item.topping = item.topping ? item.topping : [];
                  var topObj = ProductObj[top];

                  if (topObj) {
                    topObj = _objectSpread({}, topObj);
                    topObj.id = top;
                    topObj.visible = true;
                    item.topping.push(topObj);
                    childrenData.push(topObj);
                  }
                }); //console.log('加料：',item.topping);

              }
            } else {
              //console.log('找不到商品', item)
              item.visible = false;
            }

            if (
            /*ProductObj[item.object_id] && */
            item.has_sku) {
              if (item.sku.length > 0) {
                var _context3;

                item.sku = service.map(_context3 = item.sku).call(_context3, function (s) {
                  if (ProductObj[s.link_product_id]) {
                    item.sale_type = "SPU";
                    s.visible = true;
                    s.retail = ProductObj[s.link_product_id].retail;
                    s.tax_rate = ProductObj[s.link_product_id].tax_rate;
                    s.link_product_name = ProductObj[s.link_product_id].name; // s.link_product_data=ProductObj[s.link_product_id]
                    //处理加料

                    if (ProductObj[s.link_product_id].topping) {
                      var _context4;

                      service.map(_context4 = ProductObj[s.link_product_id].topping).call(_context4, function (top) {
                        s.topping = s.topping ? s.topping : [];

                        if (ProductObj[top]) {
                          s.topping.push(ProductObj[top]);
                        }
                      });
                    }
                  } else {
                    s.visible = false;
                  }

                  return s;
                });

                var visible = service.filter(service.lodash).call(service.lodash, item.sku, function (s) {
                  return s.visible === true;
                });

                if (visible.length !== 0) {
                  item.visible = true;
                }
              } else {
                item.visible = false;
              }
            }
          }

          if (depth) {
            childrenData.push(item);
          }

          return item;
        });
        return data;
      };

      var ddd = mergeKeys(mainKeyboardData || []);

      var mainData = service.concat(_context5 = []).call(_context5, service.toConsumableArray(ddd), childrenData); //console.log('商品键盘合并之后：', mainData)


      return mainData;
    }
  }]);

  return initFunc;
}();

exports.default = initFunc;
