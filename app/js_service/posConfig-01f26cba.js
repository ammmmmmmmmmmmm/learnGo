'use strict';

var service = require('./service-1fe2dbf4.js');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

var _HiposConfigBase;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { service.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* 
**
默认文件请不要随意修改
修改配置请到对应文件进行覆盖
**
*/
// globalThis.HiposConfig.payinListPrint
//默认配置
var HiposConfigBase = (_HiposConfigBase = {
  seatBgColor: "rgba(241, 244, 245, 1)",
  //桌位页面背景颜色，如家为#d8dbdb
  showSeat: false,
  //是否使用桌位
  backPage: "/home",
  //下单回到主页  与showSeat共用     
  //showSeat=false,backPage= "/home"   showSeat=true,backPage= "/seat"
  showUpdataPwq: true,
  // 修改密码功能 如今 false
  showCoupon: true,
  //点餐页左边的券字  如家 false
  showZJMSearch: false,
  //点餐页助记码搜索 如家 true
  showReserve: false,
  //预定功能   如家 true
  showTakeout: true,
  //外卖功能   如家 false
  showComment: true,
  // 点评功能  如家：false；满记：false ; dq: true
  showOrderTakeout: true,
  //外带功能   如家 false
  showSeatOrderTakeout: false,
  //桌位的外带功能快捷键 满记 true
  mergeOrder: false,
  //桌位并单，满记 false,如家 true
  switchSeat: false,
  //桌位换桌，满记 false,如家 true
  multiOpenOrderOnSeat: false,
  //一个桌位是否允许开多单，满记 false,如家 true
  multipleMember: true,
  //是否多会员登录
  showDownOrder: false,
  //是否显示下单按钮 ,不显示下单按钮会被清空按钮代替
  showTurndish: false,
  //是否含有转菜
  showServiceFee: false,
  //是否含有服务费
  showFreedish: false,
  //是否含有免菜
  showReturndish: false,
  //是否含有退菜
  showChangeProNumber: true,
  //是否含有商品改数量
  showSelectPeople: false,
  //是否开单选择人像
  showPrint: false,
  //订单行预打按钮，如家 true,dq false
  showProductPrice: false,
  //商品键盘是否显示商品价格，dq false
  loginMemberToOrder: false,
  //登录会员后是否直接到订单页，false为保留在会员页，//true为如家定制
  showRegisterPwd: true,
  //注册页是否跳转密码页  //false不需密码页为如家定制
  storeCode: false,
  //true:门店编码使用 code  false:门店编码使用us_id（dq定制）
  removeAllMembers: false,
  //退出登录是否删除所有会员，true为如家定制
  payBtnDisabled: false,
  //结账按钮灰掉,true为如家定制
  useBalancePayment: true,
  //是否使用会员余额支付
  initFirstKeyboardPage: true,
  //商品键盘默认渲染第一个固定分类栏的商品 
  couponDiff: false,
  //非会员卡券是否区分产品券和金额券，扫描卡券tab,满记 true
  showPromotionSubmitBtn: false,
  //促销页是否显示确定的提交按钮，false(只要结账按钮)为dq定制
  hiddenMealDetailPrice: true,
  //是否隐藏套餐细项的数量和价格,ture 为隐藏为dq定制
  shiftInfo: false,
  //交班详情是否显示
  autoHangUp: true,
  //点击功能键盘是否自动挂起
  showCancelOrderReason: false,
  //取消订单原因 满记 true,dq false
  showCancelProductReason: false,
  //删除商品原因 满记 true ,
  showCancelPaymentReason: false,
  //取消支付原因 满记 true,dq false
  showTypeTimeFromPro: true,
  //报表查询的权限 满记false, dq true
  isHws: true,
  //云服务，hws 公有云 默认是hws
  takeoutOnAutomatic: true,
  //外卖自动接单
  takeoutPlayVoice: true,
  //外卖语音播报
  shiftING: false,
  // home页当班信息提示
  printPaying: false,
  //支付中打印，每支付成功（支付一部分没完全支付也需要打印）一次打印一次小票
  cancelOrderTurndishAlert: false,
  //取消订单是否提醒要退菜，如家 true; showCancelOrderReason=false 才会触发
  drawABill: false,
  // 账单查询的开发票按钮，如家 true
  orderReknot: false,
  // 账单查询的重结单功能，如家 true
  orderOverflowMoney: false,
  // 账单查询的抹零字段， 如家的字段 true
  needOrderedToPay: false,
  //是否必须下单后再去结账  如家 true
  showTodayPayment: false,
  // 更多操作：每日支付  manji：true
  gateway: "",
  //gateway地址(公有云后台没有配置gateway的地方，临时加个配置，如果有这配置优先拿配置，没这配置拿后台主档配置好的)
  canHandleOrderPro: true,
  //下单后是否还可以增减删商品 ，dq=true  
  showRemoveZero: false,
  //是否含有抹零
  showOrderServingNum: false,
  //首页显示服务中订单数量
  memberRecharge: false,
  //会员充值
  showStock: false,
  //显示估清
  payinMaxMoney: 999999.99,
  // payin/payout的最大金额
  posPrefix: false,
  //开启使用机器号做订单流水号前缀（满记要求）
  payinListPrint: true,
  // payin的列表打印更能， dq：true
  historyListAll: true,
  // 历史订单的全部订单显示，true显示七天历史，false显示营业日全部订单，
  managerOpenDrawer: false,
  // 更多操作的弹钱箱操作显示，
  toCancelPage: false,
  //挂起取消订单跳转直接进入原因
  takeoutIsPrinting: true,
  // 是否打印外卖接单小票
  TakeoutKitchen: true,
  //是否厨房打印
  showTemporaryTable: false,
  //是否显示桌位中的临时桌位点餐button
  showChangeProPrice: false,
  // 允许商品改价
  showChangePeopleNumber: false,
  // 点单界面需要支持编辑人数
  pointOrderDisStock: false,
  // 下单时扣减沽清， true的时候点单的时候扣减沽清，
  showPromotionType: true,
  // 促销分类的显示，默认true， false不显示
  showPaymentPrint: false,
  // showPaymentPrint, 加拿大支付页显示预结账
  isPrintToPayment: false,
  // 是否打印之后在结账，如家限定为true
  PaidUnPrint: false,
  // 支付完成不打印小票，默认false，遇见小面支付不打印小票配置true
  hideSubMember: false,
  // 隐藏确认是否是会员，如家配置true
  pdaPayment: false,
  // pda支付功能。默认false不需要支付，
  showHangUpOrder: false,
  // 挂起功能，true是有false无此功能
  CancelPrint: false,
  // 取消订单打印
  loginToPage: '/home',
  // 登陆跳转页面，默认home页，乐乐茶配置'/order'
  runPromotion: true,
  // 执行促销引擎，默认true执行，（乐乐茶配置false，依赖showPromotionSubmitBtn：true）
  showPaymentMember: false,
  // 支付页显示会员状态，默认不现实，乐乐茶true
  // 商品操作的功能键盘
  kitchenInfoPage: false,
  //厨房信息
  changeCountPage: false,
  //改数量
  serverPage: false,
  //服务费
  seatPage: false,
  //座位号
  returnDishPage: false,
  //退菜
  operationLogPage: false,
  //操作日志
  spliteOrderPage: false,
  //拆单
  productRadioPage: false,
  //优惠
  remarkPage: false
}, service.defineProperty(_HiposConfigBase, "returnDishPage", false), service.defineProperty(_HiposConfigBase, "payKitchenPrint", false), service.defineProperty(_HiposConfigBase, "takeoutThrottle", 3), _HiposConfigBase);

var PosConfig = _objectSpread({}, HiposConfigBase);

exports.PosConfig = PosConfig;
exports.objectWithoutProperties = objectWithoutProperties;
