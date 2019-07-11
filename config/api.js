var NewApiRootUrl = 'https://gr.ufcoux.com/Really/public/index.php/api/'
var NewApiRootUrlGUORAN = 'http://openapi.yunzhangfang.com/open/api/';
// var NewApiRootUrl = 'http://192.168.124.15/Really/public/index.php/api/';
var UploadFileUrl = 'https://image.poempz.com/';

module.exports = {
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
  OrderDan: NewApiRootUrl + 'Order/',//单个商品下单详情页
  OrderIndexAll: NewApiRootUrl + 'Order/index_all',//批量下单详情页

  GetOrder: NewApiRootUrl + 'User/order',//用户订单列表



  DataQySelectByGsid: NewApiRootUrlGUORAN + 'data/qy/selectByGsid', //查询所有代账公司下的企业列表
  DataQySelectByNsrsbh: NewApiRootUrlGUORAN + 'data/qy/selectByNsrsbh', //根据纳税人识别号查询企业信息
  DataTaxSelectTaxReportByNsrsbh: NewApiRootUrlGUORAN + 'data/tax/selectTaxReportByNsrsbh', //根据纳税人识别号查询企业信息


  DataQyselectFullKjbb: NewApiRootUrlGUORAN + 'info/tax/selectFullKjbb', //企业id查找会计报表
  DataQyselectFullmxb: NewApiRootUrlGUORAN + 'info/kmye/selectBalanceSheet', //查询科目余额信息 明细表
  DataQyzcpzSelectSbxx: NewApiRootUrlGUORAN + 'info/zcpz/selectSbxx', //社保信息
  // DataQyselectFullmxb: NewApiRootUrlGUORAN + 'info/gssb/selectPersonalTaxSheet', //查询个税申报明细
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
  // : NewApiRootUrl + '', //
};