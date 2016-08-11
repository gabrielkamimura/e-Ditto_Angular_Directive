'use strict';

var app = angular.module('e-Ditto', [])

.directive('editto', ['$compile', function($compile) {
    return {
        restrict: 'AE',
        scope: {
            myDirectiveVar: '=ngModel',
            documento: '=?',
            barraBotoes: '=?',
            opcoes: '=?',
        },
        transclude: true,
        replace: true,
        template: '<div><textarea data-ng-model="myDirectiveVar" id="meuTextarea"></textarea><div data-ng-transclude></siv></div>',
        controller: 'EdittoCtrl'
    };
}])

.controller('EdittoCtrl',
    ['$scope',
    function($scope) {
        // Caso não sejam definidas propriedades específicas
        $scope.opcoes = $scope.opcoes || {};

        document.getElementById('meuTextarea').value = $scope.myDirectiveVar;
        $scope.editor = new eDitto("meuTextarea", $scope.opcoes);

        // Parar cópia automática realizada pelo editor
        $scope.editor.obterDocumento().pararPassag();

        // Refazendo manualmente passagem de valor
        var passaValor = setInterval(function() {
            $scope.editor.obterDocumento().setValue();
            $scope.myDirectiveVar = $scope.editor.obterDocumento().frame.body.innerHTML;
            $scope.$apply();
        }, 500);

        $scope.documento = $scope.editor.obterDocumento();
        $scope.barraBotoes = $scope.editor.obterBarraBotoes();

    }
])

// Diretiva para as personalizações a uma barra de botões
.directive('edittoButtonGroup', ['$compile', function($compile) {
    return {
        restrict: 'AE',
        scope: {
            barraBotoes: '=?',
        },
        transclude: true,
        replace: true,
        require: '^editto',
        controller: 'eDittoButtonGroupCtrl',
        template: '<div ng-transclude></div>'
    };
}])

.controller('eDittoButtonGroupCtrl',
    ['$scope',
    function($scope) {

      this.obterGrupoBotoes = function() {
        return $scope.grupoBotoes;
      }
      $scope.grupoBotoes = new eDittoButtonGroup($scope.$parent.$parent.barraBotoes);

    }
])

.directive('edittoButton', ['$compile', function($compile) {
    return {
        restrict: 'AE',
        scope: {
            icone: '=?',
            title: '=?',
            evClick: '&ngClick'
        },
        require: '^edittoButtonGroup',

        controller: 'eDittoButtonCtrl'
    };
}])

.controller('eDittoButtonCtrl',
    ['$scope',
    function($scope) {
          var personalizacao = new eDittoButton($scope.$parent.$parent.grupoBotoes, $scope.icone, $scope.title);
          personalizacao.getButtonDOM().onclick = function() {
              $scope.evClick();
          }
    }
]);
