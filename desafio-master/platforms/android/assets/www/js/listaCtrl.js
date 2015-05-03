angular.module('desafioApp.listaCtrl', [])

.controller("listaController",function($scope,$cordovaSQLite,$ionicPlatform,$location){
  $scope.lista = []; //Limpa o array

   //Função Busca todos registros
  $scope.registros = function(){
    $scope.lista = []; //Limpa o array
     var select = "SELECT id, texto , data FROM desafio";
    //executa o select e imprime no log caso encontrou alguma linha ou se aconteceu algum erro
    $cordovaSQLite.execute(db, select,[]).then(function(result){
      if (result.rows.length > 0 ){
        console.log("SELECIONADO ->" + result.rows.item(0).texto + " " + result.rows.item(0).data);
        //Mostra os resultados
        for (var i = 0; i < result.rows.length ; i++) {
            console.log("SELECIONADO ->" + result.rows.item(i).texto + " " + result.rows.item(i).data +"inicio id: "+i);
            $scope.lista.push({id: result.rows.item(i).id, texto: result.rows.item(i).texto,data: new Date(result.rows.item(i).data)});
        }
      }else{
        console.log("NENHUMA LINHA ENCONTRADA.");
      }
    }, function(error){
        console.log(error);
    });
  }

 $ionicPlatform.ready(function() {
  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD.");
    $scope.registros();
  });
  
    $scope.cadastro = function(){
    $location.path("/app/cadastroItem");
  }

});
