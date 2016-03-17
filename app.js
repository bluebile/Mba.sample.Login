/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.require(['Mba.ux.viewport.*', 'Mba.ux.Environment.overrides.Application']);

Ext.application({
    name: 'exemplo',
    eventPublishers: {
        touchGesture: {
            recognizers: {
                doubleTap: {
                    xtype: 'Ext.event.recognizer.DoubleTap',
                    maxDuration: 10
                }
            }
        }
    },

    viewport: {
        xclass: 'Ext.viewport.Viewport',
        autoNavigation: true
    },

    env: 'local',

    requires: [
		'exemplo.util.Initialize',
		'Mba.ux.viewport.*',
		'Mba.ux.Locale.LocaleManager',
		'Mba.ux.Locale.Manager',
		'Ext.MessageBox',
		'Mba.ux.MessageBox',
		'Mba.ux.Sql',
		'Mba.ux.Environment.overrides.*',
		'Mba.ux.ImageViewer',
		'Mba.ux.Field.*'
	],
    controllers: [
        'exemplo.controller.Login'
    ],
    views: [
        'Main'
    ],

    launch: function() {
        Ext.USE_NATIVE_JSON = true;

        selectTranslate(navigator.language)();

        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('exemplo.view.Login'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
