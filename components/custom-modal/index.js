Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        if (newVal) {
          this.setData({
            animationData: {},
            class: 'show'
          });
        } else {
          this.setData({
            class: ''
          });
        }
      }
    },
    title: {
      type: String,
      value: '提示'
    },
    content: {
      type: String,
      value: ''
    }
  },
  data: {
    class: ''
  },
  methods: {
    close: function() {
      this.triggerEvent('close');
    },
    cancel: function() {
      this.triggerEvent('cancel');
      this.close();
    },
    confirm: function() {
      this.triggerEvent('confirm');
      this.close();
    }
  }
});