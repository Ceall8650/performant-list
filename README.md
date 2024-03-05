# Performant List

A list that allows easy reading of a large amount of data and smooth scrolling on mobile devices. 

## Tech Stack

- React 18 
- SCSS + TailwindCSS 3
- TypeScript 5

## Features

- Pagination
- Responsive Web Design(RWD)
- API Cache
- Lazy loading & Infinite Scrolling
- Virtualization List

## Performance Tune

- Laptop mode
  - Cache the API response when the loading the new page
  - Load the cache data if the page has been visited

- Mobile mode
  - Lazy loading the list to avoid to load a large amount of the data
  - Virtualized the list to avoid rendering a large amount of the DOM 

## Environment

- Node.js v18.15.0 or later

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd performant-list
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

Get the fake list from https://dummyjson.com/
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

For support, email ceall8650@gmail.com

