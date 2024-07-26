const updateUserAlert = document.querySelector('.updateUserAlert');

async function updateUser() {
    const jwt = localStorage.getItem('token');
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const password = document.getElementById('editPassword').value;
    const image = document.getElementById('editImage').files[0]

    
    const user = {
        name: name,
        email: email,
        password: password,
        image: image
    };

    const request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(user),
    };

    const apiRequest = await fetch(
        `http://localhost:4040/updateUser/${user_id}`, 
        request
    );
    const result = await apiRequest.json();

if (apiRequest.status !== 200) {
    updateUserAlert.innerText = 'Failed to update user!';
    updateUserAlert.classList.add('text-red-500');
        return;
    }else{
    updateUserAlert.innerText = 'User updated successfully!';
    updateUserAlert.classList.add('text-green-500');
    window.location.reload();
    }
}