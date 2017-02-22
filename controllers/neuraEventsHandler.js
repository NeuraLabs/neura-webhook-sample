const eventHandler = {
  getMessageForEvent: (eventName) => {
    let message;
    switch (eventName) {
      case 'userWokeUp':
      case 'userGotUp':
        message = 'Good morning. It\'s Time for your morning pills :)';
        break;
      case 'userIsAboutToGoToSleep':
        message = 'Hi! Don\'t forget your pillbox :)';
        break;
      default:
        message = 'Unknown Event';
    }
    return message;
  },
};

module.exports = eventHandler;
