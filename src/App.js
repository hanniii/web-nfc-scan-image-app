import React from 'react';
import './App.css';


/*global NDEFReader*/
async function readTag(){
  
  /* if NDEFReader IS available on the device */
  if ("NDEFReader" in window) {

    /* initialize the reader */
    const reader = new NDEFReader();

    try {
      /* Wait for promise - The scan() method of NDEFReader interface reads NDEF records from compatible NFC tag.  */
      await reader.scan();

      /* The onreading property is called whenever a new reading is available from a NFC tag, 
      event starts when the tag is within the reader's magnetic induction field. */
      reader.onreading = event => {

        /* The TextDecoder interface represents a decoder for a specific text encoding. 
        It takes a stream of bytes as input and emits a stream of code points */
        const decoder = new TextDecoder();

        /* Loop runs thru all datafields of the NFC tag, this gives a full list of all datas */
        for (const record of event.message.records) {

          /* To display the Image: Filter if type is a URL call fillImg() with the information of the data field */
          if(decoder.decode(record.data).substring(0, 4) == 'http'){
            fillImg(decoder.decode(record.data));
          }
          /* To print the Logs: Filter if information doesn't start with 'http' call consoleLog() with the information of the data field */
          if(decoder.decode(record.data).substring(0, 4) != 'http'){
            consoleLog("\n" + decoder.decode(record.data) + "\n" );
          }
        }
      }
    } catch(error) {
      /* if Try block doesn't work call consoleLog() and print the error message  */
      consoleLog(error);
    }
  } else {
    /* if NDEFReader IS NOT available */
    consoleLog("Web NFC is not supported.");
  }
}

/* Function to print the data informations in the Logbox
gets the HTML element with ID 'log' and prints the information in it */
function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += data + '\n' + '</br>';
};

/* Function to display the Image
gets the HTML element with ID 'fillImg' and put the source to the giving source of the NFC tag */
function fillImg(data) {
  var linkImg = document.getElementById('fillImg');
  linkImg.src = data;
};


function App() {
  return (

    <div className="app text-center">

      <h4>Scann your Image-NFC-Tag</h4>

      <div className="img">
        <img id="fillImg" src="" class="img-fluid rounded" alt=""></img>
      </div>

      <p>Logs:</p>
      <div className="divlog">
        <div id="log"></div>
      </div>

      <button type="button" className="btn" onClick={readTag}>
        <span className="iconify" data-icon="ic-baseline-nfc" data-inline="false"></span>
      </button>
      
    </div>
  );
}

export default App;
