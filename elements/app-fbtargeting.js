'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AppFbTargeting = (function () {
  function AppFbTargeting() {
    _classCallCheck(this, AppFbTargeting);
  }

  _createClass(AppFbTargeting, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'app-fbtargeting';
      this.properties = {
        targetingSpec: {
          type: Object,
          value: function value() {
            return {};
          },
          reflectToAttribute: true
        },
        config: {
          type: Object
        }
      };
    }
  }, {
    key: 'ready',
    value: function ready() {
      var CONFIG = {
        access_token: '',
        account: ''
      };
      this.set('config', CONFIG);
      this.$.tabs.select(0);
    }
  }]);

  return AppFbTargeting;
})();

Polymer(AppFbTargeting);