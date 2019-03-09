const createSail = document.querySelector('#create-sail');
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
            }).then(() => {
                console.log('Form Created')
            })
        })
    }else{
        setupGuides([]);
        setupUI();
    }
});