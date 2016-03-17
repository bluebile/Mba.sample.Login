var translate = { 'pt-BR' : function() {
    Date.dayNames = [
        'Domingo',
        'Segunda',
        'Ter&ccedil;a',
        'Quarta',
        'Quinta',
        'Sexta',
        'S&aacute;bado'
    ];

    Date.monthNames = [
        'Janeiro',
        'Fevereiro',
        'Mar&ccedil;o',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    Date.monthNumbers = {
        'Jan': 0,
        'Fev': 1,
        'Mar': 2,
        'Abr': 3,
        'Mai': 4,
        'Jun': 5,
        'Jul': 6,
        'Ago': 7,
        'Set': 8,
        'Out': 9,
        'Nov': 10,
        'Dez': 11
    };

    Date.getShortMonthName = function(month) {
        return Date.monthNames[month].substring(0, 3);
    };

    Date.getShortDayName = function(day) {
        return Date.dayNames[day].substring(0, 3);
    };

    Date.getMonthNumber = function(name) {
        return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
    };

    if (Ext.picker && Ext.picker.Picker) {
        Ext.override(Ext.picker.Picker, {
            doneText: 'Feito'
        });
    }

    if (Ext.picker && Ext.picker.Date) {
        Ext.override(Ext.picker.Date, {
            'dayText': 'Dia',
            'monthText': 'M&ecirc;s',
            'yearText': 'Ano',
            'slotOrder': ['m&ecirc;s', 'dia', 'ano']
        });
    }

    if (Ext.NestedList) {
        Ext.override(Ext.NestedList, {
            'backText': 'Voltar',
            'loadingText': 'Carregando...',
            'emptyText': 'Nenhum item dispon&iacute;vel.'
        });
    }

    if (Ext.util.Format) {
        Ext.util.Format.defaultDateFormat = 'd/m/Y';
    }

    if (Ext.MessageBox) {
        Ext.MessageBox.OK.text = 'OK';
        Ext.MessageBox.CANCEL.text = 'Cancelar';
        Ext.MessageBox.CANCEL.itemId = 'cancelar';
        Ext.MessageBox.YES.text = 'Sim';
        Ext.MessageBox.YES.itemId = 'sim';
        Ext.MessageBox.NO.text = 'Não';
        Ext.MessageBox.NO.itemId = 'nao';
        Ext.MessageBox.YESNO[0].text = 'Não';
        Ext.MessageBox.YESNO[0].itemId = 'nao';
        Ext.MessageBox.YESNO[1].text = 'Sim';
        Ext.MessageBox.YESNO[1].itemId = 'sim';
        Ext.MessageBox.OKCANCEL[0].text = 'Cancelar';
        Ext.MessageBox.OKCANCEL[0].itemId = 'cancelar';
        Ext.MessageBox.OKCANCEL[1].text = 'OK';
        Ext.MessageBox.YESNOCANCEL[0].text = 'Cancelar';
        Ext.MessageBox.YESNOCANCEL[0].itemId = 'cancelar';
        Ext.MessageBox.YESNOCANCEL[1].text = 'Não';
        Ext.MessageBox.YESNOCANCEL[1].itemId = 'nao';
        Ext.MessageBox.YESNOCANCEL[2].text = 'Sim';
        Ext.MessageBox.YESNOCANCEL[2].itemId = 'sim';
    }
}};

window.selectTranslate = function(language) {
    if (language in translate) {
        return translate[language];
    } else {
        return translate['pt-BR'];
    }
}
