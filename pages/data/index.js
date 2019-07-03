// pages/data/index/index.js
import * as echarts from '../../components/ec-canvas/echarts';
import util from '../../utils/util';
var appInst = getApp();
var chart;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        switcherTitle: ['纳税', '社保扣费', '资金情况', '资产负债表', '利润表'],
        switcherCurrent: 3,
        dataChartHeadTitles: ['数据图表', '缴费总额', '净流动(元)'],
        colors: ["#7C8DFF", "#FDE683", "#10D98F", "#356AF4", "#FE5153"],
        start_date: '',
        end_date: '',
        picker_date: '',
        picker_date_str: '',
        last_company: '',
        is_first_load: false,
        ec: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth()
        let day = now.getDate()
        if (month==0) {
            month=12;
            year = parseInt(year)-1;
        }
        // let picker_date_str = year + '年' + util.formatNumber(month) + '月'
        // let picker_date = [year, month, '01'].map(util.formatNumber).join('-')
        // this.setData({
        //     picker_date: picker_date,
        //     end_date: picker_date,
        //     picker_date_str: picker_date_str
        // })
        // if (appInst.getUserInfo().type==2) {
            // this.request_company_data();
        // } else {
            // this.request_wechat_data();
        // }
        
    },

    /**
     * 非企业用户,示例数据
     */
    request_wechat_data: function () {
        wx.showToast({
            title: '注：由于您是使用微信登录或未登录，当前展示示例数据',
            icon: 'none',
            duration: 3000,
        });
        let that = this;
        let infos = {
            "nashui": {
                "rows": [
                    { name: "增值税", value: "155.70" },
                    { name: "印花税", value: "83.00" },
                    { name: "地方教育费附加", value: "15.20" },
                    { name: "教育费附加", value: "8.00" },
                    { name: "企业所得税", value: "4.50" }
                ]
            },
            "shebao": {
                rows: [
                    { name: "管理费用-社保企业部分", value: "1342.95" },
                    { name: "其它应收款-社保个人部分", value: "384.58" }
                ]
            },
            "zijin": {
                rows: [
                    { name: "库存现金", value: "134923.13" },
                    { name: "银行存款", value: "853828.22" }
                ]
            },
            "fuzhai": {
                rows: [{
                    name: "资产合计",
                    qichu: "",
                    qimo: "384192.58",
                    rows: [
                        { name: "货币资金", qichu: "", qimo: "14567.86" },
                        { name: "应收票据", qichu: "", qimo: "3385.23" },
                        { name: "应收账款", qichu: "", qimo: "395.22" },
                        { name: "预付账款", qichu: "", qimo: "192.00" },
                        { name: "应收利息", qichu: "", qimo: "5822.41" },
                        { name: "其他应收款", qichu: "", qimo: "3852.45" },
                        { name: "存货", qichu: "", qimo: "8348.24" },
                        { name: "流动资产合计", qichu: "", qimo: "582.45" },
                        { name: "固定资产原价", qichu: "", qimo: "135.86" },
                        { name: "减：累计折旧", qichu: "", qimo: "83.45" },
                        { name: "固定资产账面价值", qichu: "", qimo: "285.23" },
                        { name: "非流动资产合计", qichu: "", qimo: "5823.50" },
                    ]
                }, {
                    name: "负债合计",
                    qichu: "",
                    qimo: "58123.51",
                    rows: [
                        { name: "短期借款", qichu: "", qimo: "3859.45" },
                        { name: "应付票据", qichu: "", qimo: "59238.51" },
                        { name: "应付账款", qichu: "", qimo: "59323.51" },
                        { name: "预收账款", qichu: "", qimo: "3895.23" },
                        { name: "应交税费", qichu: "", qimo: "5829.51" },
                        { name: "应付利息", qichu: "", qimo: "3853.61" },
                        { name: "其他应付款", qichu: "", qimo: "283.21" },
                        { name: "流动负债合计", qichu: "", qimo: "883.41" }
                    ]
                }, {
                    name: "所有者权益合计",
                    qichu: "",
                    qimo: "35812.51",
                    rows: [
                        { name: "实收资本(或股本)", qichu: "", qimo: "38849.12" },
                        { name: "资本公积", qichu: "", qimo: "2398.21" },
                        { name: "盈余公积", qichu: "", qimo:"58239.51" },
                        { name: "未分配利润", qichu: "", qimo: "2934.12" },
                        { name: "所有者权益(或股东权益)合计", qichu: "", qimo: "3495.62" },
                    ]
                }]
            },
            "lirun": {
                rows: [
                    {
                        name: "营业收入",
                        value: "38185.21",
                        rows: [
                            { name: "减：营业成本", value: "3858.83" },
                            { name: "税金及附加", value: "5823.12" },
                            { name: "城市维护建设税", value: "823.12" },
                            { name: "销售费用", value: "6839.61" },
                            { name: "管理费用", value: "3841.52" },
                            { name: "财务费用", value: "2348.15" },
                        ]
                    }, {
                        name: "营业利润",
                        value: "348.15",
                        rows: [
                            { name: "加：营业外收入", value: "34851.23" },
                            { name: "减：营业外支出", value: "8581.24"},
                        ]
                    }, {
                        name: "利润总额",
                        value: "5825.12",
                        rows: [
                            { name: "减：所得税费用", value: "8848.28" },
                        ]
                    }, {
                        name: "净利润",
                        value: "8582.41",
                        rows: []
                    }
                ]
            }
        }
        that.setData({
            infos: infos
        }, function () {
            that.refresh_chart();
        });
    },

    /**
     * 请求企业用户数据
     */
    request_company_data: function () {
        let that = this;
        let param = {
            'name': appInst.getUserInfo().nickname,
            'date': this.data.picker_date,
        }
        console.log(param)
        wx.showLoading({
            title: '载入数据中',
        });
        appInst.post({
            uri: '/api/Eapaccount/select_tax',
            data: param,
            success: function (data) {
                console.log(data);
                wx.hideLoading();
                let toasts = [];
                if (data.one != 1) {
                    toasts.push(data.one)
                }
                if (data.two != 1) {
                    toasts.push(data.two)
                }
                if (data.three != 1 && data.three != undefined) {
                    toasts.push(data.three)
                }
                let toast_string = ""
                for (let i = 0; i < toasts.length; i++) {
                    const str = toasts[i];
                    toast_string += str
                    if (i != toasts.length-1) {
                        toast_string += ' '
                    }
                }
                if (toast_string.length>0) {
                  wx.showToast({
                      title: toast_string,
                      icon: 'none',
                  });
                }

                let infos = {
                    "nashui": {
                        "rows": [
                            { name: "增值税", value: data.zzs1 },
                            { name: "印花税", value: data.yhs1 },
                            { name: "地方教育费附加", value: data.dfjyfj1 },
                            { name: "教育费附加", value: data.jyffj1 },
                            { name: "企业所得税", value: data.qysds1 }
                        ]
                    },
                    "shebao": {
                        rows: [
                            { name: "管理费用-社保企业部分", value: data.sbqybf1 },
                            { name: "其它应收款-社保个人部分", value: data.sbgrbf1 }
                        ]
                    },
                    "zijin": {
                        rows: [
                            { name: "库存现金", value: data.kcxj },
                            { name: "银行存款", value: data.yhck }
                        ]
                    },
                    "fuzhai": {
                        rows: [{
                            name: "资产合计",
                            qichu: "",
                            qimo: data.zczj,
                            rows: [
                                { name: "货币资金", qichu: "", qimo: data.hbzj },
                                { name: "应收票据", qichu: "", qimo: data.yspj },
                                { name: "应收账款", qichu: "", qimo: data.yszk },
                                { name: "预付账款", qichu: "", qimo: data.yfzk1 },
                                { name: "应收利息", qichu: "", qimo: data.yslx },
                                { name: "其他应收款", qichu: "", qimo: data.qtysk },
                                { name: "存货", qichu: "", qimo: data.ch },
                                { name: "流动资产合计", qichu: "", qimo: data.ldzchj },
                                { name: "固定资产原价", qichu: "", qimo: data.gdzcyj },
                                { name: "减：累计折旧", qichu: "", qimo: data.ljzj },
                                { name: "固定资产账面价值", qichu: "", qimo: data.gdzczmjz },
                                { name: "非流动资产合计", qichu: "", qimo: data.fldzchj },
                            ]
                        }, {
                            name: "负债合计",
                            qichu: "",
                            qimo: data.fzhj,
                            rows: [
                                { name: "短期借款", qichu: "", qimo: data.dqjk },
                                { name: "应付票据", qichu: "", qimo: data.yfpj },
                                { name: "应付账款", qichu: "", qimo: data.yfzk },
                                { name: "预收账款", qichu: "", qimo: data.yszk1 },
                                { name: "应交税费", qichu: "", qimo: data.yjsf },
                                { name: "应付利息", qichu: "", qimo: data.yflx },
                                { name: "其他应付款", qichu: "", qimo: data.qtyfk },
                                { name: "流动负债合计", qichu: "", qimo: data.ldfzhj }
                            ]
                        }, {
                            name: "所有者权益合计",
                            qichu: "",
                            qimo: data.syzqy,
                            rows: [
                                { name: "实收资本(或股本)", qichu: "", qimo: data.sszb },
                                { name: "资本公积", qichu: "", qimo: data.zbgj },
                                { name: "盈余公积", qichu: "", qimo: data.yygj },
                                { name: "未分配利润", qichu: "", qimo: data.wfplr },
                                { name: "所有者权益(或股东权益)合计", qichu: "", qimo: data.syzqy },
                            ]
                        }]
                    },
                    "lirun": {
                        rows: [
                            {
                                name: "营业收入",
                                value: data.yysr,
                                rows: [
                                    { name: "减：营业成本", value: data.yycb },
                                    { name: "税金及附加", value: data.sjjfj },
                                    { name: "城市维护建设税", value: data.cswhjs },
                                    { name: "销售费用", value: data.xsfy },
                                    { name: "管理费用", value: data.glfy },
                                    { name: "财务费用", value: data.cwfy },
                                ]
                            }, {
                                name: "营业利润",
                                value: data.yylr,
                                rows: [
                                    { name: "加：营业外收入", value: data.yywsr },
                                    { name: "减：营业外支出", value: data.yywzc },
                                ]
                            }, {
                                name: "利润总额",
                                value: data.lrze,
                                rows: [
                                    { name: "减：所得税费用", value: data.sdsfy },
                                ]
                            }, {
                                name: "净利润",
                                value: data.jlr,
                                rows: []
                            }
                        ]
                    }
                }
                that.setData({
                    infos: infos
                }, function () {
                    that.refresh_chart();
                });
            }, fail: function() {
                wx.hideLoading();
            }
        })
    },
    

    onShow: function () {
        // 在第二次加载后判断是否更换了公司.
        if (this.is_first_load) {
            this.setData({
                is_first_load: false
            })
        } else {
            // let company = appInst.getUserInfo().nickname;
            // if (appInst.getUserInfo().type == 2) {
            //     if (this.data.last_company != company) {
            //         this.request_company_data();
            //         this.setData({
            //             last_company: company
            //         })
            //     }
            // }
        }
        
    },

    /**
     * 点击切换栏调用的方法
     */
    switcher_action: function (e) {

        this.setData({
            switcherCurrent: e.currentTarget.dataset.idx
        })
        console.log('3chart');
        this.refresh_chart();
    },

    /**
     * 日期选择器action
     */
    picked: function (e) {
        let date = e.detail.value.split('-');
        console.log(date);
        let year = date[0];
        let month = date[1];
        this.setData({
            picker_date: year + '-' + month + '-' + '01',
            picker_date_str: year + '年' + month + '月'
        })
        // if (appInst.getUserInfo().type == 2) {
        //     // this.request_company_data();
        // } else {
        //     // this.request_wechat_data();
        // }
    },

    /**
     * 滚动指定资产负债表section效果
     */
    onscrolling: function (e) {
        if (this.data.switcherCurrent != 3) return;
        let that = this;
        let debts = this.data.debts;

        var betop = wx.createSelectorQuery();
        betop.select('.betop').boundingClientRect();
        betop.exec((res) => {
            if (res.length > 0 && res[0] != null) {
                that.setData({
                    betopHeight: res[0].height
                })
            }
        })

        var query = wx.createSelectorQuery();
        query.selectAll('.section').boundingClientRect();
        query.exec((res) => {
            for (let i = 0; i < res.length; i++) {
                let sections = res[i];
                let showTop = false;
                let topInfo = {}

                let tmpTop = -999999999999999;
                for (let j = 0; j < sections.length; j++) {
                    const section = sections[j];
                    if (tmpTop != 0 && section.top < 0 && section.top > tmpTop) {
                        showTop = true;
                        topInfo = that.data.infos.fuzhai.rows[j]
                        topInfo.idx = section.dataset.idx;
                    }
                }

                this.setData({
                    showTop: showTop,
                    topInfo: topInfo
                })
            }
        })
    },

    /**
     * 资产负债表折叠效果
     */
    debt_section_action: function (e) {
        let idx = e.currentTarget.dataset.idx;
        let infos = this.data.infos
        let debts = infos.fuzhai.rows[idx];
        debts.showDetail = !debts.showDetail;
        infos.fuzhai.rows[idx] = debts;
        this.setData({
            infos: infos
        })
    },

    /**
     * 表格初始化方法
     */
    echartInit: function (e) {
        chart = initChart(e.detail.canvas, e.detail.width, e.detail.height);
        // this.refresh_chart();
    },

    /**
     * 更新图标内容
     */
    refresh_chart: function () {
        if (util.isEmpty(chart)) return;
        let option = chart.getOption();
        let current = this.data.switcherCurrent;
        if (util.isEmpty(this.data.infos)) return;
        if (current == 0) {
            var info = this.data.infos.nashui.rows;
        } else if (current == 1) {
            var info = this.data.infos.shebao.rows;
        } else if (current == 2) {
            var info = this.data.infos.zijin.rows;
        } else {
            return;
        }
        if (util.isEmpty(info)) return;
        let chartTitles = [];
        let chartData = [];
        let total = 0;
        info.forEach(item => {
            chartTitles.push(item.name);
            let value = isNaN(parseFloat(item.value))?0:parseFloat(item.value)
            chartData.push({value: value})
            total+=value;
        });
        this.setData({
            chartTitles: chartTitles,
            chartData: chartData
        })
        option.series[0].data = chartData;
        option.title[0].text = '累计金额';
        option.title[0].subtext = total.toFixed(2)+'';
        console.log(option);
        chart.setOption(option);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

function initChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option = {
        title: {
            show: 'true',
            x: 'center',
            y: height / 2 - 23,
            text: '累计金额',
            subtext: '25444.22',
            textStyle: {
                baseline: 'top',
                color: '#717882',
                fontSize: 13,
            },
            subtextStyle: {
                baseline: 'top',
                color: '#000000',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        backgroundColor: "#ffffff",
        color: ["#7C8DFF", "#FDE683", "#10D98F", "#356AF4", "#FE5153"],
        series: [{
            name: '123',
            type: 'pie',
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            radius: ['55%', '100%'],
            data: []
        }]
    };

    chart.setOption(option);
    return chart;
}