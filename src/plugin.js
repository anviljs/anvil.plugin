var path = require( "path" );

module.exports = function( _, anvil ) {
	return anvil.plugin( {
		name: "anvil.plugin",
		commander: [
			[ "disable [value]", "Disable plugin" ],
			[ "enable [value]", "Enable plugin" ],
			[ "install [value]", "Install a plugin from npm" ],
			[ "list", "List available plugins" ],
			[ "uninstall [value]", "Uninstall plugin" ],
			[ "update", "Update all installed plugins" ]
		],
		commands: [ "disable", "enable", "install", "list", "uninstall", "update" ],

		configure: function( config, commander, done ) {
			var self = this,
				commands = _.chain( this.commands )
							.filter( function( arg ) { return commander[ arg ]; } )
							.map( function( arg ) {
								var value = commander[ arg ];
								return { command: arg, value: value };
							} )
							.value(),
				command = commands.length === 0 ? undefined : commands[ 0 ];
			if( command ) {
				anvil.pluginManager[ command.command ]( command.value, function() {
					anvil.raise( "all.stop", 0 );
				} );
			} else {
				done();
			}
		}
	} );
};