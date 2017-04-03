import { SearchBar } from './modules/searchBar';
import { mobileOffCanvas } from './modules/mobile-nav';
import { videoContent } from './modules/videoContent';

export class Main {
    // Calls All Functions on load. 
    constructor() {
        SearchBar.init()
        mobileOffCanvas.init()
        videoContent.init()
    }
}

let main = new Main()