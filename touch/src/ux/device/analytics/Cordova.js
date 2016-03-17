/**
 * @private
 */
Ext.define('Ext.ux.device.analytics.Cordova', {
    extend: 'Ext.ux.device.analytics.Abstract',

    updateAccountID: function(newID) {
        if (newID) {
            if (!this.isPluginCordova()) {
                return;
            }
            window.analytics.startTrackerWithId(newID);
        }
    },

    trackEvent: function(category, action, label, value) {
        if (!this.getAccountID()) {
            return;
        }

        if (!this.isPluginCordova()) {
            return;
        }

        var config = {
                category: null,
                action: null,
                label: null,
                value: null
            },
            keys   = [ 'category', 'action', 'label', 'value' ];

        if (arguments.length === 1 && Ext.isObject(category)) {
            config = category;
        }

        for (var i = 0, length = arguments.length; i < length; i++) {
            config[keys[i]] = arguments[i];
        }

        window.analytics.trackEvent(
            config.category,
            config.action,
            config.label,
            config.value
        );
    },

    trackPageview: function(page) {
        if (!this.getAccountID()) {
            return;
        }

        if (!this.isPluginCordova()) {
            return;
        }

        window.analytics.trackView(page);
    },

    trackException: function(description, fatal) {

        if (!this.getAccountID()) {
            return;
        }

        if (!this.isPluginCordova()) {
            return;
        }

        var config = {
                description: null,
                fatal: null
            },
            keys   = [ 'description', 'fatal' ];

        if (arguments.length === 1 && Ext.isObject(description)) {
            config = description;
        }

        for (var i = 0, length = arguments.length; i < length; i++) {
            config[keys[i]] = arguments[i];
        }

        window.analytics.trackException(
            config.description,
            config.fatal
        );
    }
});
