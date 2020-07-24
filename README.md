# Laz•u•li
> A user-driven social media and micro-blogging platform.

[Video Demo](https://www.youtube.com/watch?v=AGQdlsAipgw)

This is a social media app, built on React for the frontend, and Rails as an API backend. You can create an account, with passwords saved in an encrypted form on the database due to the bcrypt gem, and client-to-server auth using JWT.

This is the frontend, the backend can be found [here](https://github.com/gothfemme/lazuli-backend).

## Development Setup

### Frontend

OS X & Linux:

```sh
npm install
npm start
```

### Backend

OS X & Linux:

```sh
bundle install
rails db:create
rails db:migrate
rails s
```

## Usage example

This is just a pretty straight forward social media website, similar to Tumblr. Create an account, post, follow other users, reblog, comment or like their posts. 


## Meta

Kat Michaela – [@gothfemme](https://twitter.com/gothfemme) – k@gothfem.me - [github](https://github.com/gothfemme/)

## Contributing

1. Fork it (<https://github.com/gothfemme/lazuli-frontend/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
