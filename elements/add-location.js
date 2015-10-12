'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AddLocation = (function () {
  function AddLocation() {
    _classCallCheck(this, AddLocation);
  }

  _createClass(AddLocation, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'add-location';
      this.properties = {
        config: {
          type: Object,
          value: '',
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
      this.set('targetingSpec.geo_locations', []);
      this.set('targetingSpec.excluded_geo_locations', []);
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
        'type': 'adgeolocation',
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
      }
    }
  }, {
    key: '_addLocation',
    value: function _addLocation(ev) {
      if (this.$.excluded.selected === 1) {
        this.push('targetingSpec.excluded_geo_locations', ev.target.dataItem);
      } else {
        this.push('targetingSpec.geo_locations', ev.target.dataItem);
      }

      this._ajaxResponse = null;
      this.$.search.value = '';
    }
  }, {
    key: '_removeLocation',
    value: function _removeLocation(ev) {
      this.splice('targetingSpec.geo_locations', this.targetingSpec.geo_locations.indexOf(ev.target.dataItem), 1);
    }
  }, {
    key: '_removeLocationExcluded',
    value: function _removeLocationExcluded(ev) {
      this.splice('targetingSpec.excluded_geo_locations', this.targetingSpec.excluded_geo_locations.indexOf(ev.target.dataItem), 1);
    }
  }]);

  return AddLocation;
})();

Polymer(AddLocation);