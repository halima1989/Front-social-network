const updatePostAlert= document.querySelector('.updatePostAlert');


async function updatePost() {
    const jwt = localStorage.getItem('token');

    const text = document.querySelector('#editText').value;
    const file = document.querySelector('#editFile').value;
    const visibility = document.querySelector('#editVisibility').value;

    
    if (!file.files[0]) {
        alert("No file selected.")
        return

    }
    const formData = new FormData()
    formData.append('image', file.files[0] )

    const response = await fetch(
        'http://localhost:4040/insertImage',
        {
            method :'POST',
            body: formData,
        }
    )
    let data = await response.json()
    console.log(data);

    let postUpdated = {
        text: text,
        file: data.newFileName,
        visibility: visibility
        
    }
    
    const request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(postUpdated),
    };

    const apiRequest = await fetch(
        `http://localhost:4040/updatePost/${_id}`, 
        request
    );

    const result = await apiRequest.json();
    if (apiRequest.status !== 200) {
        updatePostAlert.innerText = 'Failed to update post!';
        updatePostAlert.classList.add('text-red-500');
        return;
    }
    updatePostAlert.innerText = 'Post updated successfully!';
    updatePostAlert.classList.add('text-green-500');
    window.location.reload();


}