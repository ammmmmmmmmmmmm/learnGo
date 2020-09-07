'use strict';

/**
 * Created by laomao on 2018/5/8.
 */
var CouponsConfig = {
  //标准正常的卡券
  normal: {
    type: "qrcode",
    //类型 qrcode  magcard  exec
    write: true,
    //可输入二维码
    isProduct: false,
    //商品卡券
    query: null,
    //查询
    inputPassword: false,
    //需要输入密码
    password: false,
    //密码卡券
    regex: null //正则表达式

  },
  //有密卡券
  password: {
    type: "qrcode",
    //类型
    write: true,
    //可输入二维码
    isProduct: false,
    //商品卡券
    query: null,
    //查询
    inputPassword: true,
    //需要输入密码
    password: true,
    //密码卡券
    regex: null //正则表达式

  },
  //有密卡券(自动输入，不需要用户输入，通过卡号截取)
  passwordAuto: {
    type: "qrcode",
    //类型
    write: true,
    //可输入二维码
    isProduct: false,
    //商品卡券
    query: null,
    //查询
    inputPassword: false,
    //需要输入密码
    password: true,
    //密码卡券
    regex: [{
      action: "match",
      //action
      pattern: "^(.*)([\\d]{6})$",
      //正则字符串
      attributes: "",
      //修饰符
      key: "coupon_no",
      //对哪个数据的key使用正则
      type: "array",
      //正则返回值的类型
      //正则最终结果的字段处理
      values: {
        coupon_no: [1],
        coupon_pwd: [2]
      }
    }] //正则表达式

  },
  //权益卡-售卖
  rightsCardSale: {
    type: "qrcode",
    //类型
    write: true,
    //可输入二维码
    isProduct: true,
    //商品卡券
    query: {},
    //查询
    inputPassword: false,
    //需要输入密码
    password: false,
    //密码卡券
    regex: [{
      action: "match",
      //action
      pattern: "([\\d]*)([^\\d])(.*)",
      //正则字符串
      attributes: "",
      //修饰符
      key: "coupon_no",
      //对哪个数据的key使用正则
      type: "array",
      //正则返回值的类型
      //正则最终结果的字段处理
      values: {
        coupon_no: [1],
        track2_data: [1, 2, 3]
      }
    }]
  },
  //权益卡-兑换
  rightsCardExc: {
    type: "qrcode",
    //类型
    write: true,
    //可输入二维码
    isProduct: false,
    //商品卡券
    query: {
      /* "method": "POST",
       "apiname": "",
       "extendBody": {},
       "schema": [{"value": "amount"}]*/
    },
    //查询
    inputPassword: false,
    //需要输入密码
    password: false,
    //密码卡券
    //正则表达式
    regex: [{
      action: "match",
      //action
      pattern: "([\\d]*)([^\\d])(.*)",
      //正则字符串
      attributes: "",
      //修饰符
      key: "coupon_no",
      //对哪个数据的key使用正则
      type: "array",
      //正则返回值的类型
      //正则最终结果的字段处理
      values: {
        coupon_no: [1],
        track2_data: [1, 2, 3]
      }
    }]
  }
};
CouponsConfig["default"] = CouponsConfig.normal; ////默认

var configObj = {
  hk009: "normal",
  CRM: "normal",
  DQ卡券: "normal",
  U002801: "password",
  U002802: "passwordAuto",
  U00281: "product",
  U00301: "rightsCard"
};
function sync(obj) {
  (obj.children || []).map(function (o) {
    //console.log(o.code + ":")
    var key = configObj[o.code] || "default";
    var config = CouponsConfig[o.biz_code] || CouponsConfig[key] || CouponsConfig["default"]; //console.log(config)

    o.config = config;
    return o;
  });
  return obj;
}
var CouponsConfig$1 = (function (obj) {
  //console.log('卡券分类', obj)
  return Promise.resolve().then(function () {
    (obj.children || []).map(function (o) {
      //console.log(o.code + ":")
      var key = configObj[o.code] || "default";
      var config = CouponsConfig[o.biz_code] || CouponsConfig[key] || CouponsConfig["default"]; //console.log(config)

      o.config = config;
      return o;
    });
    return obj;
  });
});

exports.CouponsConfig = CouponsConfig$1;
exports.sync = sync;
