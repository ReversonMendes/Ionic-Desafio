var db = null;

var desafio  = angular.module('desafioApp', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //inicia o banco sql
    db = $cordovaSQLite.openDB({ name: "desafio.db"});

    $cordovaSQLite.execute(db,"DROP TABLE IF EXISTS desafio");
    //Cria a tabela  caso não estiver criada
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS desafio (id integer primary key, texto text, data text)");
    console.log("TABELA CRIADA");
  });
});

//Controla o banco
desafio.controller("desafioController", function($scope, $cordovaSQLite, $ionicLoading){
    $scope.texto = ''; //Variavel recebido do input
    $scope.datas = ''; //Variavel recebido do input
    $scope.items = []; //Array com os registros


  //Função Busca todos registros
  $scope.registros = function(){
    var select = "SELECT id, texto , data FROM desafio";
    //executa o select e imprime no log caso encontrou alguma linha ou se aconteceu algum erro
    $cordovaSQLite.execute(db, select,[]).then(function(result){
      if (result.rows.length > 0 ){
        console.log("SELECIONADO ->" + result.rows.item(0).texto + " " + result.rows.item(0).data);
        //Mostra os resultados
        for (var i = 0; i < result.rows.length ; i++) {
            console.log("SELECIONADO ->" + result.rows.item(i).texto + " " + result.rows.item(i).data +"inicio id: "+i);
            $scope.items.push(result.rows.item(i));
        }
       // alert(JSON.stringify($scope.items));
        console.log("SELECIONADO ->" + result.rows.item(i).texto + " " + result.rows.item(i).data +"Fim id: "+i);
        return $scope.items;
      }else{
        console.log("NENHUMA LINHA ENCONTRADA.");
      }
    }, function(error){
        console.log(error);
    });
  }

  //Função inserir  = inclui registro no banco
  $scope.inserir = function(){
    console.log($scope.texto)
    console.log($scope.datas)
    var insert = "INSERT INTO desafio ( texto, data) VALUES (?,?)";
    //executa o insert e imprime no log quando inserir ou se aconteceu algum erro.
    $cordovaSQLite.execute(db, insert, [$scope.texto, $scope.datas]).then(function(result){
      console.log("INSERIDO id ->" + result.insertId);
      $ionicLoading.show({ template: 'Item Added!', noBackdrop: true, duration: 2000 });
      $scope.texto = "";
      $scope.datas = "";
    }, function(error){
      console.log(error);
    });
    $desafio.registros();
  }

  //Função select = Executa uma consulta no banco
  $scope.select = function(texto){
    console.log("ENTROU no SELECT = " + texto );
    var select = "SELECT texto , data FROM desafio WHERE texto = ?";
    //executa o select e imprime no log caso encontrou alguma linha ou se aconteceu algum erro
    $cordovaSQLite.execute(db, select,[texto]).then(function(result){
      if (result.rows.length > 0 ){
        console.log("SELECIONADO ->" + result.rows.item(0).texto + " " + result.rows.item(0).data);
        //Mostra os resultados
        for (var i = 0; i < result.rows.length ; i++) {
            console.log("SELECIONADO ->" + result.rows.item(i).texto + " " + result.rows.item(i).data +"inicio id: "+i);
            $scope.items.push(result.rows.item(i));
        }
        alert(JSON.stringify($scope.items));
        console.log("SELECIONADO ->" + result.rows.item(i).texto + " " + result.rows.item(i).data +"Fim id: "+i);
        return $scope.items;
      }else{
        console.log("NENHUMA LINHA ENCONTRADA.");
      }
    }, function(error){
        console.log(error);
    });
  }

});
