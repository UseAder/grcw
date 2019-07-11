Page({
  data: {
    invoiceDetaile: {}
  },
  onLoad: function (options) {
    let item = JSON.parse(options.detaileData);
    this.setData({ invoiceDetaile: item });
  },
})