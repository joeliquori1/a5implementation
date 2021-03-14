import React from 'react';
import axios from 'axios';
import DisplayMessage from './components/DisplayMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane as faPaperPlaneRegular } from '@fortawesome/free-regular-svg-icons'
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons'
import translateText from './googleTranslate'
require('dotenv').config();

// Your credentials
//const CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS


// import logo from './logo.svg';

class App extends React.Component {
   state = {
     english: '',
     spanish: '',
     messages: []
   };


   componentDidMount = () => {
     this.getMessage();
   };

   getMessage = () => {
     axios.get('/api')
       .then((response) => {
         const data = response.data;
         this.setState({ messages: data })
         //console.log('Data has been received');
       })
       .catch(() => {
         alert('Error retrieving data!!');
       });
   }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

   submit = async (event) => {
      event.preventDefault();
      var payload = {
        english: this.state.english,
        spanish: this.state.spanish,
        isleft: false,
        rating: false
      };
      
      if(payload.english !== '' || payload.spanish !== '')
      {
        payload = await this.translate(payload);
        axios({
          url: '/api/save',
          method: 'POST',
          data: payload
        })
          .then(() => {
            this.resetUserInputs();
            this.getMessage();
          });
      }
   };
   
   translate = async (payload) => {
     var newPayload = payload;
    
     if (newPayload.spanish === '')
      {
       newPayload.isleft=true;
       newPayload.spanish = await translateText(payload.english, 'es');
      } else {
       newPayload.isleft = false;
       newPayload.english = await translateText(payload.spanish, 'en');
      }
     return newPayload;
   };

   resetUserInputs = () => {
     this.setState({
       english: '',
       spanish: ''
     });
   };

   displayMessages = (messages) => {
     if (!messages.length) return null;
     messages = messages.reverse();
     return messages.map((messages, index) => (
       <DisplayMessage key={index} messages={messages}></DisplayMessage>
     ))
   }

   delete = (event) => {
     event.preventDefault();
     axios.delete("/api/deleteAll", {data: {}});
     axios.delete("/api/deleteAll", { data: {} });
     this.resetUserInputs();
     this.getMessage();
   }

   render() {
     //console.log('Stat0: ', this.state );
     return (
       <div className="grid-container" >
         <header className="row">
           <div>
             <a className="brand" href="index.html">GatorCom</a>
           </div>
           <div>
             <a href="reports.html">Reports</a>
           </div>
         </header>
         <main>
           <div className="main-grid">
             <div className="languages">
               <div className="languages english">
                 <h3>Language: English</h3>
               </div>
               <div className="languages spanish">
                 <h3>Language: Spanish</h3>
               </div>
             </div>
             <div className="messages">
               {this.displayMessages(this.state.messages)}
             </div>
             <div className="input">
               <div className="input area">
                 <form onSubmit={this.submit}>
                  <div className="input area text">
                    <textarea 
                      name="english" 
                      placeholder="Enter Your Sentence..." 
                      rows="1" 
                      title="Enter Your Sentence" 
                      value={this.state.english}
                      onChange={this.handleChange}>
                    </textarea>
                    <button type="translate">
                       <FontAwesomeIcon icon={faPaperPlaneRegular} />
                       {/* <i className="far fa-paper-plane" title="Send"></i> */}
                    </button>
                  </div>
                 </form>
               </div>
               <div className="input area">
                 <form onSubmit={this.submit}>
                   <div className="input area text">
                     <textarea
                       name="spanish"
                       placeholder="Ingrese Su Sentencia..."
                       rows="1"
                       title="Ingrese Su Sentencia..."
                       value={this.state.spanish}
                       onChange={this.handleChange}>
                     </textarea>
                     <button type="translate">
                       <FontAwesomeIcon icon={faPaperPlaneRegular} />
                       {/* <i className="far fa-paper-plane" title="Send"></i> */}
                     </button>
                   </div>
                 </form>
               </div>
             </div>
             <div className="finish">
               <button type="End Converstaion" onClick={this.delete}>
                 End
                 <FontAwesomeIcon icon={faPhoneSlash} />
                  <i className="fas fa-phone-slash"></i>
                 Fin
                </button>
             </div>
           </div>
         </main>
         <footer className="row center">
           <h5>A5 Implementation By: Joseph Liquori</h5>
         </footer>
       </div>
     );
   }
  
}



export default App;