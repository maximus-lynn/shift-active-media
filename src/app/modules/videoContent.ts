export class videoContent {
    static init() {
        const xmlhttp = new XMLHttpRequest();
        const url = "assets/devTask.json";
        const videoContainer = document.querySelector('#video-content')
        const self = this

        // Example of a RAW Javascript Request.
        // I would normally have done this in Jquery or a Ajax Lib if I was not using Jquery already. 
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let videos = JSON.parse(this.responseText);

                // Get date in readable form without moment lib 
                [].forEach.call(videos, function(video) {
                    let date = new Date(video.publishDate)
                    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];                    
                    let day = date.getDate()
                    let month = date.getMonth()
                    let year = date.getFullYear()         
                    
                    let html = `
                        <article>
                            <a class="card"
                            href="https://www.globalcyclingnetwork.com/video/${video.urlTitle}">
                                <img src="http://placehold.it/400x250">
                                <time>${day} ${monthNames[month]} ${year}</time>
                                <h1>${video.title}</h1>
                            </a> 
                        </article>
                    `;
                    self.appendHtml(videoContainer, html);
                })
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    static appendHtml(el, str) {
        let div = document.createElement('div');

        div.innerHTML = str;
        while (div.children.length > 0) {
            el.appendChild(div.children[0]);
        }
    }

}