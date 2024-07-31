const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  // TEST 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

    // TEST 8
    it("response returned by receiveMessage contains the name of the message", function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382);    // Passes 98382 as the rover's position.
      let response = rover.receiveMessage(message);
      expect(response.message).toEqual('Test message with two commands');
    });

    // TEST 9
    it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382);    // Passes 98382 as the rover's position.
      let response = rover.receiveMessage(message);
      expect(response.results.length).toEqual(2);
    });

      // TEST 10
      it("responds correctly to the status check command", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
        expect(response.results[1].roverStatus.mode).toEqual("LOW_POWER");
        expect(response.results[1].roverStatus.generatorWatts).toEqual(110);
        expect(response.results[1].roverStatus.position).toEqual(98382);
      });

      // TEST 11
      it("responds correctly to the mode change command", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
        expect(response.results[0].completed).toEqual(true);
        expect(response.results[0].roverStatus.mode).toEqual("LOW_POWER");
      });
      
      // TEST 12
      it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 2000)];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
        expect(response.results[2].completed).toEqual(false);
        expect(response.results[0].roverStatus.position).toEqual(98382);
      });

      // TEST 13
      it("responds with the position for the move command", function() {
        let commands = [new Command('MOVE', 2000)];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
        expect(response.results[0].roverStatus.position).toEqual(2000);
      });
});
