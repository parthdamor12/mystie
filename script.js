let posts = JSON.parse(localStorage.getItem('posts')) || [];

function addPost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const image = document.getElementById('image').value;
    const video = document.getElementById('video').value;  // New field for video
    const description = document.getElementById('description').value;
    const tags = document.getElementById('tags').value;
    const metaTitle = document.getElementById('meta-title').value;
    const metaDescription = document.getElementById('meta-description').value;

    // Save the post data (for demonstration purposes, this will just be stored in localStorage)
    const post = {
        title,
        subtitle,
        image,
        video,  // Save the video URL
        description,
        tags,
        metaTitle,
        metaDescription,
    };

    // this new start 
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();

    // Display success message
    document.getElementById('success-message').style.display = 'block';

    // Clear the form
    document.getElementById('post-form').reset();
    // this is new end
    // Add the post to the post list (or save it to your backend)
    const postList = document.getElementById('post-list');
    const postBox = document.createElement('div');
    postBox.className = 'post-box';

    const postImage = document.createElement('img');
    postImage.src = image;
    postBox.appendChild(postImage);

    if (video) {  // If there's a video, display it
        const postVideo = document.createElement('video');
        postVideo.src = video;
        postVideo.controls = true;  // Enable video controls
        postBox.appendChild(postVideo);
    }

    const postTitle = document.createElement('h3');
    postTitle.textContent = title;
    postBox.appendChild(postTitle);

    const postSubtitle = document.createElement('p');
    postSubtitle.textContent = subtitle;
    postBox.appendChild(postSubtitle);

    const postDescription = document.createElement('p');
    postDescription.textContent = description;
    postBox.appendChild(postDescription);

    postList.appendChild(postBox);

    // Display success message
    document.getElementById('success-message').style.display = 'block';

    // Clear the form
    document.getElementById('post-form').reset();
}

function displayPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    posts.forEach((post, index) => {
        const postBox = document.createElement('div');
        postBox.className = 'post-box';

        postBox.innerHTML = `
            <div class="post-number">#${index + 1}</div>
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${post.subtitle}</p>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;

        postList.appendChild(postBox);
    });
}

function editPost(index) {
    const post = posts[index];
    document.getElementById('title').value = post.title;
    document.getElementById('subtitle').value = post.subtitle;
    document.getElementById('image').value = post.image;
    document.getElementById('video').value = post.video; // Load the video URL in the form
    document.getElementById('description').value = post.description;
    document.getElementById('tags').value = post.tags;
    document.getElementById('meta-title').value = post.metaTitle;
    document.getElementById('meta-description').value = post.metaDescription;

    // Remove the post from the list so it can be updated
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}

function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}

// Function to display posts on index.html
function displayPostsOnIndex() {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postBox = document.createElement('div');
        postBox.className = 'post-box';

        postBox.innerHTML = `
            <div class="post-number">#${index + 1}</div>
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${post.subtitle}</p>
            <p>${post.description.substring(0, 100)}...</p>
            <a href="post.html?index=${index}">Read more</a>
        `;

        postContainer.appendChild(postBox);
    });
}

// Function to display the full details on post.html
function displayPostDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const postIndex = urlParams.get('index');
    const post = posts[postIndex];

    if (post) {
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-image').src = post.image;
        document.getElementById('post-description').textContent = post.description;
        document.getElementById('post-tags').textContent = `Tags: ${post.tags}`;
        document.getElementById('post-meta-description').content = post.metaDescription;
   
   
        if (post.video) { // If there's a video, display it
            const postVideo = document.getElementById('post-video');
            postVideo.src = post.video;
            postVideo.style.display = 'block';
        }    
    }
}

function goBack() {
    window.history.back();
}

// Check if we are on the index.html page, and if so, call the display function
if (document.getElementById('post-container')) {
    displayPostsOnIndex();
}

// Check if we are on the post.html page, and if so, call the display function
if (window.location.pathname.includes('post.html')) {
    displayPostDetails();
}

// Always display posts in the admin panel
displayPosts();
