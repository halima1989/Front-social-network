const registerAlert = document.querySelector('.registerAlert')


async function registerUser(event) {
    event.preventDefault();
    
const name = document.querySelector('.name').value
const email = document.querySelector('.email').value
const password = document.querySelector('.password').value
const imageProfile = document.querySelector('.image')
console.log(image);
if (!imageProfile.files[0]) {
    alert("No image selected.");
}
    const formData = new FormData()
    formData.append('image', imageProfile.files[0])
try {
    const response = await fetch(
        'http://localhost:4040/insertImage',
        {
            method: 'POST',
            body: formData,
        }
    )
    let data = await response.json()
    console.log(data);

    const newUser = {
        name: name,
        email: email,
        password: password,
        image: data.newFileName
    }
    console.log(newUser)
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(newUser),

    }

 const apiRequest = await fetch(
        'http://localhost:4040/register', request )
    const result = await apiRequest.json()
    if (apiRequest.status === 201) {
        registerAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Registration successful</p>`
        window.location.href = './login.html'

    } else {
        registerAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Wrong credentials !</p>`
        return
    }
} catch (error) {
    console.log(error.stack);
    registerAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">An error occurred. Please try again later.</p>`;


}}
