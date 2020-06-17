/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    //當Cordova 載入完成後該事件被觸發
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        console.log(navigator.notification);
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);


        document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage);
        document.getElementById("showLocalStorage").addEventListener("click", showLocalStorage);
        document.getElementById("removeProjectFromLocalStorage").addEventListener
            ("click", removeProjectFromLocalStorage);
        document.getElementById("getLocalStorageByKey").addEventListener
            ("click", getLocalStorageByKey);

        var localStorage = window.localStorage;
        // 將資料新增到本地儲存。
        function setLocalStorage() {
            localStorage.setItem("Name", "John");
            localStorage.setItem("Job", "Developer");
            localStorage.setItem("Project", "Cordova Project");
        }
        // 記錄資料，我們新增到控制台
        function showLocalStorage() {
            console.log(localStorage.getItem("Name"));
            console.log(localStorage.getItem("Job"));
            console.log(localStorage.getItem("Project"));
        }
        // 現在讓我們建立的函式來儲存本地刪除專案
        function removeProjectFromLocalStorage() {
            localStorage.removeItem("Project");
        }
        //通過使用key() 方法將採取指數作為引數，並返回相應的索引值的元素的本地儲存元素
        function getLocalStorageByKey() {
            console.log(localStorage.key(0));
        }
        //使用音量增大按鈕事件
        document.addEventListener("volumeupbutton", callbackFunction, false);
        function callbackFunction() {
            alert('Volume Up Button is pressed!')
        }
        //後退按鈕
        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown(e) {
            //禁用退出應用程式
            e.preventDefault();
            alert('Back Button is Pressed!');
        }

        //Dialog Area
        document.querySelector('.alert').addEventListener('click', showAlert);
        // document.querySelector('.confirm').addEventListener('click', app.showConfirm);
        // document.querySelector('.prompt').addEventListener('click', app.showPrompt);
        showAlert: function showAlert(event) {
            let p = event.currentTarget
            navigator.notification.alert('Thanks for clicking', () => {
                p.style.backgroundcolor = 'gold';
            }, 'Custom Title', 'Dismiss')
        }

        document.getElementById("callpage").addEventListener("click", callAnothePage);
        callAnothePage: function callAnothePage() {
            window.location = "/test.html";
        }


        //inAppBrowser
        document.getElementById("openBrowser").addEventListener("click", openBrowser);

        openBrowser: function openBrowser() {
            var url = 'https://www.mobile01.com/';
            var target = '_blank';
            var options = "location=yes"
            var ref = cordova.InAppBrowser.open(url, target, options);

            ref.addEventListener('loadstart', loadstartCallback);
            ref.addEventListener('loadstop', loadstopCallback);
            ref.addEventListener('loadloaderror', loaderrorCallback);
            ref.addEventListener('exit', exitCallback);

            function loadstartCallback(event) {
                console.log('Loading started: ' + event.url)
            }

            function loadstopCallback(event) {
                console.log('Loading finished: ' + event.url)
            }

            function loaderrorCallback(error) {
                console.log('Loading error: ' + error.message)
            }

            function exitCallback() {
                console.log('Browser is closed...')
            }
        }
    }

};

app.initialize();