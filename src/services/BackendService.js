class BackendService {
    constructor(backendUrl) {
        this.backendUrl = backendUrl;//https://localhost:44332/
        this.backendUrlAlbumController = this.backendUrl + 'albuminfo'
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
        return this.backendUrlAlbumController + '/' + id + '?' + (new Date().getTime())
    }

    deleteItem(id, onSuccess) {
        fetch(this.backendUrlAlbumController + '/' + id, {
            method: 'DELETE'
        })
            .then(onSuccess(id))
            .catch(console.log)
    }

    rotateItem(id, onSuccess) {
        fetch(this.backendUrlAlbumController, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id : id.toString() })
        })
            .then(onSuccess(id))
            .catch(console.log)
    }
}

export default BackendService;