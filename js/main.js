angular.module('testS2IT', []);

//GLOBAL VARIABLES
var dialog;

//FUNÇÕES DE CONVERSÃO
String.prototype.parseDecimal = function() {
  return parseFloat(this.replace(',','.').replace(' ','')).toFixed(2).replace('.',',');
};

String.prototype.parseFloat = function() {
  return parseFloat(this.replace(',','.')).toFixed(2);
};

String.prototype.reverse = function () {
        return this.split("").reverse().join("");
};

    function moneyMask(input) {        
        var x = input.value;
        x = x.replace(/,/g, "");
        x = x.reverse();
        x = x.replace(/^../g, function (e) {
            return e + ",";
        }); 
        x = x.reverse();
        x = x.replace(/^,/, "");
        input.value = x;
    }

//DILOG MATERIAL DESING
function loadDialogDefault(){

    if(dialog === undefined){
        dialog = document.querySelector('#dialogErros');

        dialog.querySelector('.close').addEventListener('click', function() {
            dialog.close();
            FocusOn('valor');
        });
    }
    
    return dialog;
}

//FUNÇÃO RESPONSÁVEL POR COLOCAR O CURSOR NO ELEMENTO
function FocusOn(elementId){
    document.getElementById(elementId).focus();
}


$(function() {
    FocusOn('valor');

    $(".VanderTable").VanderTable({
        disableColReordering: true,
        allowTableSort: true,
        color: '#009688'
    });
    
});

