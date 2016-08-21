angular.module('eve.filters').filter('limitObjectTo', function() {
    return function(obj, limit) {
        var newObj = {},
            i = 0;
        for (var p in obj) {
            newObj[p] = obj[p];
            if (++i === limit) break;
        }
        return newObj;
    };
});