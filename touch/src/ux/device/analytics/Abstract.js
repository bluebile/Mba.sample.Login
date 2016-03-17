/**
 * @private
 */
Ext.define('Ext.ux.device.analytics.Abstract', {
	config: {
		accountID: null
	},

	/**
	 * Registers yur Google Analytics account.
	 *
	 * @param {String} accountID Your Google Analytics account ID
	 */
	registerAccount: function(accountID) {
		this.setAccountID(accountID);
	},

	isPluginCordova: function() {
		if(typeof window.analytics === 'undefined'){
			return false;
		}
		return true;
	},

	/**
	 * Track an event in your application.
	 *
	 * More information here: http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html
	 *
	 * @param {Object} config
	 *
	 * @param {String} config.category The name you supply for the group of objects you want to track
	 *
	 * @param {String} config.action A string that is uniquely paired with each category, and commonly
	 * used to define the type of user interaction for the web object.
	 *
	 * @param {String} config.label An optional string to provide additional dimensions to the event data.
	 *
	 * @param {String} config.value An integer that you can use to provide numerical data about the user event
	 *
	 */
	trackEvent: Ext.emptyFn,

	/**
	 * Track an pageview in your application.
	 *
	 * @param {String} config.page The page you want to track (must start with a slash).
	 */
	trackPageview: Ext.emptyFn,

	/**
	 * Track an exception in your application.
	 *
	 * @param {String}  The page you want to track (must start with a slash).
	 */
	trackException: Ext.emptyFn
});
