const menuItem = document.querySelectorAll(".menu-items");

const messagesNotification = document.querySelector("#messages-notification");
const messages = document.querySelector(".messages");
const message = document.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");

const theme = document.querySelector("#theme");
const themeModal = document.querySelector(".customize-theme");

const fontSize = document.querySelectorAll(".choose-size span");
var root = document.querySelector(":root");
const colorPallete = document.querySelectorAll(".choose-color span");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

const changeActiveItem = () => {
  menuItem.forEach((item) => {
    item.classList.remove("active");
  });
};

// ================== CREATE POST FEATURE WITH LOCALSTORAGE ==================
const postForm = document.querySelector(".create-post");
const postInput = document.querySelector("#create-post");
const feedContainer = document.querySelector(".feeds");

// Load saved posts from localStorage on startup
document.addEventListener("DOMContentLoaded", () => {
  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.forEach((post) => renderPost(post.text, post.time, false));
});

// Handle new post submission
postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const postText = postInput.value.trim();
  if (postText === "") return;

  const time = new Date().toLocaleString();
  renderPost(postText, time, true);

  // Reset input
  postInput.value = "";
});

// Function to render a post on the page
function renderPost(text, time, saveToStorage = true) {
  const newPost = document.createElement("div");
  newPost.classList.add("feed");

  newPost.innerHTML = `
    <div class="head">
      <div class="user">
        <div class="profile-picture">
          <img src="images/profile-1.jpg" alt="Profile">
        </div>
        <div class="info">
          <h3>Juliet Chi</h3>
          <small>${time}</small>
        </div>
      </div>
      <span class="edit"><i class="uil uil-trash"></i></span>
    </div>

    <div class="caption">
      <p>${text}</p>
    </div>

    <div class="action-buttons">
      <div class="interaction-button">
        <span><i class="uil uil-heart"></i></span>
        <span><i class="uil uil-comment-dots"></i></span>
        <span><i class="uil uil-share-alt"></i></span>
      </div>
      <div class="bookmark">
        <span><i class="uil uil-bookmark-full"></i></span>
      </div>
    </div>

    <div class="text-muted">Be the first to comment</div>
  `;

  // Insert new post at the top
  feedContainer.prepend(newPost);

  // Add functionality to the new icons
  const likeButton = newPost.querySelector(".uil-heart");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("liked");
  });

  const commentButton = newPost.querySelector(".uil-comment-dots");
  commentButton.addEventListener("click", () => {
    alert("Comment feature coming soon!");
  });

  // Delete post functionality
  const deleteBtn = newPost.querySelector(".uil-trash");
  deleteBtn.addEventListener("click", () => {
    newPost.remove();
    deletePostFromStorage(text);
  });

  // Save to localStorage if it's a new post
  if (saveToStorage) savePostToStorage(text, time);
}

// Save post to localStorage
function savePostToStorage(text, time) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.unshift({ text, time });
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Delete post from localStorage
function deletePostFromStorage(text) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter((post) => post.text !== text);
  localStorage.setItem("posts", JSON.stringify(posts));
}

// --- Like button toggle ---
const likeButtons = document.querySelectorAll(".uil-heart");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("liked");
  });
});

// --- Comment button (demo only) ---
const commentButtons = document.querySelectorAll(".uil-comment-dots");

commentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    alert("Comment feature coming soon!");
  });
});

menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveItem();
    item.classList.add("active");
    if (item.id != "notifications") {
      document.querySelector(".notification-popup").style.display = "none";
    } else {
      document.querySelector(".notification-popup").style.display = "block";
      document.querySelector(".notification-count").style.display = "none";
    }
  });
});

const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  message.forEach((chat) => {
    let name = chat.querySelector("h5").textContent.toLowerCase();
    if (name.indexOf(val) != -1) {
      chat.style.display = "flex";
    } else {
      chat.style.display = "none";
    }
  });
};

messageSearch.addEventListener("keyup", searchMessage);

messagesNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  messagesNotification.querySelector(".notification-count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 2000);
});

// ------------theme-customization---------------

const openThemeModal = () => {
  themeModal.style.display = "grid";
};

