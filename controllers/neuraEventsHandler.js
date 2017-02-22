const eventHandler = {
  getMessageForEvent: (eventName) => {
    let message;
    switch (eventName) {
      case 'userWokeUp':
        message = 'Good morning. It\'s Time for your morning pills :)';
        break;
      case 'userGotUp':
        message = 'Hi! Don\'t forget your pillbox :)';
        break;
      case 'userIsAboutToGoToSleep':
        message = 'Good evening. It\'s Time for your evening pills :)';
        break;
      default:
        message = 'Unknown Event';
    }
    return message;
  },

  getCategoryForEvent: (eventName) => {
    let category;
    switch (eventName) {
      case 'userWokeUp':
        category = 'morningEventIdentifier';
        break;
      case 'userGotUp':
        category = 'takePillboxEventIdentifier';
        break;
      case 'userIsAboutToGoToSleep':
        category = 'eveningEventIdentifier';
        break;
      default:
        category = 'Unknown Event';
    }
    return category;
  },
};

module.exports = eventHandler;
