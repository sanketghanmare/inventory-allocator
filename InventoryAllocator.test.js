const InventoryAllocator = require('./InventoryAllocator');


test("Return Warehouses list is Empty.", () => {
    expect(InventoryAllocator({apple: 5, banana: 5, orange: 5}, [])).toStrictEqual("Warehouses are Empty.");
});


test("Return Item list is Empty.", () => {
    expect(InventoryAllocator({},
        [{name: 'owd', inventory: {apple: 5, orange: 10}}, {name: 'dm', inventory: {banana: 5, orange: 10}}]
    )).toStrictEqual("Item list is Empty.")
});


test("Return Missing or Improper Input Parameters.", () => {
    expect(InventoryAllocator({},
        "[{name: 'owd', inventory: {apple: 5, orange: 10}}, {name: 'dm', inventory: {banana: 5, orange: 10}}]"
    )).toStrictEqual("Missing or Improper input parameters.")
});


test("Null Test", () => {
    expect(InventoryAllocator(null,
        [{name: 'owd', inventory: {apple: 5, orange: 10}}, {name: 'dm', inventory: {banana: 5, orange: 10}}]
    )).toStrictEqual("Either one or Both of the Parameters is Null.")
});


test("Order can be shipped using one warehouse", () => {
    expect(InventoryAllocator({apple: 1}, [{name: "owd", inventory: {apple: 1}}])).toStrictEqual([{owd: {apple: 1}}])
});


test("Order can be shipped using multiple warehouses", () => {
    expect(InventoryAllocator({apple: 10}, [{name: "owd", inventory: {apple: 5}}, {
        name: "dm",
        inventory: {apple: 5}
    }])).toStrictEqual([{owd: {apple: 5}}, {dm: {apple: 5}}])
});


test("Order cannot be shipped because there is not enough inventory", () => {
    expect(InventoryAllocator({apple: 1}, [{
        name: "owd",
        inventory: {apple: 0}
    }])).toStrictEqual([])
});


test("Order cannot be shipped because a few listed items are not in inventory", () => {
    expect(InventoryAllocator({mango: 5, strawberry: 5, jackfruit: 5, orange: 10},
        [{name: 'owd', inventory: {apple: 5, orange: 10}}, {name: 'dm', inventory: {banana: 5, orange: 10}}]
    )).toStrictEqual([])
});


test("Empty Call to Function will return Missing or Improper input parameters", () => {
    expect(InventoryAllocator()).toStrictEqual("Missing or Improper input parameters.")
});