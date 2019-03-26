const createSail = document.querySelector('#create-sail');
const fileOne = document.querySelector('#fileOne');
const fileTwo = document.querySelector('#fileTwo');
const ircLoader = document.querySelector('#ircLoader');
const adverLoader = document.querySelector('#adverLoader');
const uploadFiles = document.querySelector('#uploadFiles');
var uploadedFileOne;
var uploadedFileTwo;

//File Upload
fileOne.addEventListener('change',(e) => {
    uploadedFileOne = e.target.files[0];
    console.log(uploadedFileOne);
})

fileTwo.addEventListener('change',(e) => {
    uploadedFileTwo = e.target.files[0];
    console.log(uploadedFileTwo);

})



auth.onAuthStateChanged(user => {
    if(user){
        createSail.addEventListener('submit', (e) =>{
            e.preventDefault();
            db.collection('users').doc(user.uid).collection('yatch').add({
                firstName : createSail['first-name'].value,
                yatchName : createSail['yatch-name'].value,
                portAndCountry : createSail['port-and-country'].value,
                sailNumber : createSail['sail-number'].value,
                ircRating : createSail['irc-rating'].value,
                irc1 : createSail['irc-1'].value,
                irc2 : createSail['irc-2'].value,
                irc3 : createSail['irc-3'].value,
                irc4 : createSail['irc-4'].value,
                irc5 : createSail['irc-5'].value,
                nonIrcRating : createSail['non-irc-rating'].value,
                yearOfConstruction : createSail['year-of-construction'].value,
                overallLength : createSail['overall-length'].value,
                spinnaker : createSail['spinnaker'].value,
                foldingPropeller : createSail['folding-propeller'].value,
                dateOfIssue : createSail['date-of-issue'].value,
                hullColor : createSail['hull-color'].value,
                rigType : createSail['rig-type'].value,
                hullMaterial : createSail['hull-material'].value,
                marinaPonton : createSail['marina-ponton'].value,
                advertisement : createSail['advertisement'].value,
                yatchOwnerName : createSail['yatchOwnerName'].value,
                address : createSail['address'].value,
                telephone : createSail['telephone'].value,
                mobile : createSail['mobile'].value,
                mail : createSail['mail'].value
            }).then(() => {
                
            });
            var Counter = 0;    
            var storageRefOne = firebase.storage().ref(createSail['yatch-name'].value + '/' + uploadedFileOne.name);
            var task = storageRefOne.put(uploadedFileOne);
            var a = task.on('state_changed',
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                ircLoader.style.width = percentage + "%";
            },
            function error(err){
                alert(err.message);
            },
            function complete(){
                console.log('File One Completed!');
                Counter += 1;
            }
            );
            var storageRefTwo = firebase.storage().ref(createSail['yatch-name'].value + '/' + uploadedFileTwo.name);
            var task2 = storageRefTwo.put(uploadedFileTwo);
            task2.on('state_changed',
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                adverLoader.style.width = percentage + "%";
            },
            function error(err){
                alert(err.message);
            },
            function complete(){
                console.log('File Two Completed');
                Counter += 1;
                a();
                console.log('Ana Sayfaya Yonlendiriliyorsunuz !')
                window.location.href = "/";
            }
            );
            
        });
    }else{
        setupGuides([]);
        setupUI();
    }
});