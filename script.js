function getuserdata(user,a) {
    // console.log(a);
    
    
  return fetch(`https://api.github.com/users/${user}`).then(function (raw) {
    if (!raw.ok) throw new Error("Error while fetching user details....");
    return raw.json();
  });
}

let usernameinp = document.querySelector(".usernameinp");
let searchbtn = document.querySelector("#searchbtn");
let  div = document.querySelector(".divrender")


function dataRendering(details,a) {
    console.log(a);
    console.log(details);
    
  let data = `  <img
        id="avatar"
        src=${details.avatar_url}
        alt="Avatar"
        class="w-40 h-40 rounded-full border-4 border-blue-500 shadow-2xl neon-border"
      />
    </div>

    <!-- Info -->
    <div class="flex-1 space-y-3">
      <h2 id="name" class="text-3xl font-bold text-white">${details.name}</h2>
      <p id="bio" class="text-gray-300 italic">${details.bio}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
        <p><span class="text-white font-semibold">Username:</span> <span id="login">${username}</span></p>
        <p><span class="text-white font-semibold">Company:</span> <span id="company">${details.company || ""}</span></p>
        <p><span class="text-white font-semibold">Location:</span> <span id="location">${details.location || ""}</span></p>
        <p><span class="text-white font-semibold">Website:</span> <a id="blog" href="#" class="text-blue-400 hover:underline">github.blog</a></p>
        <p><span class="text-white font-semibold">Email:</span> <span id="email">${details.email || "N/A"}</span></p>
        <p><span class="text-white font-semibold">Id:</span> <span id="id">${details.id || "N/A"}</span></p>
        <p><span class="text-white font-semibold">Public Repos:</span> <span id="repos">${details.public_repos || ""}</span></p>
        <p><span class="text-white font-semibold">Followers:</span> <span id="followers">${details.follwers || "0"}</span></p>
        <p><span class="text-white font-semibold">Following:</span> <span id="following">${details.following || "0"}</span></p>
        <p><span class="text-white font-semibold">Url:</span> <span id="hireable">${details.url || "N/A"}</span></p>
        // <p><span class="text-white font-semibold">Created At:</span> <span id="created">${details.created_at || "N/A"}</span></p>
        <p><span class="text-white font-semibold">GitHub:</span>
          <a id="profile-link" href="https://github.com/octocat" target="_blank" class="text-blue-400 hover:underline">
            github.com/octocat
          </a>
        </p>
      </div>
    </div>`;

    div.innerHTML=data;
}

searchbtn.addEventListener("click", function () {
  username = usernameinp.value.trim();
  let he ="dkjfkdjf"
  if (username.length > 0) {
    getuserdata(username,he).then(function (details) {
      dataRendering(details,he);
    });
  } else {
    alert("Please enter username.");
  }
});
