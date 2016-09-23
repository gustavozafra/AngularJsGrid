angular.module('testS2IT').controller('TransacaoController', function($scope){
    $scope.transacoes = [];

    $scope.valorTotal = 0;

    

    $scope.tipo = "Depósito";


    //Função responsável por calcular as transações
    $scope.CalcularTotal = function(){
        var somatoria = 0;

        for(var index = 0; index < $scope.transacoes.length; index++)
        {
            var transacao = $scope.transacoes[index];

            if(transacao.tipo === 'Depósito')
                somatoria += Number(transacao.valor.parseFloat());
            else
                somatoria -= Number(transacao.valor.parseFloat());
        }

        $scope.valorTotal = String(somatoria).parseDecimal();
    };

    //EVENTO ADICIONAR TRANSAÇÃO A TABELA
    $scope.addTransacao = function(){

        var dialog = loadDialogDefault();

        $scope.valor = document.getElementById('valor').value.parseDecimal();

        if(parseFloat($scope.valor) <= 0 || $scope.valor === 'NaN'){
            dialog.querySelector("#dialogContent").innerHTML="Por favor informe um valor válido maior que 0.";
            dialog.showModal();
        }
        else{
            if($scope.tipo === "Saque" && parseFloat($scope.valor) > parseFloat($scope.valorTotal)){
                
                dialog.querySelector("#dialogContent").innerHTML="Saldo insuficiente.";
                dialog.showModal();
            }	
            else{
                
                $scope.transacoes.push({ 'tipo':$scope.tipo, 'valor': $scope.valor });

                $scope.CalcularTotal();
            }
        }

        $scope.valor = '';
        FocusOn('valor');
        	
    };

    //EVENTO REMOVER TRANSAÇÃO
    $scope.removerTransacao = function(tipo, valor){

        var dialog = loadDialogDefault();

        var index = -1;
          var minhasTransacoes = eval( $scope.transacoes );
          for( var i = 0; i < minhasTransacoes.length; i++ ) {
                if( minhasTransacoes[i].tipo === tipo && minhasTransacoes[i].valor === valor ) {
                    index = i;
                    break;
                 }
          }
          if( index === -1 ) {
                dialog.querySelector("#dialogContent").innerHTML="Ocorreu um erro ao remover a transação. Tente novamente!";
                dialog.showModal();
          }
          $scope.transacoes.splice( index, 1 );

          $scope.CalcularTotal();

          FocusOn('valor');
    };
});

