# Innoscripta Challenge: NewsHub - See the World Closer
![Innoscripta](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/innoscripta-logo.png "Logo Innoscripta")

#### This is an application that allow users to Stay Informed and Empowered with the Latest News and personalize it.

### Built With
* [Laravel v10.8](https://laravel.com/docs/10.x)
* [React JS v18.2](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Vite v4.0](https://vitejs.dev/)
* [MySQL v15.1](https://dev.mysql.com/doc/)
* [NewsAPI v2](https://newsapi.org/docs)

### Prerequisites

In order to run this prroject you should have `Docker` and `Docker Compose` installed on your local machine.
Just in case, you don't feel like to use the docker you can just follow the instruction "Getting Started (w/o Docker)".

## Getting Started (w/ Docker)
Follow this step guide to prepare the requirement system before using the apps
1. Install composer 
    ```sh
    docker-compose run --rm composer install
    ```
2. Install npm (you can use yarn)
    ```sh
    docker-compose run --rm npm install
    ```
3. Migrate database
    ```sh
    docker-compose run --rm laravel-migrate-seed
    ```
4. Regenerate key apps
    ```sh
    docker-compose run --rm artisan key:generate
    ```
5. Optimized apps (config & routes cache)
    ```sh
    docker-compose run --rm artisan optimize
    ```
6. Build the frontend assets
    ```sh
    docker-compose run --rm --service-ports npm run build
    ```
7. Last but not least, run the server in backround
    ```sh
    docker-compose up --build nginx -d
    ```
8. Open it on your browser 
    - [x] http://localhost:8000 (Main Apps)
    - [x] http://localhost:8888 (phpMyAdmin)

## Getting Started (w/o Docker)
Follow this step guide to prepare the requirement system before using the apps
1. Download and install [Composer](https://getcomposer.org/)
2. Download and install [NodeJS](https://nodejs.org/en/download)
3. Clone this repo
    ```sh
   git clone https://github.com/Fq2112/innoscripta-challenge.git
   ```
3. Install the composer required packages
    ```sh
   composer install
   ```
4. Install the node required packages
    ```sh
   npm i
   ```
   or if using yarn
    ```sh
   yarn install
   ```
5. Copy ``.env.example`` file and rename it to ``.env`` 
6. Adjust ``.env`` file based on your device environment and don't forget to put your Mailtrap credentials and the NewsAPI key as well
7. Make sure your mysql is run properly and run this command
    ```sh
   php artisan migrate:fresh --seed
   ```
8. Run the backend
    ```sh
   php artisan serve
   ```
9. Open new terminal session without closing the previous one and run this command
    ```sh
   npm run dev
   ```
   or if using yarn
    ```sh
   yarn run dev
   ```
10. Open it on your browser (http://localhost:8000)

## Overview

### A. Authentication
1. ![Signup](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Signup.png "Signup")
2. ![Verify](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Verify.png "Verify")
3. ![Signin](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Signin.png "Signin")
4. ![Forgot Password](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Forgot-Password.png "Forgot Password")
5. ![Recovery Password](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Recovery-Password.png "Recovery Password")
6. ![Reset Password](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Reset-Password.png "Reset Password")

### B. Home
1. ![Home (Hero)](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Home-Hero.png "Home (Hero)")
2. ![Home (Feeds)](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Home-Feeds.png "Home (Feeds)")
3. ![Footer](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Footer.png "Footer")

### C. News
1. ![Search News](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Search-News.png "Search News")
2. ![Pagination](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Pagination.png "Pagination")
3. ![News Detail (top)](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/News-Detail-top.png "News Detail (top)")
4. ![News Detail (bottom)](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/News-Detail-bottom.png "News Detail (bottom)")

### D. Account Settings
1. ![Account Settings](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Account-Settings.png "Account Settings")
2. ![Edit Profile](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Edit-Profile.png "Edit Profile")
3. ![News Preferences](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/News-Preferences.png "News Preferences")

### E. Mobile View
1. ![Mobile View (Home)](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Mobile-View-Home.png "Mobile View (Home)")
2. ![Mobile View (Feeds)](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Mobile-View-Feeds.png "Mobile View (Feeds)")
3. ![Mobile View (News Detail)](https://raw.githubusercontent.com/Fq2112/innoscripta-challenge/master/public/images/overview/Mobile-View-News-Detail.png "Mobile View (News Detail)")


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` file for more information.

<p align="right">(<a href="#readme">back to top</a>)</p>