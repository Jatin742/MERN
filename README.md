To set up this application first open a terminal in VS code and run this command to clone the project on local machine

    git clone https://github.com/Jatin742/Rbac-Assignment.git

After cloning and extracting it to a particular folder
you need to run the given command in both folders in terminal to install all required modules
        
    npm i

After this create a .env file in backend and setup the required environment variables

    MONGO_URI=
    JWT_SECRET=
    JWT_EXPIRE=
    COOKIE_EXPIRE=
After setting up these variables run command the given command to start backend application 

    npm start 

One more .env file is required to be created to in frontend for the given variables

    REACT_APP_BACKEND_HOST=
    REACT_APP_API_KEY=
    REACT_APP_AUTH_DOMAIN=
    REACT_APP_PROJECT_ID=
    REACT_APP_STORAGE_BUCKET=
    REACT_APP_MESSAGING_SENDER_ID=
    REACT_APP_APP_ID=
    REACT_APP_MEASUREMENT_ID=

After doing all these steps run command npm start in frontend directory and the application setup is complete.