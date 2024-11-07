

document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var input = document.getElementById('input');
    var message = input.value.trim();
  
    // Validate the input
    if (message === '') {
      alert('Please enter a message.');
      return;
    }
  
  
    function sendToAIModel(message) {
    
      var xhr = new XMLHttpRequest();
    
      // Configure it: GET-request for the URL /article/.../load
      xhr.open('POST', 'https://api.cohere.ai/v1/chat', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer <API_KEY>');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); // Enable CORS
      xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // Enable CORS
      xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Enable CORS
    
      // Send the request over the network
      xhr.send(JSON.stringify({context: 'general', message: message}));
    
      // This will be called after the response is received
      xhr.onload = function() {
        if (xhr.status != 200) { // analyze HTTP response status
          alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
          // console.log(xhr.responseText);
          // console.log("Done");
          var response = JSON.parse(xhr.responseText);
          text_data=response.text
          console.log("Text data is: "+text_data);
    
          return text_data; // extract the text property from the response object and return it as a string
        }
      };
    }
  
  
  
  
    // Send the message to the AI model
    // This is just a placeholder. You'll need to replace this with your actual AI model code.
    var text_data;
  
  
    var response = sendToAIModel(message);
  
    setTimeout(function() {  
      // Display the response in the chatlog
      var chatlog = document.getElementById('chatlog');
      chatlog.value += 'You: ' + message + '\n';
      chatlog.value += 'AI: ' + text_data + '\n';
      // Clear the input
      input.value = '';
    }, 20000);
  
    
  
    // Clear the input
    input.value = '';
  });
  
  
