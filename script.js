// --- Fetch user data safely ---
async function getUserData(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) {
      if (res.status === 404) throw new Error("User not found.");
      throw new Error("Failed to fetch user details.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error; // rethrow so caller can handle it
  }
}

// --- DOM References ---
const usernameInp = document.querySelector("#usernameinp");
const searchBtn = document.querySelector("#searchbtn");
const div = document.querySelector(".divrender");

// --- Render function ---
function dataRendering(details) {
  const safeText = (value) =>
    value ? String(value).replace(/[<>]/g, "") : "N/A"; // Basic XSS defense

  const data = `
    <div class="flex items-center space-x-6 bg-white/10 p-6 rounded-lg shadow-lg border border-gray-700">
      <img
        id="avatar"
        src="${safeText(details.avatar_url)}"
        alt="Avatar"
        class="w-32 h-32 rounded-full border-4 border-blue-500 shadow-2xl"
      />
      <div class="flex-1 space-y-3">
        <h2 id="name" class="text-3xl font-bold text-white">${safeText(details.name)}</h2>
        <p id="bio" class="text-gray-300 italic">${safeText(details.bio)}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
          <p><span class="text-white font-semibold">Username:</span> ${safeText(details.login)}</p>
          <p><span class="text-white font-semibold">Company:</span> ${safeText(details.company)}</p>
          <p><span class="text-white font-semibold">Location:</span> ${safeText(details.location)}</p>
          <p><span class="text-white font-semibold">Website:</span> <a href="${details.blog}" target="_blank" class="text-blue-400 hover:underline">${safeText(details.blog)}</a></p>
          <p><span class="text-white font-semibold">Email:</span> ${safeText(details.email)}</p>
          <p><span class="text-white font-semibold">ID:</span> ${safeText(details.id)}</p>
          <p><span class="text-white font-semibold">Public Repos:</span> ${safeText(details.public_repos)}</p>
          <p><span class="text-white font-semibold">Followers:</span> ${safeText(details.followers)}</p>
          <p><span class="text-white font-semibold">Following:</span> ${safeText(details.following)}</p>
          <p><span class="text-white font-semibold">GitHub:</span> <a href="${safeText(details.html_url)}" target="_blank" class="text-blue-400 hover:underline">${safeText(details.html_url)}</a></p>
        </div>
      </div>
    </div>
  `;

  div.innerHTML = data;
}

// --- Search Button Handler ---
searchBtn.addEventListener("click", async () => {
  const username = usernameInp.value.trim();

  if (!username) {
    alert("⚠️ Please enter a GitHub username.");
    return;
  }

  div.innerHTML = `<p class="text-gray-300 text-lg">Loading...</p>`;

  try {
    const userDetails = await getUserData(username);
    dataRendering(userDetails);
  } catch (error) {
    div.innerHTML = `<p class="text-red-400 font-semibold">${error.message}</p>`;
  }
});
