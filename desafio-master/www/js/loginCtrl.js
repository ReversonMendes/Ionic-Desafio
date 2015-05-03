angular.module('desafioApp.loginCtrl', [])

.controller("loginController",function($scope, $ionicModal, $cordovaSQLite, $ionicPlatform, $ionicLoading, $location){
  // Dados de login
  $scope.loginData = {};

    // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Abre o login modal
  $scope.login = function() {  
       // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
  };
  
    //Executa abertura
  $ionicPlatform.ready(function() {
    $scope.login();
  });

  // Valida Login
  $scope.validaLogin = function() {
    var select = 'SELECT * FROM USUARIO WHERE usuario = ? AND senha = ?' ;
    $cordovaSQLite.execute(db, select,[$scope.loginData.usuario,$scope.loginData.senha]).then(function(result){
      if(result.rows.length > 0 ){
        $location.path("/app/lista");
        $scope.modal.hide();
      }else{
        $ionicLoading.show({ template: 'Usuário ou Senha Incorreta!', duration: 2000 });
      }

    }, function(error){
      console.log(error);
    });
  };

  //Fecha o Modal
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.conta = function(){
    $location.path("/app/conta/"+$scope.loginData.usuario);
    $scope.modal.hide();
  };

   $scope.cadastro = function(){
    $location.path("/cadastroUsuario");
    $scope.modal.hide();
  };

  $scope.sair = function(){
    window.close();
    ionic.Platform.exitApp();
  };

});