const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
    themeModal.style.display = "none";
  }
};
theme.addEventListener("click", openThemeModal);

themeModal.addEventListener("click", closeThemeModal);

// =============FONTS==========================
const removeSizeSelector = () => {
  fontSize.forEach((size) => {
    size.classList.remove("active");
  });
};

fontSize.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle("active");

    if (size.classList.contains("font-size-1")) {
      fontSize = "10px";
      root.style.setProperty("--sticky-top-left", "5.4rem");
      root.style.setProperty("--sticky-top-right", "5.4rem");
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "13px";
      root.style.setProperty("--sticky-top-left", "5.4rem");
      root.style.setProperty("--sticky-top-right", "-7rem");
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
      root.style.setProperty("--sticky-top-left", "-2rem");
      root.style.setProperty("--sticky-top-right", "-17rem");
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "19px";
      root.style.setProperty("--sticky-top-left", "-5rem");
      root.style.setProperty("--sticky-top-right", "-25rem");
    } else if (size.classList.contains("font-size-5")) {
      fontSize = "22px";
      root.style.setProperty("--sticky-top-left", "-12rem");
      root.style.setProperty("--sticky-top-right", "-35rem");
    }

    document.querySelector("html").style.fontSize = fontSize;
  });
});

// -------------------------primary color------------------
const changeActiveColorClass = () => {
  colorPallete.forEach((colorPicker) => {
    colorPicker.classList.remove("active");
  });
};

colorPallete.forEach((color) => {
  color.addEventListener("click", () => {
    let primary;
    changeActiveColorClass();

    if (color.classList.contains("color-1")) {
      primary = 252;
    } else if (color.classList.contains("color-2")) {
      primary = 52;
    } else if (color.classList.contains("color-3")) {
      primary = 352;
    } else if (color.classList.contains("color-4")) {
      primary = 152;
    } else if (color.classList.contains("color-5")) {
      primary = 202;
    }

    color.classList.add("active");

    root.style.setProperty("--primary-color-hue", primary);
  });
});

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorLightness);
  root.style.setProperty("--white-color-lightness", whiteColorLightness);
  root.style.setProperty("--dark-color-lightness", darkColorLightness);
};

Bg1.addEventListener("click", () => {
  Bg1.classList.add("active");

  Bg1.classList.remove("active");
  Bg3.classList.remove("active");

  window.location.reload();
});

Bg2.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "20%";
  lightColorLightness = "15%";

  Bg2.classList.add("active");

  Bg1.classList.remove("active");
  Bg3.classList.remove("active");

  changeBG();
});

Bg3.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "10%";
  lightColorLightness = "0%";

  Bg3.classList.add("active");

  Bg1.classList.remove("active");
  Bg2.classList.remove("active");

  changeBG();
});

// const menuItem = document.querySelectorAll(".menu-items");
// const messagesNotification = document.querySelector("#messages-notification");
// const messages = document.querySelector(".messages");
// const message = document.querySelectorAll(".message");
// const messageSearch = document.querySelector("#message-search");
// const theme = document.querySelector("#theme");
// const themeModal = document.querySelector(".customize-theme");
// const fontSize = document.querySelectorAll(".choose-size span");
// var root = document.querySelector(":root");
// const colorPallete = document.querySelectorAll(".choose-color span");
// const Bg1 = document.querySelector(".bg-1");
// const Bg2 = document.querySelector(".bg-2");
// const Bg3 = document.querySelector(".bg-3");
// const createPostForm = document.querySelector(".create-post");
// const searchBar = document.querySelector(".search-bar input");
// const feedsContainer = document.querySelector(".feeds");
// const rightContainer = document.querySelector(".right");

// // Mock user database
// const users = [
//   { name: "Juliet Chi", username: "@chi", profilePic: "images/profile-1.jpg" },
//   { name: "Chibuzo Leo", username: "@leo", profilePic: "images/profile-2.jpg" },
//   {
//     name: "Chimdalu Melvin",
//     username: "@melvin",
//     profilePic: "images/profile-3.jpg",
//   },
//   {
//     name: "Chinonye Juliet",
//     username: "@juliet",
//     profilePic: "images/profile-4.jpg",
//   },
//   {
//     name: "Hajia Bintu",
//     username: "@bintu",
//     profilePic: "images/profile-13.jpg",
//   },
//   {
//     name: "Mira Myles",
//     username: "@mira",
//     profilePic: "images/profile-19.jpg",
//   },
//   {
//     name: "Sarah Banks",
//     username: "@sarah",
//     profilePic: "images/profile-12.jpg",
//   },
// ];

