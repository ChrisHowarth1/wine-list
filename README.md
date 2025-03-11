# wines

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```


# Code Commentary

This is a simple responsive page designed to fetch wine data from a sample api and render the output in a responsive way
I decided to use Vue/Vite as a challenge to myself having not used the framework for a short while. Alternative considerations were svelte and react due to familiarity. With Next / Nuxt not really in the equation due to the simplicity of the app not requiring the extra complexity. 

The first decision was going to be regarding the data, and what data i would need for this. Weather to hardcode or pull in from an external API. 
Firstly i thought about what data i would need, in this case : 

- Wine name 
- Country of Origin
- User ratings 
- Reference Image 
- Category / color 

The above seemed like a good starting point of what would be useful information. With this in mind i started looking for if any sample apis existed. And without too much time looking i came across https://sampleapis.com/api-list/wines{reds/whites etc}. This sample api had all the required data for a variety of wine colors / categorys. 

With this in mind and a idea of what data would be required, i set out to produce a product card component to list items in. 
For initial build of this component i took the first three items from the endpoint and hard coded it in the component, as i didn't want the entire load on the page at this point. I decided to use three as this felt like a good maximum number for the grid and would be easily scalable. 

To start i made a simple card, and input the data in a reasonable order, images turned out to not all be exactly the same size and luckily this was apparent in just the first three items i took from the reds endpoint. Due to this i ensured images had a wrapper with a max width applied to ensure the sizing would be consistent and we wouldn't have issues going forward with layout. Once happy with the single card design / layout i ensured the card grid would be responsive, adding outer padding between items and giving them flex basis classes to ensure our grid would be 1 / 2 / 3 items depending on screen size. 

Once happy with the grid layout, i made a function to pull data, this being the useWineData function in src/store/useWineData.ts (edit, now src/composables/ for best practice). Initially i had this in app.vue but pulled this out to ensure readability and also separate logic from the ui. 

Initially this had the issue mentioned above, being all data rendered on the page at once, and this is quite a overwhelming amount of product cards. To combat this i decided to employ a page system which would paginate on scroll, as the user hits the bottom of the page the next 9 items will render. 
This handled the issues of too many items rendering at once. Additionally i made it clear to the user at the end of the page that all wines have been loaded / there are no more wines to load. This is also found in src/composables for best practise and to separate out logic from the ui. 

At the beginning the function was hardcoded to pull just the reds endpoint, however the next issue was that initially i had visualised the data being a single endpoint, and filtering the data based on category. As sample APIs instead separates categorys out to separate endpoints i had to change approach here, and instead opted to pass the category parameter through to the function based on user selection. To do this i created a filterButton component (technically badly named here) which on click, calls the select category function and passes the newly selected category to the getWineData function. This will then replace data from the newly selected endpoint and the component rerenders accordingly. 

I added some hover classes to the buttons and cards for better indication to the user. and added a outer wrapper to the filter buttons. 
Rather than hardcode the buttons as initially i moved out a array of categories to a constants file, and rendered buttons by looping through this array to generate the buttons, to make the categories more reusable, as this would generally stay the same across the app should this be built on further. 

At this point i also moved out the infinite scroll function to a separate file to ensure logic was separated out from app.vue, though in hindsight src/lib/ might be a better long term home for this file/function. 

To build on this futher i would look at potentially caching data of previously selected categories, to improve performance and reduce api calls. and also debounce the scroll function as it will call constantly on scroll at this point, but on a app this size has not shown obvious performance issues. 
