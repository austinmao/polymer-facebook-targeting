'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AddDemographics = (function () {
  function AddDemographics() {
    _classCallCheck(this, AddDemographics);
  }

  _createClass(AddDemographics, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'add-demographics';
      this.properties = {
        targetingSpec: {
          type: Object,
          notify: true
        }
      };
    }
  }, {
    key: 'ready',
    value: function ready() {
      this.genders = ['All', 'Men', 'Women'];
      this.age_min = (function () {
        var _age_min = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array(53).keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            _age_min.push(i + 13);
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

        return _age_min;
      })();
      this.age_max = (function () {
        var _age_max = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Array(53).keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var i = _step2.value;

            _age_max.push(i + 13);
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

        return _age_max;
      })();
    }
  }, {
    key: '_handleGendersChange',
    value: function _handleGendersChange() {
      this.set('targetingSpec.genders', [this.$.genders.selected]);
    }
  }, {
    key: '_handleAgeChange',
    value: function _handleAgeChange() {
      this.set('targetingSpec.age_min', +this.$.age_min.selected + 13);
      this.set('targetingSpec.age_max', +this.$.age_max.selected + 13);
    }
  }, {
    key: 'attached',
    value: function attached() {
      this._handleGendersChange();
      this._handleAgeChange();
    }
  }]);

  return AddDemographics;
})();

Polymer(AddDemographics);