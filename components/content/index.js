Component({
    properties: {
      copenCompany: {
            type: Array,
            value: null
        }
    },
    data: {
        currentTab: 0,
        winHeight: ""
    },
    methods: {
        onLoad: function() {},
        switchTab: function(t) {
            this.setData({
                currentTab: t.detail.current
            });
        },
        swithNav: function(t) {
            var a = t.target.dataset.current;
            if (this.data.currentTab == a) return !1;
            this.setData({
                currentTab: a
            });
        },
        goLink: function(a) {
            // wx.navigateTo({
            //     url: t(a.currentTarget.dataset.link)
            // });
        }
    }
});