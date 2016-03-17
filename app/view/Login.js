Ext.define('exemplo.view.Login', {
    extend: 'Ext.Container',
    xtype: 'loginView',

    requires: [
        'Ext.Button',
        'Ext.Label',
        'Ext.field.Text',
        'Ext.field.Password'
    ],

    config: {
        cls: 'container--background',
        xtype: 'container',
        items: [
            {
                xtype: 'container',
                items: [
                    {
                        cls: 'logotipo--login',
                        xtype: 'container'
                    },
                    {
                        cls: 'container--login',
                        xtype:'container',
                        items: [
                            {
                                xtype: 'label',
                                html: 'Usuário'
                            },
                            {
                                xtype: 'textfield',
                                name: 'usuario',
                                itemId: 'usuarioField'
                            },
                            {
                                xtype: 'label',
                                html: 'Senha'
                            },
                            {
                                xtype: 'passwordfield',
                                name: 'senha',
                                itemId: 'senhaField'
                            },
                            {
                                xtype: 'button',
                                itemId: 'loginButton',
                                cls: 'laranja',
                                text: 'Entrar'
                            },
                            {
                                xtype: 'button',
                                itemId: 'recuperaSenhaButton',
                                cls: 'link',
                                text: 'Esqueceu sua Senha?'
                            },
                            {
                                itemId: 'errorLogin',
                                xtype: 'label',
                                html: '',
                                cls: 'errorLabel'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
