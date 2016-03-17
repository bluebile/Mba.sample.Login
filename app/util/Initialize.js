Ext.define('exemplo.util.Initialize', {
    override: 'Mba.ux.Initialize',
    requires: [ 'Mba.ux.Environment.overrides.BuilderConfig' ],
    _init: function()
    {
        var json;

        json = Ext.create('Mba.ux.BuilderConfig.loader.Json', {
            files: {
                'sql': 'resources/globals/sql.json',
                'pushnotification': 'resources/globals/pushnotification.json',
                'url': 'resources/globals/url.json'
            }
        });

        Mba.ux.BuilderConfig.setData(json);
    }
});
