(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController);

    function ShoppingListCheckOffService() {
        var service = this;

        // Initial items to buy
        service.itemsToBuy = [
            { name: "cookies", quantity: 10 },
            { name: "chips", quantity: 5 },
            { name: "soda", quantity: 3 },
            { name: "bread", quantity: 2 },
            { name: "milk", quantity: 1 }
        ];
        service.itemsBought = [];

        service.buyItem = function(itemIndex) {
            var item = service.itemsToBuy[itemIndex];
            service.itemsBought.push(item);
            service.itemsToBuy.splice(itemIndex, 1);
        };

        service.getItemsToBuy = function() {
            return service.itemsToBuy;
        };

        service.getItemsBought = function() {
            return service.itemsBought;
        };
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyCtrl = this;
        toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();

        toBuyCtrl.buyItem = function(item) {
            var index = toBuyCtrl.items.indexOf(item);
            ShoppingListCheckOffService.buyItem(index);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtCtrl = this;
        alreadyBoughtCtrl.items = ShoppingListCheckOffService.getItemsBought();
    }

})();
