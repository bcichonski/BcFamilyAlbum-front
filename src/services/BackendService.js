class BackendService {
    constructor(backendUrl) {
        this.backendUrl = backendUrl;//https://localhost:44332/
        this.backendUrlAlbumController = this.backendUrl + 'albuminfo'
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    fetchAlbumInfo(onSuccess) {
        fetch(this.backendUrlAlbumController)
            .then(this.handleErrors)
            .then(res => res.json())
            .then((data) => {
                onSuccess(data);
            })
            .catch(console.log)
    }

    getItemUrl(id) {
        return this.backendUrlAlbumController + '/' + id + '?' + (new Date().getTime())
    }

    deleteItem(id, onSuccess, onFinish) {
        fetch(this.backendUrlAlbumController + '/' + id, {
            method: 'DELETE'
        })
            .then(this.handleErrors)
            .then(onSuccess(id))
            .catch(console.log)
            .finally(onFinish(id))
    }

    rotateItem(id, onSuccess, onFinish) {
        fetch(this.backendUrlAlbumController, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id.toString() })
        })
            .then(this.handleErrors)
            .then(onSuccess(id))
            .catch(console.log)
            .finally(onFinish(id))
    }
}

export default BackendService;