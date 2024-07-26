const allUsers = document.querySelector('.usersDiv')
const allPosts = document.querySelector('.postsDiv')
const allReactions= document.querySelector('.reactionsDiv')


async function getAllUsers() {
    const jwt = localStorage.getItem('token');

    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }

    const apiRequestUsers = await fetch('http://localhost:4040/allUsers', request);
    const result = await apiRequestUsers.json();
console.log(result)
    result.forEach(element => {
        allUsers.innerHTML +=

            `<li class=" flex flex-col divide-y divide-gray-200 rounded-lg bg-bleu-500 text-center shadow">
    <div class="flex flex-1 flex-col p-8">
      <img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="http://localhost:4040/${element.image}" alt="profile image">
      <h3 class="mt-6 text-sm font-medium text-gray-900">Username :${element.name}</h3>
      <dl class="mt-1 flex flex-grow flex-col justify-between">
        <dt class="sr-only"></dt>
        <dd class="text-sm text-white-500">${element.email}</dd>
        <dt class="sr-only">created at:${new Date(element.create_at).toLocaleDateString('fr-FR')}</dt>
        <dd class="mt-3">
          <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">${element.role}</span>
        </dd>
      </dl>
    </div>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200  gap-1">
      </div>
    </div>
    <div> <button class='btnDeleteUser-${element.user_id}' > <i class="fa-solid fa-trash"></i> </button>  <button class='ml-2 btnUpdateUser-${element.user_id}' >         <i class="fa-solid fa-pen-to-square"></i>
    </button> </div>
  </li>`
  let btnDeleteUser = document.querySelector(`.btnDeleteUser-${element.user_id}`)
  btnDeleteUser.addEventListener('click', () => {
      deleteUser()
  })
  
  let btnUpdateUser = document.querySelector(`.btnUpdateUser-${element.user_id}`)
  btnUpdateUser.addEventListener('click', () => {
      updateUser()
  })

    });
};



async function getAllPosts() {
    const jwt = window.localStorage.getItem("token");

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${jwt}`,
        },
    }


    const apiRequestPosts = await fetch('http://localhost:4040/allPosts', request);
    const result = await apiRequestPosts.json();
    console.log(result);
    result.forEach(element => {
        allPosts.innerHTML +=
            `<div class="w-full bg-sky-50 h-screen flex flex-row flex-wrap justify-center ">
            <div class="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased">
                <div class="mt-3 flex flex-col">
                    <div class="bg-white mt-3">
                    <span>${element.visibility}</span>
                        <img class="border rounded-t-lg shadow-lg "
                            src="http://localhost:4040/${element.file}" alt="image">
                            <div class="bg-white border shadow p-5 text-xl text-gray-700 font-semibold">
                            ${element.text}
                            </div>
                            <div class="bg-white p-1 border shadow flex flex-row flex-wrap">
                            <div class="likeBtn w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold"><button id="like-button" class="like-button">&#x2764;</button>

                            </div>
                            <div
                                onclick="createComment()" class="commentBtn w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">
                                comment</div>
                            <div
                                class="w-1/3 hover:bg-gray-200 border-l-4 text-center text-xl text-gray-700 font-semibold">
                                <span>created at:${new Date(element.createdAt).toLocaleDateString('fr-FR')}</span></div>
                            </div>

                        <div
                            class="bg-white border-4 bg-gray-300 border-white rounded-b-lg shadow p-5 text-xl text-gray-700 content-center font-semibold flex flex-row flex-wrap">
                            <div class="w-full">
                                <div class=" w-full text-left text-xl text-gray-600">
                         <div class="pt-6">
    
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div> <button class='btnDeletePost-${element._id}' > <i class="fa-solid fa-trash"></i> </button>  <button class='ml-2 btnUpdatePost-${element._id}' >         <i class="fa-solid fa-pen-to-square"></i>
            </button> </div>
        </div>
       `
 let btnDeletePost = document.querySelector(`.btnDeletePost-${element._id}`)
btnDeletePost.addEventListener('click', () => {
    deletePost(element._id)
})

let btnUpdatePost = document.querySelector(`.btnUpdatePost-${element._id}`)
btnUpdatePost.addEventListener('click', () => {
    updatePost(element._id, element)
})
 
    })
}; 

async function getAllReactions(){
const jwt = window.localStorage.getItem("token");

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${jwt}`,
        },
    }

 const apiRequest = await fetch('http://localhost:4040/allReactions', request);
    const result = await apiRequest.json();
    console.log(result)
    result.forEach(element=>{
        

    allReactions.innerHTML+= 

`<div class="relative">
<div class="md:flex items-center md:space-x-4 mb-3">
    <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
        <!-- Icon -->
        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
            <svg class="fill-emerald-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
            </svg>
        </div>
        <!-- Date -->
        <time class="text-sm font-medium text-indigo-500 md:w-28">Created at:${new Date(element.createdAt).toLocaleTimeString('FR-fr')}</time>
    </div>
    <!-- Title -->
    <div class="text-slate-500 ml-14"><span class="text-slate-900 font-bold">${element.user_id}</span> liked the post ${element._id}</div>
</div>
<!-- Card -->
<div class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">${element.comment}</div>
<div> <button class='btnDeleteReaction-${element._id}' > <i class="fa-solid fa-trash"></i> </button>  <button class='ml-2 btnUpdateReaction-${element._id}' >         <i class="fa-solid fa-pen-to-square"></i>
</button> </div>
</div>` 

let btnDeleteReaction = document.querySelector(`.btnDeleteReaction-${element._id}`)
btnDeleteReaction.addEventListener('click', () => {
    deleteReaction(element._id)
})

let btnUpdateReaction = document.querySelector(`.btnUpdateReaction-${element._id}`)
btnUpdateReaction.addEventListener('click', () => {
    updateReaction(element._id, element)
})
    })
   
};

