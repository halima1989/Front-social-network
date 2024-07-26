const loginAlert = document.querySelector('.loginAlert')


async function loginUser(event) {
    event.preventDefault();
    let email = document.querySelector('.email').value
    let password = document.querySelector('.password').value

    let user = {
        email: email,
        password: password,
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    }

    let apiRequest = await fetch('http://localhost:4040/login', request)
    let result = await apiRequest.json()


    if (apiRequest.status !== 200) {
        loginAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Invalid credentials</p>`
        return
    } else {
        const data = await result
        console.log(data);
        window.localStorage.setItem('jwt', data.jwt)
        window.localStorage.setItem('role', data.role)

        loginAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Login successful
     </p>`
        if (data.role === 2) {
           
                window.location.href = './admin.html'

            return
        } else {
          
                window.location.href = './user.html'
          
            return
        }
    }
};

