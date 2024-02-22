import { signInWithGoogle, checkuser, signOutUser, getPfp, uploadImgAndGetURL, setData, getCurrentUser } from "./firebase.js";



// handle Form Submit
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // if(checkuser()){
    //     handleFormSubmit();
    // }

    // TODO: construct this object & send it to firebase
    // const values = {
    //     index: {
    //         general: {
    //             class: classVal,
    //             div: div_val,
    //             name: name,
    //             aboutPic: photo,
    //             roll: rollNo,
    //             wikiURL: url
    //         }
    //     }
    // }
    // console.log(values);
});

//  login button
const signInButton = document.getElementById("google-signin-button");
signInButton.addEventListener("click", signInWithGoogle);

// logout button
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", signOutUser);

// profile image
const profileImage = document.getElementById("pfp");

// next button 
const nextButton = document.getElementById("next_button");
nextButton.addEventListener("click", () => {
    const userExists = checkuser();

    if (userExists) {
        stopHighlightLogin();
        handleFormSubmit();
    } else {
        showSigninPrompt();
        startHighlightLogin(); 
    }
})


// highight login button
function startHighlightLogin() {
    signInButton.classList.add("highlight-animation");
    document.body.scrollIntoView({behavior: "smooth", block: "start"});
}
function stopHighlightLogin() {
    signInButton.classList.remove("highlight-animation"); // creates no error if the class isn't present
}




// handle form submit function
async function handleFormSubmit() {
    const url = document.getElementById('url').value;
    const name = document.getElementById('name').value;
    const rollNo = document.getElementById('rollNo').value;
    const classVal = document.getElementById('class').value;
    const div_val = document.getElementById('div').value;
    const aboutPhoto = document.getElementById('photo').files[0];
    
    if(!url || !name || !rollNo || !classVal || !div_val || !aboutPhoto) {
        return null; // stop the function, ui response is already sent in index.html
    }
    
    showLoader();

    const isValidURL = await checkUrlStatusCode(url); // false if url is invalid
    // console.log(isValidURL); // false
    
    if (!isValidURL) { // false
        showIncorrectUrlPrompt();
        changeLoader(isValidURL);
        return; // break the function!
        // TODO: show a toast saying that the url must be correct!
    }

    const aboutPhotoURL = await uploadImgAndGetURL(aboutPhoto.name, aboutPhoto);

    if (!aboutPhotoURL) {
        return null; // break the function!
    }

    const values = {
        index: {
            general: {
                class: classVal,
                div: div_val,
                name: name,
                aboutPic: aboutPhotoURL,
                roll: rollNo,
                wikiURL: url
            }
        }
    }
    const isDataSetted = await setData(values);
    changeLoader(isDataSetted);
    console.log(isDataSetted);
    //  TODO: toast the message: "You can now edit your website!"
    showSuccessToast();
    setTimeout(() => {
        window.location.href = "/home";
    }, 2000);

    // return isDataSetted;
}






export function createUserUIDCookie(value) {
    var d = new Date();
    d.setTime(d.getTime() + (15 * 24 * 60 * 60 * 1000)); // 15 days from now
    var expires = "expires=" + d.toUTCString();
    document.cookie = "userUID=" + value + "; " + expires;
  }
  

// function to switch login / logout buttons
export function switchButtons() {
    const userExists = checkuser();
    let googleImage = getPfp();
    googleImage = googleImage ? googleImage : "https://placehold.co/24x24";
    if (userExists) {
        signInButton.style.display = "none"; // hide signin button
        logoutButton.style.display = "flex"; // show logout button
        profileImage.src = googleImage;
    } else {
        signInButton.style.display = "block"; // show signin button
        logoutButton.style.display = "none"; // hide logout button
    }
}


// check if url exists
async function checkUrlStatusCode(url) {
    // Check if the URL is a valid Wikipedia URL
    if (!(url.startsWith('https://en.wikipedia.org/wiki/') || url.startsWith('http://en.wikipedia.org/wiki/'))) {
        console.log('Invalid Wikipedia URL');
        return false; // url isn't a wikipedia url
    }
    else { 
        return true; // this is to stop the CORS blocking, should & must be removed to enable the status checker 
    }
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const fullUrl = proxyUrl + url;
    try {
        const response = await fetch(fullUrl);
        return (response.status === 200);
    } catch (error) {
        console.error('Error fetching URL:', error);
        return false;
    }
}



// Function to show the toast
function showSigninPrompt() {
    const toast = document.getElementById('signinPromptToast');
    // console.log(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

function showIncorrectUrlPrompt() {
    const toast = document.getElementById('incorrectUrlToast');
    // console.log(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

function showSuccessToast() {
    const toast = document.getElementById('successToast');
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}


export function showLogoutToast() {
    const toast = document.getElementById('logoutToast');
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

export function showLoginToast(name) {
    const toast = document.getElementById('loginToast');
    const toastMessage = document.getElementById('login_toast_message');
    toastMessage.innerHTML = `Hi there! ${name}`;
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}



// Fucntion to show/hide loader/success/failure
function showLoader() {
    const loader = document.getElementById("loader");
    const hintText = document.getElementById("hintText");
    nextButton.classList.add("visually-hidden")
    loader.classList.remove("visually-hidden");
    hintText.classList.remove("visually-hidden")
}

function changeLoader(isSuccess) {
    const loader = document.getElementById("loader");
    loader.classList.add("visually-hidden");

    const success_check = document.getElementById("success_check");
    const failure_check = document.getElementById("failure_check");

    if (isSuccess) {
        success_check.classList.remove("visually-hidden");
    }
    else if(!isSuccess) {
        failure_check.classList.remove("visually-hidden");
    }
}




// show image preview
document.getElementById('photo').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            document.getElementById('previewImage').src = reader.result;
            document.getElementById('photoPreview').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});









// //  <------------- FOR TESTING ------------->
// const butt = document.getElementById("butt");
// butt.addEventListener("click", checkuser);