// // Mock posts storage
// let posts = [
//   {
//     id: 1,
//     user: { name: "Lana Rose", profilePic: "images/profile-13.jpg" },
//     time: "15 MINUTES AGO",
//     location: "Dubai",
//     image: "images/feed-1.jpg",
//     caption:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. #lifestyle",
//     likes: 238,
//     likedBy: [
//       "images/profile-10.jpg",
//       "images/profile-4.jpg",
//       "images/profile-15.jpg",
//     ],
//     comments: [],
//   },
// ];

// // Create new post
// createPostForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const postContent = document.querySelector("#create-post").value;
//   if (postContent.trim()) {
//     const newPost = {
//       id: posts.length + 1,
//       user: { name: "Juliet Chi", profilePic: "images/profile-1.jpg" },
//       time: "JUST NOW",
//       location: "Nigeria",
//       image: null,
//       caption: postContent,
//       likes: 0,
//       likedBy: [],
//       comments: [],
//     };
//     posts.unshift(newPost);
//     renderPosts();
//     createPostForm.reset();
//   }
// });

// // Render posts
// function renderPosts() {
//   feedsContainer.innerHTML = "";
//   posts.forEach((post) => {
//     const postElement = document.createElement("div");
//     postElement.classList.add("feed");
//     postElement.innerHTML = `
//             <div class="head">
//                 <div class="user">
//                     <div class="profile-picture">
//                         <img src="${post.profilePic || post.user.profilePic}" />
//                     </div>
//                     <div class="info">
//                         <h3>${post.user.name}</h3>
//                         <small>${post.location}, ${post.time}</small>
//                     </div>
//                 </div>
//                 <span class="edit"><i class="uil uil-ellipsis-h"></i></span>
//             </div>
//             ${
//               post.image
//                 ? `<div class="photo"><img src="${post.image}" /></div>`
//                 : ""
//             }
//             <div class="action-buttons">
//                 <div class="interaction-button">
//                     <span class="like-btn" data-post-id="${post.id}">
//                         <i class="uil uil-heart ${
//                           post.likedBy.includes("images/profile-1.jpg")
//                             ? "liked"
//                             : ""
//                         }"></i>
//                     </span>
//                     <span class="comment-btn" data-post-id="${post.id}">
//                         <i class="uil uil-comment-dots"></i>
//                     </span>
//                     <span><i class="uil uil-share-alt"></i></span>
//                 </div>
//                 <div class="bookmark">
//                     <span><i class="uil uil-bookmark-full"></i></span>
//                 </div>
//             </div>
//             <div class="liked-by">
//                 ${post.likedBy
//                   .map((img) => `<span><img src="${img}" alt=""></span>`)
//                   .join("")}
//                 <p>liked by <b>${
//                   post.likedBy.length > 0 ? "You" : "Nobody"
//                 }</b> and <b>${post.likes} others</b></p>
//             </div>
//             <div class="caption">
//                 <p><b>${post.user.name}</b> ${
//       post.caption
//     } <span class="harsh-tag">${post.caption.match(/#[^\s]*/g) || ""}</span></p>
//             </div>
//             <div class="comments">
//                 ${post.comments
//                   .map(
//                     (comment) => `
//                     <div class="comment">
//                         <b>${comment.user}</b> ${comment.text}
//                         <small class="text-muted">${comment.time}</small>
//                     </div>
//                 `
//                   )
//                   .join("")}
//                 <div class="comment-form" data-post-id="${post.id}">
//                     <input type="text" placeholder="Add a comment..." class="comment-input">
//                     <button class="btn btn-primary">Post</button>
//                 </div>
//             </div>
//             <div class="text-muted view-comments" data-post-id="${
//               post.id
//             }">view all ${post.comments.length} comments</div>
//         `;
//     feedsContainer.appendChild(postElement);
//   });

