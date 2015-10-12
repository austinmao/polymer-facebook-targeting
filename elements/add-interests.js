'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AddInterests = (function () {
  function AddInterests() {
    _classCallCheck(this, AddInterests);
  }

  _createClass(AddInterests, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'add-interests';
      this.properties = {
        config: {
          type: Object,
          notify: true
        },
        targetingSpec: {
          type: Object,
          notify: true
        }
      };
    }
  }, {
    key: 'ready',
    value: function ready() {
      this.set('targetingSpec.interests', []);
    }
  }, {
    key: '_handleInputChange',
    value: function _handleInputChange() {
      this._handleAjax();
    }
  }, {
    key: '_handleAjax',
    value: function _handleAjax() {
      var params = {
        'q': this.$.search.value,
        'limit': 10,
        'type': 'adinterest',
        'access_token': this.config.access_token
      };
      var url = 'https://graph.facebook.com/v2.4/search';
      this.$.ajax.params = params;
      this.$.ajax.url = url;
    }
  }, {
    key: '_handleAjaxError',
    value: function _handleAjaxError(ev, obj) {
      this.error = obj.request.xhr.response.error.message;
      this.$.toast.show();
    }
  }, {
    key: '_handleAjaxResponse',
    value: function _handleAjaxResponse(ev) {
      if (ev.detail.xhr.response) {
        this.$.results.focus();
        this._ajaxResponse.data = this._ajaxResponse.data.map(function (item) {
          item.audience_size = item.audience_size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          return item;
        });
      }
    }
  }, {
    key: '_addInterest',
    value: function _addInterest(ev) {
      this.push('targetingSpec.interests', ev.target.dataItem);

      this._ajaxResponse = null;
      this.$.search.value = '';
    }
  }, {
    key: '_removeInterest',
    value: function _removeInterest(ev) {
      this.splice('targetingSpec.interests', this.targetingSpec.interests.indexOf(ev.target.dataItem), 1);
    }
  }]);

  return AddInterests;
})();

Polymer(AddInterests);