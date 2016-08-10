'use strict';

var app = angular.module('e-Ditto', [])

.directive('editto', ['$compile', function($compile) {
    return {
        restrict: 'AE',
            scope: {
                myDirectiveVar: '=ngModel',
                documento: '=?',
                barraBotoes: '=?',
                opcoes: '=?'
            },
        template: '<div><textarea data-ng-model="myDirectiveVar" id="meuTextarea"></textarea></div>',
        replace: true,
        controller: 'EditorCtrl'
    };
}])

.controller('EditorCtrl',
    ['$scope',
    function($scope) {

        // Caso não sejam definidas propriedades específicas
        $scope.opcoes = $scope.opcoes || {};

        document.getElementById('meuTextarea').value = $scope.myDirectiveVar;
        var areaEditor = new eDitto("meuTextarea", $scope.opcoes);

        // Parar cópia automática realizada pelo editor
        areaEditor.obterDocumento().pararPassag();

        // Refazendo manualmente passagem de valor
        var passaValor = setInterval(function() {
            areaEditor.obterDocumento().setValue();
            $scope.myDirectiveVar = areaEditor.obterDocumento().frame.body.innerHTML;
            $scope.$apply();
        }, 500);


        $scope.documento = areaEditor.obterDocumento();
        $scope.barraBotoes = areaEditor.obterBarraBotoes();
    }
]);
