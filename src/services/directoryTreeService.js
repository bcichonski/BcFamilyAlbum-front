/**
 * Converts album data in normalized backend format into nested objects
 * There are assumptions:
 *   - that no parent node comes after its child nodes
 *   - that first node is the root
 * to simplify the algorithm
 * @param {object[]} backendData 
 */
function backendDataToDirectoryService(backendData) {
    let cache = { }
    let frontendData

    for(const backendItem of backendData) {
        const item = {
            id: backendItem.id.toString(),
            name: backendItem.name
        }

        cache[item.id] = item

        if(!frontendData) {
            frontendData = item
        }

        if(backendItem.parentId >= 0 && cache[backendItem.parentId]) {
            if(cache[backendItem.parentId].children) {
                cache[backendItem.parentId].children.push(item)
            } else {
                cache[backendItem.parentId].children = [ item ]
            }
            
        }
    }
    
    return frontendData
}

export default backendDataToDirectoryService