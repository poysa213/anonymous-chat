
# Anonymous Chat App

The Anonymous Chat App is a web application that allows users to connect and chat anonymously with others. The app provides the option to create chat rooms or join existing rooms using unique room IDs.

# Important Note on Deployment

I faced significant challenges during the deployment of the Anonymous Chat App due to limitations with several serverless host providers. Unfortunately, these providers do not support WebSocket connections and impose strict function timeout limits. As a result, I was unable to successfully deploy the application using these providers.

## Technologies Used

- Django: A Python web framework used for building the backend of the application.
- Next.js: A React framework used for building the frontend of the application.

## Setting Up the server (Backend) App

1. Navigate to the `server` directory:
	 ```
	 cd server 
	 ```

2. Create a virtual environment (optional but recommended):

    python3 -m venv env

3. Activate the virtual environment:
- For Windows:
  ```
  env\Scripts\activate
  ```
- For macOS/Linux:
  ```
  source env/bin/activate
  ```

4. Install the required dependencies:
	 ```
	 pip install -r requirements.txt
	  ```
6. Start the Django development server:
	 ```
	 python manage.py runserver
	  ```
	 or 
	  ```
	  daphne core.asgi:application 
	  ```

## Setting Up the client (Frontend) App

1. Navigate to the `client` directory:
     ```
     cd client
      ```
2. Install the dependencies using npm:
	 ```
	 npm install
	 ```
3. Start the development server:
	 ```
	 npm run dev
	 ```
4. Access the chat app at`http://localhost:3000`.







