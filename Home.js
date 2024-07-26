const logoutBtn =document.querySelector('logoutBtn')

function logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('role_id')
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault
        logout()
        window.alert('Disconnected successfull')
    })
}
