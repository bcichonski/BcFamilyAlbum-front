class BackendService {
    constructor(backendUrl) {
        this.backendUrl = backendUrl;//https://localhost:44332/
        this.backendUrlAlbumController = this.backendUrl+'albuminfo'
    }

    fetchAlbumInfo(onSuccess) {
        fetch(this.backendUrlAlbumController)
        .then(res => res.json())
        .then((data) => {
            onSuccess(data);
        })
        .catch(console.log)
    }

    getItemUrl(id) {
        return this.backendUrlAlbumController+'/'+id
    }

    deleteItem(id, onSuccess) {
        fetch(this.backendUrlAlbumController+'/'+id, {
            method: 'DELETE'
        })
        .then(onSuccess(id))
        .catch(console.log)
    }
}

export default BackendService;