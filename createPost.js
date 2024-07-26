// const createPostAlert = document.querySelector('.createPostAlert')

// async function createPost() { 
//     const text = document.querySelector('.text').value;
//     const filePost= document.querySelector('.file');
//     const visibility = document.querySelector('.visibility').value;
// console.log(filePost.files[0]);

//     if (!filePost.files[0]) {
//         alert("No file selected.")
//         return

//     }
//     const formData = new FormData()
//     formData.append('image', filePost.files[0] )
// try{
//     const response = await fetch(
//         'http://localhost:4040/insertImage',
//         {
//             method :'POST',
//             body: formData,
//         }
//     )
    
//     let data = await response.json()
//     console.log(data);

//     let newPost = {
//         text: text,
//         file: data.newFileName,
//         visibility: visibility
        
//     }
//     let jwt = window.localStorage.getItem("token");

//     let request = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8',
//             authorization: `Bearer ${jwt}`,
//         },
//         body: JSON.stringify(newPost),
//     }

//     const apiRequest = await fetch('http://localhost:4040/createPost', request)
//     const result = await apiRequest.json()
// if (apiRequest.status === 201) {
//     createPostAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Post successfully created</p>`
//     window.location.href= './user.html'
// } else { 
//     createPostAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Any post was created</p>`
//     return

// }
// } catch (error) {
//     console.error(error.stack);
//    createPostAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">An error occurred. Please try again !</p>`;


// }
 
// }
