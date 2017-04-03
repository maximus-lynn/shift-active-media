export class mobileOffCanvas {
    static init() {
        const offCanvasLinks = document.querySelectorAll('.off-canvas__link');

        // Simple forEach to get a click event onto the mobile navigation at the bottom. 
        [].forEach.call(offCanvasLinks, (link) => {
            link.addEventListener('click', (event) => {
                const typeVal = link.getAttribute('data-type') 
                const containers = document.querySelectorAll('[data-container]');

                [].forEach.call(containers, (container) => {
                    const containerVal = container.getAttribute('data-container') 

                    container.classList.toggle('active',
                        typeVal === containerVal && 
                        !container.classList.contains('active'));

                })

            })
        });
    }
}