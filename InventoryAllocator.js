/*
    Function: InventoryAllocator() takes Object of items and quantity & list of warehouses as parameters.

    Output: Function returns the list of items along with their inventory name, item name and item quantity.

    Note: if order cannot be fulfilled then returns empty list or if one of the two if conditions failed then returns
          messages accordingly.
 */

function InventoryAllocator(setOfItemsAndQuantity, ListOfWarehouses) {

    /*
    Condition to check Null for parameters
     */
    if (setOfItemsAndQuantity === null || ListOfWarehouses === null) {
        return "Either one or Both of the Parameters is Null."
    }

    /*
      Condition to check if parameters is Object.
     */
    if (typeof(setOfItemsAndQuantity) !== 'object' || typeof(ListOfWarehouses) !== 'object') {
        return "Missing or Improper input parameters."
    }

    /*
      Condition to check if setOfItemsAndQuantity is empty.
     */
    if (Object.keys(setOfItemsAndQuantity).length === 0) {
        return "Item list is Empty."
    }

    /*
      Condition to check if ListOfWarehouses is empty.
     */
    if (ListOfWarehouses.length < 1) {
        return "Warehouses are Empty."
    }

    let outputList = []

    for (const [key, value] of Object.entries(setOfItemsAndQuantity)) {

        let listItem = key
        let orderQuantity = value

        ListOfWarehouses.forEach(function (warehouse) {

            for (const [key, value] of Object.entries(warehouse["inventory"])) {

                if (orderQuantity > 0 && listItem in warehouse["inventory"] && `${value}` > 0) {

                    let tempItemAndQuantity = {}
                    let inventoryItem = key
                    let inventoryQuantity = value

                    if (listItem === inventoryItem) {
                        if (orderQuantity <= inventoryQuantity) {
                            warehouse["inventory"][inventoryItem] = inventoryQuantity - orderQuantity;
                            tempItemAndQuantity[warehouse["name"]] = {[listItem]: orderQuantity}
                        } else if (orderQuantity > inventoryQuantity) {
                            warehouse["inventory"][inventoryItem] = orderQuantity - inventoryQuantity;
                            tempItemAndQuantity[warehouse["name"]] = {[listItem]: orderQuantity - inventoryQuantity}
                        }

                        outputList.push(tempItemAndQuantity);

                        orderQuantity -= inventoryQuantity;

                        if (orderQuantity <= 0) {
                            delete setOfItemsAndQuantity[listItem];
                            break;
                        }
                    }
                }
            }
        })
    }

    /*
      Condition to check if setOfItemsAndQuantity is not empty then order can't be fulfilled and returns
       empty list.
     */
    if (Object.keys(setOfItemsAndQuantity).length !== 0) {
        for (const [key, value] of Object.entries(setOfItemsAndQuantity)) {
            outputList = []
        }
    }

    return outputList
}

module.exports = InventoryAllocator;