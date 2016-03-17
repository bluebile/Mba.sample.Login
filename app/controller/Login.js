Ext.define('exemplo.controller.Login', {
    extend: 'Ext.app.Controller',
    requires: [
        'exemplo.view.Login'
    ],

    config: {
        storeSession: null,
        refs: {
            loginView: {
                xtype: 'loginView',
                selector: 'loginView',
                autoCreate: true
            },
            mainView: {
                xtype: 'MainView',
                selector: 'MainView',
                autoCreate: true
            },
            loginUsuarioField: {
                selector: 'loginView #usuarioField'
            },
            loginSenhaField: {
                selector: 'loginView #senhaField'
            },
            loginButton: {
                selector: 'loginView #loginButton'
            },
            lostPasswordButton: {
                selector: 'loginView #lostPasswordButton'
            },
            errorLogin: {
                selector: 'loginView #errorLogin'
            }
        },
        control: {
            loginButton: {
                tap: 'loginButtonTap'
            },
            lostPasswordButton: {
                tap: 'lostPasswordTap'
            },
            loginView: {
                initialize: 'initializeView',
                activate: 'activateView'
            }
        }
    },
    initializeView: function() {
        console.log('login, initializeView');
    },
    activateView: function() {
        console.log('login, activateView');
    },
    loginButtonTap: function() {
      //  navigation.activateView('main');
        console.log('login, loginButtonTap');
        if(this.getLoginUsuarioField().getValue().toUpperCase() == 'MBA'){
            console.log('login, Senha Correta');

            Ext.Viewport.setActiveItem(this.getMainView());
        }
        else{
            this.getErrorLogin().setHtml('Senha Inválida');
            console.log('login, Usuário incorreto');
        }
    },
    lostPasswordTap: function() {
        console.log('login, lostPasswordTap');
    }
});
