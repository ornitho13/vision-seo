
![Vision SEO logo](https://github.com/ornitho13/vision-seo/blob/master/image/logo.jpg?raw=true)
# vision-seo
a SEO helper tool for development

## Why ?
As a developer, i need tools which warms me when i make mistake :)
It's why i create this helper.
Vision SEO provide you, in one look, to see what is wrong with SEO in your development.

## How ?
first install it
### npm
    npm i vision-seo

### use it
in your `<head>`

    <script src="node_modules/vision-seo/script/vision-seo.js"></script>
    <link rel="stylesheet" href="node_modules/vision-seo/style/vision-seo.css">

## What ?
here the features available with Vision SEO :
* add `Schema.org` detection **NEW (v1.2.3)**

![Schema Detection](https://github.com/ornitho13/vision-seo/blob/master/image/schema-org.png?raw=true)
* update performance content : add performance timing mesurement (DNS, Network, DomContentLoaded, load, redirectCount...) **NEW (v1.2.1)**

![Performance Timings](https://github.com/ornitho13/vision-seo/blob/master/image/performance-timing.png?raw=true)

* add a SEO score *(v1.2)*
* add Twitter and Facebook open graph detection *(v1.2)*
* check `meta robots` *(v1.1)*
* verify `<h1>` number
* verify `<h1>`, `<h2>`, ... hierarchy
* check if the website is `https`
* check if website has `<meta name="viewport">` with content value
* check number of `<a>` without or empty href
* check number of `<a>` without or empty title
* check number of `<a>` with empty content
* check number of `<a>` with `target=_blank`
* check number of `<img>` without or empty alt
* check number of `<img>` without or empty src
* check number of `node` in the current web page
* check if the web page have a `canonical` or not
* check if the web page has `title` and if it's value is empty
* check if the web page has `description` and if it's value is empty
* give the `load time performance` for the current page

## Demo
https://ornitho13.github.io/vision-seo/

## Requirement
Basically nothing, or maybe npm for the easy installation

## Have ideas for this tool ?
feel free to open issue at : https://github.com/ornitho13/vision-seo/issues

## Version
1.2.3
