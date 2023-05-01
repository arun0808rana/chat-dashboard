import { socket } from "../../socket";
const baseURL = `http://localhost:5000`;

export async function loginUser(credentials) {
    try {
        const response = await fetch(baseURL + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        let token = data.token;

        if(token){
            localStorage.setItem('token', token);
        }

        // Send the token to the server
        socket.auth = { token };
        socket.connect();

        // // Hide the login form and show the chat
        // document.querySelector('form').style.display = 'none';
        // document.getElementById('chat').style.display = 'block';
      } catch (error) {
        console.error(error);
        alert('Login failed');
        localStorage.removeItem('token');
      }
}