## Links
Live Demo: https://shoppies-w21.herokuapp.com/

Technical Requirements: https://docs.google.com/document/d/1AZO0BZwn1Aogj4f3PDNe1mhq8pKsXZxtrG--EIbP_-w/edit#heading=h.31w9woubunro

## Additional Features
* Autocomplete search bar
* Fully responsive (Go test it on your phone)
* Dark mode (flick that switch next to the "Shoppies" heading)
* Caching implemented for OMDB queries(noticeable when searching for the same keyword or flipping through pages in the movies list)
* Animations
* Nominations are saved via localStorage
* IMDB links on each movie/nomination
* Loading and error states (type and enter "he" in the search bar. Also each loading image will have a placeholder)


## More about caching
When you start typing for the movie in the searchbar, we prefetch the OMDB results making it especially fast when you press search!

## Notes
* The initial movie list has some of my favourite movies. Check em out, they're good!
* For the cache, the stale time for each query is 5 minutes

## Future Improvements
* If I had more time, I'd right unit tests for my reducers and maybe some integration tests for the scrolling logic using Jest, RTL, and RTL/hooks
* Currently, we use localStorage to store all our nominations. However, nothing is implemented to keep the nomination data and the server data in sync. This is a possible edge case.
* A "View more button" for each movie which shows more details from the API
* Ability to filter by year 
* Right now it's wonky to have two theme providers(one for styled-components, one for material-ui). It'd be best to clean that up to reduce duplicate logic in the future
* A better design with more vector art

## Main tech stack
* React Hooks + Context for global state management
* react-query for OMDB state layer
* styled-components for CSS and component systems
* Material-UI for certain components and breakpoint management 
* Immer for immutability

### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).