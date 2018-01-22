
    // document.getElementById("testPB").onclick = function (ev) {
    //     document.getElementById("testP").innerHTML = "Changed!"
    // }


    // Initialize Firebase
    var config = {
    apiKey: ":)",
    authDomain: "webapp2-73931.firebaseapp.com",
    databaseURL: "https://webapp2-73931.firebaseio.com",
    projectId: "webapp2-73931",
    storageBucket: "webapp2-73931.appspot.com",
    messagingSenderId: "781287183421"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();

    // Get elements
    var preObject = document.getElementById('object');

    // Create references, this is like the name of the particular dictionary in the DB
    var dbRefObject = firebase.database().ref().child("object");

    // Create reference to the ul
    var uList = document.getElementById('dataList');

    var dbRefList = dbRefObject.child('data');


    // Sync object changes, this will constantly write data of 'object' changes to the console
    //dbRefObject.on('value', snap => console.log(snap.val()));
    // The following is debugging stuff
    // dbRefObject.on('value', snap => {
    //     preObject.innerText = JSON.stringify(snap.val(), null, 3);
    // });

    //dbRefList.on('child_added', snap => console.log(snap.val()));
    dbRefList.on('child_added', snap => {
        var li = document.createElement('li');
        li.innerText = snap.val();
        li.id = snap.key;
        uList.appendChild(li)
    });

    dbRefList.on('child_changed', snap => {
        var liChanged = document.getElementById(snap.key);
        liChanged.innerText = snap.val();
    });

    dbRefList.on('child_removed', snap => {
        var liToRemove = document.getElementById(snap.key);
        liToRemove.remove();
    });

    function addStuff(val) {
      chatKeyRef = dbRefList.push(val);
    }

    document.getElementById('addToDB').onclick = function(e){
      var tempvar = document.getElementById('valueInput').value;
      addStuff(tempvar);
      document.getElementById('valueInput').value = '';
    };


    var someP = document.getElementById('someP');
    var somePRef = firebase.database().ref().child('somePdata');

    // This is probably a better way of getting data, instead of doing the snap stuff
    somePRef.on('value', function(somedata){
        someP.innerText = somedata.val();
    });

    // This is how to get some Childs
    dbRefList.on('value', snap => {
        var chat1item = snap.child('chat1').val();
        var helloitem = snap.child('hello').val();
        document.getElementById('someOtherP').innerText = chat1item + helloitem
    });


    // Generate children to search
    var dbRefNameList = dbRefObject.child('randos');
    
    var generateInput = document.getElementById('generateInput');

    document.getElementById('generateButton').onclick = function(e){
        dbRefNameList.push({
            name: generateInput.value,
            random: 'something random'
        });
        generateInput.value = ""
    };

    // Search for the children with name _

    var childNameButton = document.getElementById('searchForNameBTN');
    var childList = document.getElementById('nameList');

    childNameButton.onclick = function(e){
        // Clear the list for each set of names
        document.getElementById("nameList").innerHTML = "";
        dbRefNameList.on('value', function(snap){
            snap.forEach(function(nameSnap){
              var templi = document.createElement('li')
              var childNameInput = document.getElementById('searchForNameINPT').value;
                if(nameSnap.child('name').val() == childNameInput){
                  templi.innerText = "The base child " + nameSnap.key + " has a child, name: " + nameSnap.child('name').val();
                  templi.id = nameSnap.key;
                  childList.appendChild(templi)
                  // console.log(nameSnap.key, ":", nameSnap.child("name").val());
                  // document.write(nameSnap.key);
                }
            });
        });
    };

    // var usersRef = firebase.database().ref("users");
    // usersRef.on("child_added", function(snapshot) {
    // console.log(snapshot.child("phoneno").val());
    // });
