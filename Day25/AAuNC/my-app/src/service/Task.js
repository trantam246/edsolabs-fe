
//hàm get all
const getAllList = (callback) => {
    fetch('http://localhost:5000/tasks')
        .then(res => res.json())
        .then(callback)
        .catch(error => console.log('Error:', error));
}

//hàm post
const postItem = (data, callback) => {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    fetch('http://localhost:5000/tasks', options)
        .then(res => res.json())
        .then(callback)
        .catch(error => console.log('Error:', error));
}

//hàm update
const updateItem = (id, data) => {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    fetch(`http://localhost:5000/tasks/${id}`, options)
        .then(res => res.json())
        .catch(error => console.log('Error:', error));
}

//hàm delete
const deleteItem = (id) => {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    fetch(`http://localhost:5000/tasks/${id}`, options)
        .then(res => res.json())
        .catch(error => console.log('Error:', error));
}

export { getAllList, postItem, updateItem, deleteItem };
