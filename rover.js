const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;  
    }
    receiveMessage(message){
      let respond = {}
      let resultsArr = []
      for(let i=0; i<message.commands.length; i++){
         let obeyedStatus = {};
         if(message.commands[i].commandType ==="MOVE" && this.mode==='NORMAL')
         {
            obeyedStatus["completed"] = true
            this.position = message.commands[i].value;  
         }
         else if (message.commands[i].commandType ==='STATUS_CHECK')
         {  
            obeyedStatus["completed"] = true 
         } 
         else if (message.commands[i].commandType ==="MODE_CHANGE")
         {  
            obeyedStatus["completed"] = true 
            this.mode = message.commands[i].value; 
         }
         else 
         {  
            obeyedStatus["completed"] = false 
         }
         let robotStatus={}   
         robotStatus["mode"] = this.mode;
         robotStatus["generatorWatts"] = this.generatorWatts;
         robotStatus["position"] = this.position;
         obeyedStatus["roverStatus"] = robotStatus;
         resultsArr.push(obeyedStatus)
      }
      respond["message"] = message.name
      respond["results"] = resultsArr
      return respond
    } 
}

module.exports = Rover;