//   // Add event listeners for like and comment buttons
//   document.querySelectorAll(".like-btn").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const postId = parseInt(btn.dataset.postId);
//       toggleLike(postId);
//     });
//   });

//   document.querySelectorAll(".comment-form").forEach((form) => {
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const postId = parseInt(form.dataset.postId);
//       const input = form.querySelector(".comment-input");
//       if (input.value.trim()) {
//         addComment(postId, input.value);
//         input.value = "";
//       }
//     });
//   });
// }

// // Toggle like
// function toggleLike(postId) {
//   const post = posts.find((p) => p.id === postId);
//   const userProfile = "images/profile-1.jpg";
//   const index = post.likedBy.indexOf(userProfile);
//   if (index === -1) {
//     post.likedBy.push(userProfile);
//     post.likes++;
//   } else {
//     post.likedBy.splice(index, 1);
//     post.likes--;
//   }
//   renderPosts();
// }

// // Add comment
// function addComment(postId, text) {
//   const post = posts.find((p) => p.id === postId);
//   post.comments.push({
//     user: "Juliet Chi",
//     text: text,
//     time: "JUST NOW",
//   });
//   renderPosts();
// }

// // Search users
// function searchUsers(query) {
//   const resultsContainer = document.createElement("div");
//   resultsContainer.classList.add("search-results");
//   resultsContainer.style.cssText = `
//         position: absolute;
//         top: 100%;
//         left: 0;
//         width: 100%;
//         background: var(--color-white);
//         border-radius: var(--card-border-radius);
//         box-shadow: 0 0 1rem var(--color-primary);
//         z-index: 10;
//         max-height: 300px;
//         overflow-y: auto;
//     `;

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(query.toLowerCase()) ||
//       user.username.toLowerCase().includes(query.toLowerCase())
//   );

//   resultsContainer.innerHTML =
//     filteredUsers.length > 0
//       ? filteredUsers
//           .map(
//             (user) => `
//             <div class="user-result" style="padding: var(--card-padding); display: flex; align-items: center; gap: 1rem; cursor: pointer;">
//                 <div class="profile-picture">
//                     <img src="${user.profilePic}" />
//                 </div>
//                 <div>
//                     <h5>${user.name}</h5>
//                     <p class="text-muted">${user.username}</p>
//                 </div>
//             </div>
//         `
//           )
//           .join("")
//       : `<div style="padding: var(--card-padding); color: var(--color-grey);">No users found</div>`;

//   const existingResults = document.querySelector(".search-results");
//   if (existingResults) existingResults.remove();
//   searchBar.parentElement.appendChild(resultsContainer);
// }

// // Search bar event listener
// searchBar.addEventListener("input", (e) => {
//   const query = e.target.value.trim();
//   if (query) {
//     searchUsers(query);
//   } else {
//     const existingResults = document.querySelector(".search-results");
//     if (existingResults) existingResults.remove();
//   }
// });

// // Click outside to close search results
// document.addEventListener("click", (e) => {
//   if (!searchBar.contains(e.target) && !e.target.closest(".search-results")) {
//     const existingResults = document.querySelector(".search-results");
//     if (existingResults) existingResults.remove();
//   }
// });

// // Existing theme customization code
// const changeActiveItem = () => {
//   menuItem.forEach((item) => {
//     item.classList.remove("active");
//   });
// };

// menuItem.forEach((item) => {
//   item.addEventListener("click", () => {
//     changeActiveItem();
//     item.classList.add("active");
//     if (item.id != "notifications") {
//       document.querySelector(".notification-popup").style.display = "none";
//     } else {
//       document.querySelector(".notification-popup").style.display = "block";
//       document.querySelector(".notification-count").style.display = "none";
//     }
//   });
// });

// const searchMessage = () => {
//   const val = messageSearch.value.toLowerCase();
//   message.forEach((chat) => {
//     let name = chat.querySelector("h5").textContent.toLowerCase();
//     if (name.indexOf(val) != -1) {
//       chat.style.display = "flex";
//     } else {
//       chat.style.display = "none";
//     }
//   });
// };

