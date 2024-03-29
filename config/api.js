var NewApiRootUrl = 'https://gr.ufcoux.com/Really/public/index.php/api/'
var NewApiRootUrlGUORAN = 'https://openapi.yunzhangfang.com/open/api/';
// var NewApiRootUrl = 'http://192.168.124.17/Really/public/index.php/api/';
var ImageUrl = 'https://gr-oss.oss-cn-beijing.aliyuncs.com'
// var UploadFileUrl = 'https://image.poempz.com/';

module.exports = {
  ImageUrl, //微信换取code
  WxLogin: NewApiRootUrl + 'Login/', //微信换取code
  WxLoginlogin: NewApiRootUrl + 'Login/login', //微信换取code
  LoginPhone: NewApiRootUrl + 'Login/phone', //当前电话是否存在接口
  LoginMessage: NewApiRootUrl + 'Login/message', //message
  PhoneLogin: NewApiRootUrl + 'Login/phone_login', //用户登录接口


  IndexUrl: NewApiRootUrl + 'Page', //首页 数据接口
  PageNews: NewApiRootUrl + 'Page/news', //新闻列表
  PageNewsPage: NewApiRootUrl + 'Page/news_page', //新闻列表
  PageNewsDetails: NewApiRootUrl + 'Page/news_details', //单条新闻详情


  AddressList: NewApiRootUrl + 'Address', //我的地址列表
  AddressPut: NewApiRootUrl + 'Address/edit', //添加修改地址
  AddressDelete: NewApiRootUrl + 'Address/delete', //删除地址
  // AddressDetails: NewApiRootUrl + 'Address/address_details', //地址详情

  GoodsGoods: NewApiRootUrl + 'Goods/goods', //商品列表
  GoodsDetails: NewApiRootUrl + 'Goods/goods_details', //单个商品详情

  Cart: NewApiRootUrl + 'Cart/', //购物车列表
  CartAdd: NewApiRootUrl + 'Cart/cart_add', //加入购物车
  CartNumber: NewApiRootUrl + 'Cart/cart_number', //购物车加减
  CartDelete: NewApiRootUrl + 'Cart/cart_delete', //购物车删除

  OrderGm: NewApiRootUrl + 'Order/order', //单个商品支付流程
  OrderAllGm: NewApiRootUrl + 'Order/order_all', //多个商品支付流程
  OrderBuyPay: NewApiRootUrl + 'Order/order_sn_pay', //运单支付流程
  OrderSuccess: NewApiRootUrl + 'Order/up_order', //支付成功
  OrderDetail: NewApiRootUrl + 'Order/delite', //订单详情(订单id)
  OrderLogistic: NewApiRootUrl + 'Order/express', //wuliu
  OrderConfirm: NewApiRootUrl + 'Order/yes_goods', //订单确认收货


  OrderDan: NewApiRootUrl + 'Order/',//单个商品下单详情页
  OrderIndexAll: NewApiRootUrl + 'Order/index_all',//批量下单详情页

  GetOrder: NewApiRootUrl + 'User/order',//用户订单列表
  OrderDelete: NewApiRootUrl + 'User/false_delete', //取消订单


  DemoDemo: NewApiRootUrl + 'Demo/demo', //查询所有代账公司下的企业列表
  MessageAdd: NewApiRootUrl + 'Demo/message_add', //提交接口


  DataQySelectByGsid: NewApiRootUrlGUORAN + 'data/qy/selectByGsid', //查询所有代账公司下的企业列表
  DataQySelectByNsrsbh: NewApiRootUrlGUORAN + 'data/qy/selectByNsrsbh', //根据纳税人识别号查询企业信息
  DataTaxSelectTaxReportByNsrsbh: NewApiRootUrlGUORAN + 'data/tax/selectTaxReportByNsrsbh', //根据纳税人识别号查询企业信息


  DataQyselectFullKjbb: NewApiRootUrlGUORAN + 'info/tax/selectFullKjbb', //企业id查找会计报表
  DataQyselectFullmxb: NewApiRootUrlGUORAN + 'info/kmye/selectBalanceSheet', //查询科目余额信息 明细表
  DataQyzcpzSelectSbxx: NewApiRootUrlGUORAN + 'info/zcpz/selectSbxx', //社保信息
  // DataQyselectFullmxb: NewApiRootUrlGUORAN + 'info/gssb/selectPersonalTaxSheet', //查询个税申报明细
   DataQyselectSalesInvoice: NewApiRootUrlGUORAN + 'info/invoice/selectSalesInvoice', //查询销项发票明细
   DataQyselectEntryInvoice: NewApiRootUrlGUORAN + 'info/invoice/selectEntryInvoice', //查询进项发票明细
  DataQyselectPersonalTaxSheet: NewApiRootUrlGUORAN + 'info/gssb/selectPersonalTaxSheet', //查询个税申报明细 工资
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
};