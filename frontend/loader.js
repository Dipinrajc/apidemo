console.log("Script Loaded");
"use strict";
!function () {
    console.log("Script Starts");
    var cssId = 'pCss';
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'src/istore/custom.css';
        link.media = 'all';
        head.appendChild(link);
    }

    window.Practz = function (id, name) {
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
        var data = {'name' : name, 'id' : id, 'apiKey' : 'aaaa'};
        url = 'http://localhost:8080/test/name';
        jsonpCall(url, data, callback);
    }

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
        if(success){
            toastDiv.classList.add("success");
        }else{
            toastDiv.classList.add("error");
        }
        document.body.appendChild(toastDiv);
        setTimeout(function(){ toastDiv.className = toastDiv.className.replace("show", ""); }, 3000);
    }

   var createModal =  function (data, success) {
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
        if(success){
            headerClass+= " success";
        }else{            
            headerClass+= " error";
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
