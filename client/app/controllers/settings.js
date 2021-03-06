// ----------------------------------------------------------------------------
// define controller
app.controller( 'settings', ['$scope', '$http', '$translate', '$window', 'Upload', function( $scope, $http, $translate, $window, Upload ) {
    $http.get( 'themes' ).then( function( res ) {
        $scope.themes = res.data;
    });

    $http.get( 'portfolio/settings' ).then( function( res ) {
        $scope.settings = res.data;
    });

    $scope.change = function() {
        $http.post( 'portfolio/settings', $scope.settings );
    };

    $scope.destroy = function() {
        $http.delete( 'portfolio' ).then( function() {
            $translate( 'settings.destroy.success' ).then( function( trad ) {
                $window.alert( trad );
                $window.document.location.reload( true );
            });
        });
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'upload',
            data: {
                cv: file
            }
        }).then( function() {
            // success
            $translate( 'settings.uploaded.success' ).then( function( trad ) {
                $window.alert( trad );
            });
        }, function() {
            // error
            $translate( 'settings.uploaded.error' ).then( function( trad ) {
                $window.alert( trad );
            });
        }, function() {
            // progress event
        });
    };
}]);