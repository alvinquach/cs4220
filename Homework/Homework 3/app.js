// Alvin Quach
// CS4220 Spring 2018
// Homework 3

const loading = {
    categories: false,
    search: false
};

let chuckNorris = new Vue({
    el: '#main',
    data: {
        loading: loading,
        categories: function() {
            const result = [];
            loading.categories = true;
            axios.get("https://api.chucknorris.io/jokes/categories", {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(res => {
                result.push(...res.data);
                loading.categories = false;
            })
            .catch(err => {
                alert(err)
            });

            // The empty array will be returned first, and then the data 
            // will be filled in afterreceiving response from the request.
            return result;
        }(),
        currentCategory: "All",
        currentFact: null,
        searchString: "",
        searchResult: null,
        searchHistroy: [],
        currentView: "random"
    },
    methods: {
        getFact: function() {
            const categoryParam = this.currentCategory == "All" ? "" : this.currentCategory;
            axios.get("https://api.chucknorris.io/jokes/random?category=" + categoryParam, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(res => {
                this.currentFact = res.data.value;
            })
            .catch(err => {
                alert(err)
            });
        },
        search: function() {
            const searchString = this.searchString.trim();
            if (!searchString) {
                alert("Search string cannot be empty!");
                return;
            }
            this.searchHistroy.unshift(searchString);
            this.loading.search = true;
            axios.get("https://api.chucknorris.io/jokes/search?query=" + searchString, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(res => {
                const regex = new RegExp(searchString, 'gi');
                this.searchResult = res.data.result.map(r => {
                    return r.value.replace(regex, match => "<span class='highlight'>" + match + "</span>");
                });
                this.loading.search = false;
            })
            .catch(err => {
                alert(err)
                this.searchResult = null;
                this.loading.search = false;
            });
        },
        switchView: function(view) {

            // Reset varaibles on view change.
            this.currentCategory = "All";
            this.currentFact = null;
            this.searchString = "";
            this.searchResult = null;

            this.currentView = view;
        }
    }
});

