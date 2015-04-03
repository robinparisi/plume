(function(document, window) {

    'use strict';

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }


    var defaults = {
        delay: 5000
    };

    var delay = null;

    function Plume() {

        this.plume = null;

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        } else {
            this.options = defaults;
        }
    }

    Plume.prototype.getPlume = function() {

        if(this.plume === null) {
            this.init();
        }

        return this.plume;
    };

    Plume.prototype.init = function() {
        this.create();
        this.bindEvents();
    };

    Plume.prototype.bindEvents = function() {

        this.close.addEventListener('click', (function(self){
            return function() {
                self.hide();
            };
        })(this));

    };

    Plume.prototype.create = function() {

        this.plume = document.createElement('div');
        this.plume.className = 'plume';

        var icon = document.createElement('div');
        icon.className = 'plume__icon plume-icon-smile';

        var content = document.createElement('div');
        content.className = 'plume__content';
        content.innerHTML = 'ici le contenu';

        this.close = document.createElement('div');
        this.close.className = 'plume__close';

        this.plume.appendChild(icon);
        this.plume.appendChild(content);
        this.plume.appendChild(this.close);

        document.body.insertBefore(this.plume, document.body.firstChild);

    };

    var notif = function(type, icon, message) {

        // reset previous delay
        clearTimeout(delay);

        var plume = this.getPlume();
        var self = this;

        setTimeout(function() {
            self.hide();
            plume.className = 'plume ' + type;
            plume.getElementsByClassName('plume__icon')[0].className = 'plume__icon ' + icon;
            plume.getElementsByClassName('plume__content')[0].innerHTML = message;
            self.show();
        }, 50);

        delay = setTimeout(function() {
            self.hide();
        }, self.options.delay);
    };

    Plume.prototype.success = function(message) {
        notif.call(this, 'plume--success', 'plume-icon-smile', message);
    };

    Plume.prototype.warning = function(message) {
        return notif.call(this, 'plume--warning', 'plume-icon-wondering', message);
    };

    Plume.prototype.error = function(message) {
        return notif.call(this, 'plume--error', 'plume-icon-sad', message);
    };

    Plume.prototype.hide = function() {
        this.getPlume().classList.remove('plume--show');
    };

    Plume.prototype.show = function() {
        this.getPlume().classList.add('plume--show');
    };


    window.Plume = Plume;


}(document, window));


