var DataName = {
  zcfzZmkName: [{ name: "资产总计", children: [{ name: "流动资产合计", ziChildren: [{ name: "货币资金" }, { name: "短期投资" }, { name: "应收票据" }, { name: "应收账款" }, { name: "预付账款" }, { name: "应收股利" }, { name: "应收利息" }, { name: "其他应收款" }, { name: "存货" }, { name: "其中：原材料" }, { name: "在产品" }, { name: "库存商品" }, { name: "周转材料" }, { name: "其他流动资产" }] }, { name: "非流动资产合计", ziChildren: [{ name: "长期债券投资" }, { name: "长期股权投资" }, { name: "固定资产原价" }, { name: "减：累计折旧" }, { name: "固定资产账面价值" }, { name: "在建工程" }, { name: "固定资产清理" }, { name: "生产性生物资产" }, { name: "无形资产" }, { name: "开发支出" }, { name: "长期待摊费用" }, { name: "其他非流动资产" }] }] }, { name: "负债合计", children: [{ name: "流动负债合计", ziChildren: [{ name: "短期借款" }, { name: "应付票据" }, { name: "应付账款" }, { name: "应付账款" }, { name: "预收帐款" }, { name: "应付职工薪酬" }, { name: "应交税费" }, { name: "其他应收款" }, { name: "其他流动负债" }] }, { name: "非流动负债合计", ziChildren: [{ name: "长期借款" }, { name: "长期应付款" }, { name: "递延收益" }, { name: "其他非流动负债" }] }] }, { name: "所有者权益(或股东权益)合计", children: [{ name: "实收资本 (或股本)" }, { name: "资本公积" }, { name: "盈余公积" }, { name: "未分配利润" }] }, { name: "负债和所有者权益(或股东权益)总计" }],
  lrbZmkName: [
    { name: "一、营业收入", children: [{ name: "减：营业成本" }, { name: "营业税金及附加", ziChildren: [{ name: "其中：消费税" }, { name: "营业税" }, { name: "城市建设维护税" }, { name: "资源税" }, { name: "土地增值税" }, { name: "城镇土地使用税、房产税、r车船税、印花税" }, { name: "教育附加、矿产资源补偿费、排污费" }] }, { name: "销售费用", ziChildren: [{ name: "其中：商品维修费" }, { name: "广告费和业务宣传费" }] }, { name: "管理费用", ziChildren: [{ name: "开办费" }, { name: "业务招待费" }, { name: "研究费用" }] }, { name: "财务费用", ziChildren: [{ name: "其中：利息费用(收入以“-”号填列)" }, { name: "加：投资收益(损失以“-”号填列)" }]}]},{ name: "二、营业利润(亏损以“-”号填列)", children: [{ name: "加：营业外收入", ziChildren: [{ name: "政府补助" }] }, { name: "减：营业外支出", ziChildren: [{ name: "其中：坏账损失" }, { name: "无法收回的长期债券投资损失" }, { name: "无法收回的长期股权投资损失" }, { name: "自然灾害等不可抗力因素造成的损失" }, { name: "税收滞纳金" }]}]},{ name: "三、利润总额(亏损总额以“-”填列)", children: [{ name: "减：所得税费用" }] },{ name: "四、净利润(净亏损以“-”填列)" }],
  xjllZmkName: [{
    name: "一、经营活动产生的现金流量", children: [{ name: "销售产成品、商品、提供劳务收到的现金" }, { name: "收到的其他与经营活动有关的现金" }, { name: "购买原材料、商品、接受劳务支付的现金" }, { name: "支付的职工薪酬" }, { name: "支付的税费" }, { name: "支付其他与经营活动有关的现金" }, { name: "经营活动产生的现金流量净额" }]
  }, { name: "二、投资活动产生的现金流量", children: [{ name: "收回短期投资、长期债券投资和长期股权投资收到的现金" }, { name: "取得投资收益收到的现金" }, { name: "处置固定资产、无形资产和其他非流动资产收回的现金净额" }, { name: "短期投资、长期债券投资和长期股权投资支付的现金" }, { name: "购建固定资产、无形资产和其他非流动资产支付的现金" }, { name: "投资活动产生的现金流量净额" }] }, { name: "三、筹资活动产生的现金流量", children: [{ name: "取得借款收到的现金" }, { name: "吸收投资者投资收到的现金" }, { name: "偿还借款本金支付的现金" }, { name: "偿还借款利息支付的现金" }, { name: "分配利润支付的现金" }, { name: "筹资活动产生的现金流量净额" }] }, { name: "四、现金净增加额", }, { name: "加：期初现金余额", }, { name: "五、期末现金余额", }],
  mxbZmkName: [
    { name: "资产", kmlx :"1", children: [] }, 
    { name: "负债", kmlx: "2", children: [] }, 
    { name: "权益", kmlx: "3", children: [] }, 
    { name: "损益", kmlx: "4", children: [] },
    { name: "成本", kmlx: "5", children: [] }
    ]
}

module.exports = {
  DataName
};