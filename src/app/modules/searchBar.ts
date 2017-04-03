export class SearchBar {
    static init() {
        const searchButton = document.querySelector('[data-search]')
        const searchBar = document.querySelector('[data-search-bar]')
        const closeSearchBar = document.querySelector('[data-close-search-bar]')

        searchButton.addEventListener('click', () => {
            searchBar.classList.toggle('active')
        })

        closeSearchBar.addEventListener('click', () => {
            searchBar.classList.remove('active')
        })        
    }
}