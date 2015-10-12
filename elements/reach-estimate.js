'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ReachEstimate = (function () {
  function ReachEstimate() {
    _classCallCheck(this, ReachEstimate);
  }

  _createClass(ReachEstimate, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'reach-estimate';
      this.properties = {
        config: {
          type: Object
        },
        targetingSpec: {
          type: Object,
          reflectToAttribute: true,
          notify: true
        }
      };
      this.observers = ['_targetingSpecChanged(targetingSpec.*)'];
    }
  }, {
    key: '_targetingSpecChanged',
    value: function _targetingSpecChanged() {
      if (Object.keys(this.targetingSpec).length === 0) {
        return;
      }
      var specTransform = function specTransform(source) {
        var countries = (function () {
          var _countries = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = _step.value;
              var type = _step$value.type;
              var key = _step$value.key;

              if (type === 'country') {
                _countries.push(key);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return _countries;
        })();
        var cities = (function () {
          var _cities = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = source[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = _step2.value;
              var type = _step2$value.type;
              var key = _step2$value.key;

              if (type === 'city') {
                _cities.push({ key: key });
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return _cities;
        })();
        var regions = (function () {
          var _regions = [];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = source[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _step3$value = _step3.value;
              var type = _step3$value.type;
              var key = _step3$value.key;

              if (type === 'region') {
                _regions.push({ key: key });
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                _iterator3['return']();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          return _regions;
        })();
        var zips = (function () {
          var _zips = [];
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = source[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _step4$value = _step4.value;
              var type = _step4$value.type;
              var key = _step4$value.key;

              if (type === 'zip') {
                _zips.push({ key: key });
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                _iterator4['return']();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          return _zips;
        })();
        return { countries: countries, cities: cities, regions: regions, zips: zips };
      };
      this.targetingSpecForReachEstimate = {
        'geo_locations': specTransform(this.targetingSpec.geo_locations),
        'excluded_geo_locations': specTransform(this.targetingSpec.excluded_geo_locations),
        'genders': this.targetingSpec.genders,
        'age_min': this.targetingSpec.age_min,
        'age_max': this.targetingSpec.age_max,
        'interests': this.targetingSpec.interests.map(function (item) {
          return { 'id': item.id, 'name': item.name };
        })
      };

      if (JSON.stringify(this.targetingSpecForReachEstimate.geo_locations) === '{"countries":[],"cities":[],"regions":[],"zips":[]}') {
        this.data = {};
        return;
      }
      this.error = null;
      this._handleAjax();
    }
  }, {
    key: '_handleAjax',
    value: function _handleAjax() {
      var params = {
        'targeting_spec': JSON.stringify(this.targetingSpecForReachEstimate),
        'access_token': this.config.access_token
      };
      var url = 'https://graph.facebook.com/v2.4/act_' + this.config.account + '/reachestimate';
      if (this.targetingSpec) {
        this.$.ajax.params = params;
        this.$.ajax.url = url;
      }
    }
  }, {
    key: '_handleAjaxResponse',
    value: function _handleAjaxResponse(res) {
      if (res.detail.xhr.response) {
        var data = res.detail.xhr.response;
        this.data = {
          users: data.users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
          cpa_median: data.data.bid_estimations[0].cpa_median / 100,
          cpc_median: data.data.bid_estimations[0].cpc_median / 100,
          cpm_median: data.data.bid_estimations[0].cpm_median / 100
        };
      }
    }
  }, {
    key: '_handleAjaxError',
    value: function _handleAjaxError(ev, obj) {
      this.error = obj.request.xhr.response.error.message;
      if (obj.request.xhr.response.error.message === 'Invalid parameter') {
        this.error += ': ' + obj.request.xhr.response.error.error_user_title;
      }
      this.$.toast.show();
    }
  }]);

  return ReachEstimate;
})();

Polymer(ReachEstimate);