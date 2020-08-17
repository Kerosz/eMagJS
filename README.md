# eMagJS - eCommerce Application

![Status](https://img.shields.io/badge/Status%20-ONGOING-critical)

### Goal

Build a full-stack ecommerce application using `VanillaJS` on the front-end and `NodeJS/MondoDB` on the back-end.

## Key Concepts

1. The application is using a custom client side rendering (without page refresh)
2. The application has a server side validation

## User Requirement Specification

- User Story #1 As a user, I should be able to see a a list of products on the homepage
- User Story #2 As a user, I should be able to get a a basic level of information about that product in the homepage
- User Story #3 As a user, I should be able to view the product details page
- User Story #4 As a user, I should be able to add/remove a product to/from the cart
- User Story #5 As a user, I should be able to save products to the wishlist
- User Story #6 As a user, I should be able to complete a purchase
- User Story #7 As a user, I should be able to see my past orders
- User Story #7 As a user, I should be able to sort products

## System Requirement Specification

- The application shall allow users to querry a list of product on website load
- The application shall allow users to register and login their accounts to save products to wishlist
- The application shall allow users to complete a purchase and process their payment option
- The application shall allow users to sort the data by time, name and price

## Features

[x] Homepage/Store page list of products
[x] Register/Login system
[x] Newsletter system
[x] Profile/settings account page
[x] Buy points system
[x] Dynamic shipping calculator
[x] Adding/removing products to cart and changing quantity
[x] Dinamic price calculator (shipping included)
[ ] Wishlist system
[ ] Product specifications section
[ ] Reviews system
[ ] Cupon/voucher/discounts system
[ ] Daily sales/discounts system
[ ] Register as a vendor/seller system
[ ] Product sorting system
[ ] More features in design process

## Application Dependencies

- Express
- Express async handler
- CORS
- Mongoose
- Jsonwebtoken
- Body-parser
- Dotenv
- Axios
- Moment JS
- Bootstrap-icons

## Developer Dependencies

- Webpack
- Webpac-CLI
- Webpack-dev-server
- @babel/cli
- @babel/core
- @babel/node
- @babel/preset-env
- eslint
- eslint-config-airbnb-base
- eslint-config-prettier
- eslint-plugin-import
- nodemon

## Install

1. Open a terminal and clone the repo using the following command: `git clone https://github.com/Kerosz/eMagJS`
2. Have `Mongo DB` installed on your system, and running.
3. Create a `.env` file using the `env.example`
4. `CD` into `eMagJS` directory and run the following command: `yarn add`
5. Run the following command to start a local server: `yarn start`
6. `CD` into `eMagJS/client` directory and run the following command: `yarn add`
7. Repeat step 3
