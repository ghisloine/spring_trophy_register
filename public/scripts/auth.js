//Listen For Auth Status Changes

auth.onAuthStateChanged(user => {
    if(user){
        db.collection('users').doc(user.uid).collection('yatch').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        },err => {
            console.log(err.message);
        });//Bunlari buraya ekleyerek sadece Login olundugunda gorulmesini sagladik.
    }else{
        setupGuides([]);
        setupUI();
    }
});

//Races Menusu 

auth.onAuthStateChanged(user => {
    if(user){
        db.collection("races").orderBy("raceID", "asc").onSnapshot(snapshot => {
            setupRaces(snapshot.docs);
        },err => {
            console.log(err.message);
        });//Bunlari buraya ekleyerek sadece Login olundugunda gorulmesini sagladik.
    }else{
        setupRaces();
    }
});

//Create New Guide

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title : createForm['title'].value,
        content : createForm['content'].value
    }).then(() => {
        //Close modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})

// Yarisci Olusturma
const createRacer = document.querySelector('#createRacer');
auth.onAuthStateChanged(user => {
    if(user){
        createRacer.addEventListener('submit',(e) => {
            e.preventDefault();
        
            db.collection('users').doc(user.uid).collection('racer').add({
                racerName : createRacer['racerName'].value,
                racerLicenceNumber : createRacer['racerLicenceNumber'].value,
                racerClub : createRacer['racerClub'].value,
                racerMobile : createRacer['racerMobile'].value
            }).then(() => {
                console.log('Yarisci Eklendi');
            })
        })
    }else{
        console.log('Error')
    }
})


//Signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;


    //Sign Up User
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        return db.collection('users').doc(cred.user.uid).set({
            bio : signupForm['signup-bio'].value
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
});


//Logout

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();

})


//Login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        
        return auth.signInWithEmailAndPassword(email, password).then(cred => {

            //close Login Modal
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        })
    })

    

})