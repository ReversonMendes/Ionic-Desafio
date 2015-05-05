var db = null;

var lista = []; //Array com os registros

var desafio = angular.module('desafioApp', ['ionic', 'ngCordova','desafioApp.cadastroCtrl','desafioApp.listaCtrl','desafioApp.loginCtrl'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //inicia o banco sql
    //db = $cordovaSQLite.openDB({ name: "desafio.db"});
    db = openDatabase("desafio.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS desafio (id integer primary key, texto text, data text)");
                tx.executeSql("CREATE TABLE IF NOT EXISTS usuario (id integer primary key, nome text, email text, usuario text, senha text)");
    });
    //$cordovaSQLite.execute(db,"DROP TABLE IF EXISTS desafio");
    //$cordovaSQLite.execute(db,"DROP TABLE IF EXISTS usuario");
    //Cria a tabela  caso não estiver criada
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS desafio (id integer primary key, texto text, data text)");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS usuario (id integer primary key, nome text, email text, usuario text, senha text)");
    console.log("TABELA CRIADA");
  });
});

//Controle de rotas
desafio.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

		.state('app', {
		    url: "/app",
		    abstract: true,
		    templateUrl: "templates/menu.html",
		    controller: 'loginController'
		  })

      .state('login', {
          url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        })

      .state('app.conta', {
          url: '/conta/:usuario',
          views: {
            'menuContent': {
              templateUrl: 'templates/conta.html',
              controller: 'CadastroController'
            }
          }
        })

       .state('app.lista', {
            url: '/lista',
            views: {
     			'menuContent': {
            		templateUrl: 'templates/lista.html',
            		controller: 'listaController'
            	}
            }
        })

         .state('app.cadastroItem', {
            url: '/cadastroItem',
            views: {
     			'menuContent': {
            templateUrl: 'templates/cadastro_item.html',
            controller: 'CadastroController'
		        }
		    }
        })

        .state('cadastroUsuario', {
            url: '/cadastroUsuario',
            templateUrl: 'templates/cadastro_usuario.html',
            controller: 'CadastroController'
        })

        .state('app.sobre', {
            url: '/sobre',
            views: {
     			'menuContent': {
            templateUrl: 'templates/sobre.html',
            controller: 'CadastroController'
		        }
		    }
        })
    	$urlRouterProvider.otherwise('/app/lista');
});