// messageSearch.addEventListener("keyup", searchMessage);

// messagesNotification.addEventListener("click", () => {
//   messages.style.boxShadow = "0 0 1rem var(--color-primary)";
//   messagesNotification.querySelector(".notification-count").style.display =
//     "none";
//   setTimeout(() => {
//     messages.style.boxShadow = "none";
//   }, 2000);
// });

// const openThemeModal = () => {
//   themeModal.style.display = "grid";
// };

// const closeThemeModal = (e) => {
//   if (e.target.classList.contains("customize-theme")) {
//     themeModal.style.display = "none";
//   }
// };

// theme.addEventListener("click", openThemeModal);
// themeModal.addEventListener("click", closeThemeModal);

// const removeSizeSelector = () => {
//   fontSize.forEach((size) => {
//     size.classList.remove("active");
//   });
// };

// fontSize.forEach((size) => {
//   size.addEventListener("click", () => {
//     removeSizeSelector();
//     let fontSize;
//     size.classList.toggle("active");

//     if (size.classList.contains("font-size-1")) {
//       fontSize = "10px";
//       root.style.setProperty("--sticky-top-left", "5.4rem");
//       root.style.setProperty("--sticky-top-right", "5.4rem");
//     } else if (size.classList.contains("font-size-2")) {
//       fontSize = "13px";
//       root.style.setProperty("--sticky-top-left", "5.4rem");
//       root.style.setProperty("--sticky-top-right", "-7rem");
//     } else if (size.classList.contains("font-size-3")) {
//       fontSize = "16px";
//       root.style.setProperty("--sticky-top-left", "-2rem");
//       root.style.setProperty("--sticky-top-right", "-17rem");
//     } else if (size.classList.contains("font-size-4")) {
//       fontSize = "19px";
//       root.style.setProperty("--sticky-top-left", "-5rem");
//       root.style.setProperty("--sticky-top-right", "-25rem");
//     } else if (size.classList.contains("font-size-5")) {
//       fontSize = "22px";
//       root.style.setProperty("--sticky-top-left", "-12rem");
//       root.style.setProperty("--sticky-top-right", "-35rem");
//     }

//     document.querySelector("html").style.fontSize = fontSize;
//   });
// });

// const changeActiveColorClass = () => {
//   colorPallete.forEach((colorPicker) => {
//     colorPicker.classList.remove("active");
//   });
// };

// colorPallete.forEach((color) => {
//   color.addEventListener("click", () => {
//     let primary;
//     changeActiveColorClass();

//     if (color.classList.contains("color-1")) {
//       primary = 252;
//     } else if (color.classList.contains("color-2")) {
//       primary = 52;
//     } else if (color.classList.contains("color-3")) {
//       primary = 352;
//     } else if (color.classList.contains("color-4")) {
//       primary = 152;
//     } else if (color.classList.contains("color-5")) {
//       primary = 202;
//     }

//     color.classList.add("active");
//     root.style.setProperty("--primary-color-hue", primary);
//   });
// });

// let lightColorLightness;
// let whiteColorLightness;
// let darkColorLightness;

// const changeBG = () => {
//   root.style.setProperty("--light-color-lightness", lightColorLightness);
//   root.style.setProperty("--white-color-lightness", whiteColorLightness);
//   root.style.setProperty("--dark-color-lightness", darkColorLightness);
// };

// Bg1.addEventListener("click", () => {
//   Bg1.classList.add("active");
//   Bg2.classList.remove("active");
//   Bg3.classList.remove("active");
//   window.location.reload();
// });

// Bg2.addEventListener("click", () => {
//   darkColorLightness = "95%";
//   whiteColorLightness = "20%";
//   lightColorLightness = "15%";
//   Bg2.classList.add("active");
//   Bg1.classList.remove("active");
//   Bg3.classList.remove("active");
//   changeBG();
// });

// Bg3.addEventListener("click", () => {
//   darkColorLightness = "95%";
//   whiteColorLightness = "10%";
//   lightColorLightness = "0%";
//   Bg3.classList.add("active");
//   Bg1.classList.remove("active");
//   Bg2.classList.remove("active");
//   changeBG();
// });

// // Initial render
// renderPosts();
