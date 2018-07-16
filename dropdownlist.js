(function (_w, _d) {
  const config = {
    defaultSelectedIndex: -1
  };

  const DropdownList = (function () {
    function DropdownList() {
      if (!(this instanceof arguments.callee)) {
        return new arguments.callee(...arguments);
      }

      this._init(...arguments);
    }

    DropdownList._m = function (name, fn) {
      this.prototype[name] = fn;
    };

// -----------------------------------------------------------------------------------------------

    DropdownList._m('_init', function (selector, options) {
      this.el = typeof selector === 'string' ? _d.querySelector(selector) : el;
      this.options = Object.assign(JSON.parse(JSON.stringify(config)), options);
      this._setDefineProperty();
      this._create();
      this._bindEvent();
    });

    DropdownList._m('_setDefineProperty', function () {
      const properties = { index: -1 };

      Object.defineProperty(this, 'selectedIndex', {
        set: function (index) {
          properties.index = index;
        },
        get: function () {
          return properties.index;
        }
      });
    });

    DropdownList._m('_create', function () {
      const container = _d.createElement('div');
      containerStyle = 'display: none; z-index: 999999; width: 150px; height: 100px; overflow: auto;';
      container.style = containerStyle;
      container.dataset.hidden = 'true';
      container.className = 'list-container';

      const listPnl = _d.createElement('div');

      const ul = _d.createElement('ul');

      listPnl.appendChild(ul);
      container.appendChild(listPnl);

      _d.body.appendChild(container);

      this.listContainer = container;
      this.listUl = ul;
    });

    DropdownList._m('_bindEvent', function () {
      const eventName = ['change'];

      eventName.forEach(function (name) {
        this[name] = (function (that) {
          return function (fn) {
            that[`on${name.charAt(0).toUpperCase()}${name.substr(1)}`] = fn;
          }
        })(this)
      }.bind(this));

      const { el, listContainer } = this;
      let isElMouseEnter = false;
      el.addEventListener('mouseenter', function (e) {
        isElMouseEnter = true;
      });

      el.addEventListener('mouseleave', function (e) {
        isElMouseEnter = false;

        if (!isListContainerMouseEnter) {
          hideListContainer();
        }
      });

      el.addEventListener('click', function (e) {
        const isHidden = getIsHidden();

        listContainer.dataset.hidden = !isHidden;
        if (isHidden) {
          showListContainer();
        } else {
          hideListContainer();
        }
      }.bind(this));

      let isListContainerMouseEnter = false;
      listContainer.addEventListener('mouseenter', function (e) {
        isListContainerMouseEnter = true;
      })

      listContainer.addEventListener('mouseleave', function (e) {
        isListContainerMouseEnter = false;

        if (!isElMouseEnter) {
          hideListContainer();
        }
      })

      function getIsHidden() {
        return listContainer.dataset.hidden === 'true' || false;
      }

      function showListContainer() {
        listContainer.dataset.hidden = false;
        listContainer.style.display = 'block';
      }

      function hideListContainer() {
        listContainer.dataset.hidden = true;
        listContainer.style.display = 'none';
      }
    }); 

    DropdownList._m('_render', function () {
      const { data } = this;

      if (!Array.isArray(data)) 
        return false;

      const Fragment = document.createDocumentFragment();
      data.forEach(({ text, value }) => {
        const li = _d.createElement('li');
        li.textContent = text;
        Fragment.appendChild(li);
      })

      this.listUl.appendChild(Fragment);
    });

    /**
     * Data 추가
     */
    DropdownList._m('setData', function (data) {
      if (!Array.isArray(data))
        return false;

      this.data = [ ...data ];
      this._render();
    });

    return DropdownList;
  })()

  _w.DropdownList = DropdownList;
})(window, document)