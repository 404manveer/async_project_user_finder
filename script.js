let searchbtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let Card = document.querySelector(".Card");

function userdata(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (raw.ok) {
      return raw.json();
    } else {
      alert("User not found!!");
      
    }
  });
}

function userrepo(d) {
  return fetch(`https://api.github.com/users/${d}/repos?sort=updated`).then(
    (raw) => {
      if (!raw.ok) alert("unable to get info of repo...")
      return raw.json();
    }
  );
}

function rending(details) {
  console.log(details);

  let data = `<div class="bg-gray-900/70 border border-gray-800 rounded-2xl p-8 flex items-start gap-6 shadow-2xl backdrop-blur-lg animate-fade-in">
  <!-- Avatar -->
  <div class="relative">
    <img
      src="${details.avatar_url}"
      alt="Avatar"
      class="w-28 h-28 rounded-full border-4 border-gradient-to-tr from-blue-500 to-purple-600 shadow-xl"
    />
    <div class="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900"></div>
  </div>

  <!-- Info -->
  <div class="text-white w-full">
    <h2 class="text-3xl font-bold mb-1">${
      details.name || "No Name Provided"
    }</h2>
    <p class="text-sm text-gray-400 mb-3 italic">${
      details.bio || "No bio available."
    }</p>

    <ul class="text-gray-300 text-sm space-y-2">
      <li><span class="font-bold text-amber-300">👤 Username:</span> ${
        details.login
      }</li>
      <li><span class="font-semibold">📂 Public Repos:</span> ${
        details.public_repos
      }</li>
      <li><span class="font-semibold">👥 Followers:</span> ${
        details.followers
      }</li>
      <li><span class="font-semibold">👣 Following:</span> ${
        details.following
      }</li>
      <li><span class="font-semibold">🏢 Company:</span> ${
        details.company || "Not Mentioned"
      }</li>
      <li><span class="font-semibold">📍 Location:</span> ${
        details.location || "Not Mentioned"
      }</li>
      <li><span class="font-semibold">🕓 Joined:</span> ${new Date(
        details.created_at
      ).toLocaleDateString()}</li>
      ${
        details.blog
          ? `<li><span class="font-semibold">🔗 Blog:</span> <a href="${details.blog}" target="_blank" class="text-blue-400 hover:underline">${details.blog}</a></li>`
          : ""
      }
      ${
        details.twitter_username
          ? `<li><span class="font-semibold">🐦 Twitter:</span> <a href="https://twitter.com/${details.twitter_username}" target="_blank" class="text-blue-400 hover:underline">@${details.twitter_username}</a></li>`
          : ""
      }
      ${
        details.email
          ? `<li><span class="font-semibold">📧 Email:</span> <a href="mailto:${details.email}" class="text-blue-400 hover:underline">${details.email}</a></li>`
          : ""
      }
      <li>
        <span class="font-semibold">🌐 Profile:</span>
        <a href="${
          details.html_url
        }" target="_blank" class="text-blue-400 hover:underline">
          ${details.html_url}
        </a>
      </li>
    </ul>
  </div>
</div>
`;

  Card.innerHTML = data;
}

searchbtn.addEventListener("click", function () {
  username = usernameinp.value.trim();
  if (username.length > 0) {
    userdata(username).then(function (data) {
      rending(data);
      
    });
  } else {
    alert("Please enter username!");
  }
});
