console.log("Script Loaded");
"use strict";
!function () {
    console.log("Script Starts");
    var data;
    var fbUserId = null;
    var cssId = 'pCss';
    var likedIds = null;
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'src/custom.css';
        link.media = 'all';
        head.appendChild(link);
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '2118293848392528',//'224712101506955',
            cookie: true,  // enable cookies to allow the server to access 
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.8
        });
        FB.Event.subscribe('auth.logout', function(response) {
            console.log("Logout")
            top.location.href = "http://example.com/loggedout/";
            });
        FB.AppEvents.logPageView();
    }

    if (!document.getElementById('facebook-jssdk')) {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    function fbCallBack() {
        window.fbAsyncInit();
    }


    window.Practz = function (id, name) {
        console.log("Constructor Called");
        data = { 'name': name, 'id': id, 'apiKey': 'aaaa' };
        if (fbUserId != null) {
            checkForLike(true);
        } else {

            loginCheck();
            // login();
        }
    }

    function checkForLike(create) {
        console.log("checking liked or not");
        var callback = function (response) {
            console.log(response);
            var name;
            if (response.success && response.data) {
                name = "UnLike";
            } else {
                name = "Like";
            }

            if (create) {
                createButton(name);
                createShareButton();
            } else {
                changeButtonName(name);
            }
        };/* 
        checkData = {};
        checkData.id = data.id;
        checkData.fbUserId = data.id; */
        url = 'http://localhost:8080/test/check';
        callApi(url, data, callback);
        //jsonpCall(url, data, callback);
    }

    /*  window.Practz = function (id, name) {
         console.log(id + name);        
         var callback = function (response) {
             console.log(response);
             if (response.success) {
                 //createModal(response.data, true);
                 var resposeData = "<p>You have selected : " + data.id + " name : " + data.name + "</p>";
                 launch_toast(resposeData, true);
             }else{
                 launch_toast(response.data, false);
                // createModal(response.data, false);
             }
         };
         createButton()
         data = {'name' : name, 'id' : id, 'apiKey' : 'aaaa'};
         //loginCheck();
         // var data = {'name' : name, 'id' : id, 'apiKey' : 'aaaa'};
         // url = 'http://localhost:8080/test/name';
         // jsonpCall(url, data, callback);
 
         callBackend();
     }
  */
    var jsonpCall = function (url, data, callback) {
        var id = Math.round(100000 * Math.random());
        var callbackName = 'jsonp_callback_' + id;
        window[callbackName] = function (data) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };
        var src = url + (url.indexOf("?") + 1 ? "&" : "?");
        var params = [];
        var param_name = "";
        data["callback"] = callbackName;
        for (param_name in data) {
            params.push(param_name + "=" + encodeURIComponent(data[param_name]));
        }
        src += params.join("&");
        var script = this.document.getElementById(id);
        if (null != script) {
            document.body.removeChild(script);
        }
        script = document.createElement('script');
        script.type = "text/javascript";
        script.id = id;
        script.async = true;
        script.src = src;
        document.body.appendChild(script);
    }

    var launch_toast = function (data, success) {
        var toastDiv = document.createElement("div");
        toastDiv.innerHTML = data;
        toastDiv.id = "snackbar";
        toastDiv.classList.add("show");
        if (success) {
            toastDiv.classList.add("success");
        } else {
            toastDiv.classList.add("error");
        }
        document.body.appendChild(toastDiv);
        setTimeout(function () { toastDiv.className = toastDiv.className.replace("show", ""); }, 3000);
    }

    function loginCheck() {
        console.log("In Login Check")
        FB.getLoginStatus((response) => {
            console.log("In getLoginStatus")
            statusChangeCallback(response);
        });
    }

    function statusChangeCallback(response) {
        console.log(response);
        if (response.status !== "connected") {
            console.log("Calling login");
            login();
        } else {
            fetchFriends();
            fbUserId = response.authResponse.userID;
            console.log("fbUserId is " + fbUserId);
            if (fbUserId != null) {
                data.fbUserId = fbUserId;
                checkForLike(true);
            }
            createLogoutButton();
            return true;
            //  callBackend();
        }
    }

    function changeButtonName(name) {
        document.getElementById("fbLikeButton").setAttribute("value", name);
    }

    function createButton(name) {
        console.log("Creating Button");
        var button = document.createElement("input");
        button.type = "button";
        button.value = name;
        button.name = name;
        button.onclick = function () {
            callBackend();
        };
        button.id = "fbLikeButton";
        button.className = "btn btn-success";
        var likeDiv = document.getElementById("likeDiv");
        if (likeDiv != null) {
            likeDiv.appendChild(button);
            console.log(likeDiv);
            console.log("Button Appended");
        } else {
            console.log("likeDiv not found");
        }
    }

    function callBackend() {

        //loginCheck();
        // var data = {'name' : name, 'id' : id, 'apiKey' : 'aaaa'};
        // url = 'http://localhost:8080/test/name';
        // jsonpCall(url, data, callback);
        //var data = {'name' : name, 'id' : id, 'apiKey' : 'aaaa'};
        var callback = function (response) {
            console.log(response);
            if (response.success) {
                //createModal(response.data, true);
                var status = "";
                if (response.data.like) {
                    status = "Liked";
                } else {
                    status = "UnLiked";
                }
                var resposeData = "<p>You have " + status + " " + data.name + "</p>"; //selected : " + data.id + "
                launch_toast(resposeData, true);
            } else {
                launch_toast(response.data, false);
                // createModal(response.data, false);
            }
            checkForLike(false);
        };

        url = 'http://localhost:8080/test/fblike';
        callApi(url, data, callback);
    }

    function callApi(api, data, callback) {
        console.log(data)
        if (fbUserId == null) {
            FB.api('/me', function (response) {
                console.log(response);
                fbUserId = response.id;
                console.log('Good to see you, ' + response.name + '.');

                data.fbUserId = fbUserId;
                // callApi(fbUserId);

                jsonpCall(api, data, callback);
            });
        } else {
            jsonpCall(api, data, callback);
        }
    }


    function createLogoutButton() {
        console.log("Creating Button");
        var button = document.createElement("input");
        button.type = "button";
        button.value = "Logout";
        button.name = "Logout";
        button.onclick = function () {
            logout();
        };
        button.id = "fbLogoutButton";
        button.className = "btn btn-nfo";
        var logoutDiv = document.getElementById("logoutDiv");
        if (logoutDiv != null) {
            logoutDiv.appendChild(button);
            console.log(logoutDiv);
            console.log("Button Appended");
        } else {
            console.log("logoutDiv not found");
        }
    }

    function removeLogoutButton() {
        var logoutDiv = document.getElementById("logoutDiv");
        if (logoutDiv != null) {
            var button = document.getElementById("fbLogoutButton");
            logoutDiv.removeChild(button);
            console.log("Button Removed");
        } else {
            console.log("logoutDiv not found");
        }
    }


    function logout() {
        deleteAllCookies(); 
        FB.logout(function (response) {
            //Do what ever you want here when logged out like reloading the page
            window.location.reload();
        });
      /*     FB.logout(function (response) {
              console.log(response);
              top.location.href = '#';
              fbUserId = null; 
              removeLogoutButton();
          });  */
    }

    function deleteAllCookies() {     
        FB._authResponse = null;
FB._userStatus = null;
document.cookie = 'fbsr_' + FB._apiKey + '=;';
        window.postMessage({ type: "CLEAR_COOKIES_EXTENSION_API" }, "*");   
        window.document.cookie = "c_user" + "=null;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.document.cookie = "c_usersss" + "=null;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        var cookies = document.cookie.split(";");
        console.log(cookies);
       /*  for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            console.log(document.cookie)
        } */
      //location.reload();
        removeLogoutButton();
    }

    function fetchFriends() {
        console.log('Fetching friends.... ');
        FB.api('/me/friends', function (response) {
            console.log(response);
            var friends = response.data;
            if (null != friends && friends.length > 0) {
                
        checkForLikes(friends);
                //createProfile(friends);
            }
        });
        /*   FB.api('/me/invitable_friends', function (response) {
              console.log(response);
          });
          FB.api('/me/taggable_friends', function (response) {
              console.log(response);
          }); */
    }

    

    function checkForLikes(friends){
        var callback = function (response) {
            console.log(response);
            if (response.success) {
                likedIds = response.data;
            } else {
                likedIds = [];
            }
            createProfile(friends, likedIds)
        };
        querydata = {'id' : data.id};
        url = 'http://localhost:8080/test/getlikes';
        jsonpCall(url,  querydata, callback);
    }

    var createProfile = function (friends, likedIds) {
        console.log(likedIds)
        if(null != likedIds && likedIds.length > 0){
            var profileContainer = document.createElement("div");
            profileContainer.id = "profileContainer";
            profileContainer.className = "";
            profileContainer.innerHTML = "Your Friends who Like this : ";
            for(var friend of friends){   
                if(likedIds.indexOf(friend.id) > -1){
                    console.log(friend.name+" likes this product");
                    var imgContainer = document.createElement("img");
                    imgContainer.id = "imgContainer";
                    imgContainer.className = "";
                    imgContainer.title = friend.name;
                    imgContainer.src = "https://graph.facebook.com/" + friend.id + "/picture?type=square";
                    profileContainer.appendChild(imgContainer);
                }     
            }             
            var likeDiv = document.getElementById("likeDiv");
            likeDiv.appendChild(profileContainer);
        }
    }

    function login() {
        console.log("In login");
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log(response);
                    fbUserId = response.id;
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
            statusChangeCallback(response);
        }, { scope: 'email,public_profile,user_friends' });
    }

    function createShareButton() {
        console.log("Creating Share Button");
        var button = document.createElement("input");
        button.type = "button";
        button.value = "Share";
        button.name = "Share";
        button.onclick = function () {
            share();
        };
        button.id = "fbShareButton";
        button.className = "btn btn-info my-2";
        var likeDiv = document.getElementById("likeDiv");
        if (likeDiv != null) {
            likeDiv.appendChild(button);
            console.log(likeDiv);
            console.log("Share Button Appended");
        } else {
            console.log("likeDiv not found");
        }
    }

    function share(){
        FB.ui({
            method: 'share',
            href: 'https://apitest.com:9001/#/product-detail'
          }, function(response){
              console.log(response);
          });
    }

    var createModal = function (data, success) {
        var pcontainer = document.createElement("div");
        pcontainer.id = "pcontainer";
        pcontainer.className = "";

        var modalFade = document.createElement("div");
        modalFade.id = "pModal";
        modalFade.className = "pmodal pmodal-md";

        var modalDialog = document.createElement("div");
        modalDialog.className = "pmodal-dialog";

        var modalContent = document.createElement("div");
        modalContent.className = "pmodal-content";

        var modalHeader = document.createElement("div");
        var headerClass = "pmodal-header";
        if (success) {
            headerClass += " success";
        } else {
            headerClass += " error";
        }
        modalHeader.className = headerClass;
        //  modalHeader.className = "pmodal-header";

        var modalTitle = document.createElement("h4");
        modalTitle.className = "pmodal-title";
        modalTitle.innerHTML = "Title";

        var modalBody = document.createElement("div");
        modalBody.className = "pmodal-body";
        modalBody.innerHTML = "<p>You have selected : " + data.id + " name : " + data.name + "</p>";

        var modalFooterClose = document.createElement("button");
        modalFooterClose.className = "btn btn-cls close-btn";
        modalFooterClose.id = "practz-close";
        modalFooterClose.innerHTML = "Close";

        var modalFooter = document.createElement("div");
        modalFooter.className = "pmodal-footer";
        modalFooter.appendChild(modalFooterClose);

        modalHeader.appendChild(modalTitle);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modalFade.appendChild(modalDialog);
        pcontainer.appendChild(modalFade);

        showModal(pcontainer);
    }

    var showModal = function (modal) {
        clearElements();
        var modalBackDrop = document.createElement("div");
        modalBackDrop.id = "modalBackDrop";
        modalBackDrop.className = "pmodal-backdrop in";
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(modal);
        body.appendChild(modalBackDrop);
        var span = document.getElementById("practz-close");
        // When the user clicks on close, close the modal
        span.onclick = function () {
            clearElements();
        };
    }

    var clearElements = function () {
        var containerNode = document.getElementsByTagName('body')[0];
        if (containerNode != null) {
            var pModal = document.getElementById("pcontainer");
            if (pModal != null) {
                containerNode.removeChild(pModal);
                var modalBackDrop = document.getElementById("modalBackDrop");
                containerNode.removeChild(modalBackDrop);
            }
        }
        return;
    }
}();
