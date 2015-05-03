angular.module('desafioApp.cadastroCtrl', [])

.controller("CadastroController",function($scope,$cordovaSQLite,$ionicLoading,$ionicPlatform,$location,$stateParams){
  $scope.item = {};
  $scope.usuario = {};

  //Função inserir  = inclui registro no banco
  $scope.inserirItem = function(item){
    var insert = "INSERT INTO DESAFIO ( texto, data) VALUES (?,?)";
    //executa o insert e imprime no log quando inserir ou se aconteceu algum erro.
    $cordovaSQLite.execute(db, insert, [$scope.item.texto, $scope.item.datas]).then(function(result){
      console.log("INSERIDO id ->" + result.insertId);
      $ionicLoading.show({ template: 'Item Adicionado!', duration: 2000 });
     // $scope.lista.push({id: result.insertId, texto: $scope.item.texto, data: new Date($scope.item.datas)});
    }, function(error){
      console.log(error);
    });
    //limpa
    $scope.item = {};
  }

   //Função inserir  = inclui registro no banco
  $scope.inserirUsuario = function(usuario){
    var insert = "INSERT INTO USUARIO (nome,email,usuario, senha) VALUES (?,?,?,?)";
    var select = 'SELECT * FROM USUARIO WHERE usuario = ?';

    $cordovaSQLite.execute(db, select,[$scope.usuario.usuario]).then(function(result){
      //Valida se já existe um usuário com o mesmo nome.
      if(result.rows.length > 0 ){
        $ionicLoading.show({ template: 'Esse nome de Usuário já existe!', duration: 2000 });
      }else{
        //executa o insert e imprime no log quando inserir ou se aconteceu algum erro.
        $cordovaSQLite.execute(db, insert, [$scope.usuario.nome,$scope.usuario.email,$scope.usuario.usuario, $scope.usuario.senha]).then(function(result){
          console.log("INSERIDO id ->" + result.insertId);
          $ionicLoading.show({ template: 'Conta criada!', duration: 2000 });
          $location.path("/app/login");
        }, function(error){
          console.log(error);
        });
      }

    }, function(error){
      console.log(error);
    });
    //limpa
    $scope.dadousuario = {};
  }

  $scope.carregaUsuario = function() {
    var select = 'SELECT * FROM USUARIO WHERE usuario = ?';
    $cordovaSQLite.execute(db, select,[$stateParams.usuario]).then(function(result){
      if(result.rows.length > 0 ){
        $scope.usuario = {};
        $scope.usuario = {id: result.rows.item(0).id,
                                 nome: result.rows.item(0).nome,
                                 email: result.rows.item(0).email,
                                 usuario: result.rows.item(0).usuario,
                                 senha: result.rows.item(0).senha
                                 };
      }else{
        console.log("Não encontrado o cadastro!");
      }

    }, function(error){
      console.log(error);
    });
  }

  $scope.atualizarConta = function(usuario){
    var update = "UPDATE USUARIO SET nome = ?, email = ?, usuario = ?, senha = ? WHERE ID = ?";
    var select = 'SELECT * FROM USUARIO WHERE usuario = ?';

    $cordovaSQLite.execute(db, select,[$scope.usuario.usuario]).then(function(result){
      //Valida se já existe um usuário com o mesmo nome.
      if(result.rows.length > 0 ){
        $ionicLoading.show({ template: 'Esse nome de Usuário já existe!', duration: 2000 });
      }else{
        //executa o insert e imprime no log quando inserir ou se aconteceu algum erro.
        alert(JSON.stringify($scope.usuario));
        $cordovaSQLite.execute(db, update, [$scope.usuario.nome,$scope.usuario.email,$scope.usuario.usuario, $scope.usuario.senha, $scope.usuario.id]).then(function(result){
          console.log("ATUALIZADO id ->" + result.insertId);
          $ionicLoading.show({ template: 'Conta Atualizada!', duration: 2000 });
        }, function(error){
          console.log(error);
        });
      }

    }, function(error){
      console.log(error);
    });
  }

  $scope.cancela = function(){
    $location.path("/login");
  }
  //Executa Carrega usuario
  $ionicPlatform.ready(function() {
    $scope.carregaUsuario();
  });
});