async function getFollowers(){ 
    // const jwt = localStorage.getItem('token');

        
            let request = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    // Authorization: `Bearer ${jwt}`,
                },
            }
            let apiRequest = await fetch(`http://localhost:4040/Followers`, request)
            let result = await apiRequest.json()
            result.forEach(element => {
                Followers.innerHTML+= `<div class="media flex pb-4">
               
                <div class="media-body">
                  <div>
                    <a class="inline-block text-base font-bold mr-2" href="#">Username :${element.userName}</a>
                    <span class="text-slate-500 dark:text-slate-300">25 minutes ago</span>
                  </div>
                  <p>Follower</p>
                  <div class="mt-2 flex items-center">
                    <a class="inline-flex items-center py-2 mr-3" href="#">Follower :${element.follower}
                      <span class="mr-2">
                        <svg class="fill-rose-600 dark:fill-rose-400" style="width: 22px; height: 22px;"
                          viewBox="0 0 24 24">
                          <path
                            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                          </path>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>`
        
        
        })
        };

    

async function deleteUser() {
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    let apiRequest = await fetch('http://localhost:4040/deleteUser/${user_id}', request)
    let result = await apiRequest.json()
    window.alert('user deleted !')
    window.location.reload()
}

async function deletePost(){
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    let apiRequest = await fetch('http://localhost:4040/deletePost/${id}', request)
    let result = await apiRequest.json()
    window.alert('post deleted !')
    window.location.reload()
}

async function deleteReaction(){
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    let apiRequest = await fetch('http://localhost:4040/deleteReaction/${id}', request)
    let result = await apiRequest.json()
    window.alert('post deleted !')
    window.location.reload()
}
async function updateUser() {
    const jwt = localStorage.getItem('token');
const user_id=jwt.user_id
    const name = document.querySelector('#editName').value;
    const email = document.querySelector('#editEmail').value;
    const password = document.querySelector('#editPassword').value;
    const image = document.querySelector('#editImage').value;


    const userUpdated = {
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
        body: JSON.stringify(userUpdated),
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