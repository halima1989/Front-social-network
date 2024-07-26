const resultResearch = document.querySelector('.resultUsers')
const searchBtn = document.querySelector('.searchBtnUser')


const createPostAlert = document.querySelector('.createPostAlert')


async function researchUsers() {
const search = document.getElementById('default-search').value

const newSearch = {
    search: search,
}
const request = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(newSearch),
}
console.log(search)

const apiRequest = await fetch('http://localhost:4040/researchUser', request)
const result = await apiRequest.json()
resultResearch.innerHTML = ''
result.forEach((element) => {
    resultResearch.innerHTML +=`<li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
    <div class="flex w-full items-center justify-between space-x-6 p-6">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="truncate text-sm font-medium text-gray-900">${element.name}</h3>
          <span class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-green-600/20">Creator</span>
        </div>
      </div>
      <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="http://localhost:4040/${element.image}" alt="profile">
    </div>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex w-0 flex-1">
          <a href="${element.email}" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            Email
          </a>
        </div>
        <div class="-ml-px flex w-0 flex-1">
          <a href="" class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
          <span class="material-symbols-outlined">
          subscriptions
          </span>
            Follow
          </a>
        </div>
      </div>
    </div>
    </li>
    `;
})

}

async function getMyPosts (){
const jwt = localStorage.getItem('token');
const MyPostsDiv =document.querySelector('.myPosts')

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    let apiRequest = await fetch(`http://localhost:4040/myPosts`, request)
    let result = await apiRequest.json()
    result.forEach(element => {
        MyPostsDiv.innerHTML+= 
        `<div class="w-full bg-indigo-100 h-screen flex flex-row flex-wrap justify-center ">
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
                        <div onclick="createComment()"
                            class="commentBtn w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">
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
                
            </div><div class= ""><button class='btnDeleteMyPost-${element._id}'> <i class="fa-solid fa-trash"></i> </button><button class='ml-2 btnUpdateMyPost-${element._id}' ><i class="fa-solid fa-pen-to-square"></i>
        </button> </div>
        </div>
        
        </div>
        `
    })
let btnDeleteMyPost = document.querySelector(`.btnDeleteMyPost-${element._id}`)
btnDeleteMyPost.addEventListener('click', () => {
    deleteMyPost(element._id)
})

let btnUpdateMyPost = document.querySelector(`.btnUpdateMyPost-${element._id}`)
btnUpdateMyPost.addEventListener('click', () => {
    updateMyPost(element._id, element)
})
    }


async function getFollowers(){ 
    const jwt = localStorage.getItem('token');
    let Followers = document.querySelector('.followersDiv')
    const user_id = authdata.user_id;

        
            let request = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${jwt}`,
                },
            }
            let apiRequest = await fetch(`http://localhost:4040/Followers/${user_id}`, request)
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

    
const commentBtn = document.querySelector('.commentBtn')
const likeBtn= document.querySelector('.likeBtn')
const closeModalBtn = document.getElementById('closeModalBtn')
const submitComment = document.getElementById('submitCommentBtn')
const commentModal= document.getElementById('commentModal')


commentBtn.addEventListener('click', () => {
commentModal.classList.remove('hidden');
       });
       
      
       submitComment.addEventListener('click', async function createReaction() {
        const comment = document.getElementById('commentInput').value
        console.log(comment); 
           const newReaction = {
               like: Boolean,
               comment: comment
           }; 
       
       try { 
           let request = {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   authorization: `Bearer ${jwt}`,
               },
               body: JSON.stringify(newReaction),
           }
           const apiRequest = await fetch('http://localhost:4040/createReaction', request)
           const result = await apiRequest.json()
           
           closeModalBtn.addEventListener('click', () => {
            commentModal.classList.add('hidden');
        });
        
           commentModal.classList.add('hidden');
           comment = '';  
       
       } catch (error) {
       
           console.error(error.stack);
       }
          
       }
       ); 
async function createPost() {
    
        let file = document.querySelector('.file')
        let text = document.querySelector('.text').value
        let visibility = document.querySelector('.visibility').value
       
    
        const formData = new FormData()
    
        formData.append('image', file.files[0])
    
        const response = await fetch(
            'http://localhost:4040/insertImage',
            {
                method: 'POST',
                body: formData,
            }
        )
        let data = await response.json()
    
        if (response.status === 200) {
    
    
            let post = {
                text: text,
                visibility: visibility,
                file : data.newFileName
             
            }
    
            let request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(post),
            }
    
const apiRequest = await fetch(
                'http://localhost:4040/createPost',
                request);
const result = await apiRequest.json()
console.log(('Post created successfully:', result))
            
         if (apiRequest.status === 201) {
            createPostAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Post successfully created</p>`
            window.location.href= 'user.html'
            } else { 
            createPostAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Any post was created</p>`
            return
                }
            
        }
    }

     
// async function createPost() { 
//     let jwt = window.localStorage.getItem("token");
//     const text = document.querySelector('.text').value;
//     const file= document.querySelector('.file');
//     const visibility = document.querySelector('.visibility').value;
//        console.log(file.files[0]);
       
//            if (!file.files[0]) {
//                alert("No file selected.")
//                return
       
//            }
//     const formData = new FormData()
//     formData.append('image', file.files[0] )

//      const response = await fetch(
//                'http://localhost:4040/insertImage',
//                {
//                    method :'POST',
//                    body: formData,
//                }
//            )
           
//     let data = await response.json()
//     console.log(data);
//     if (response.status === 200) {
//         let uploadedImage = data.newFileName
       
//            let newPost = {
//                text: text,
//                file: uploadedImage,
//                visibility: visibility
               
//            }
//         }
       
//            let request = {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json; charset=utf-8',
//                    authorization: `Bearer ${jwt}`,
//                },
//                body: JSON.stringify(newPost),
//            }
       
//     const apiRequest = await fetch('http://localhost:4040/createPost', request)
//     const result = await apiRequest.json()
//        if (apiRequest.status === 201) {
//            createPostAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Post successfully created</p>`
//            window.location.href= './user.html'
//        } else { 
//            createPostAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Any post was created</p>`
//            return
       
//        }
//     //    catch (error) {
//     //        console.error(error.stack);
//     //       createPostAlert.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">An error occurred. Please try again !</p>`;
       

//        }
        
       
          
       


  