const APNProvider = require('../providers/apn');

const morningMessage = 'Good morning. It\'s Time for your morning pills :)';
const eveningMessage = 'Good evening. It\'s Time for your evening pills :)';
const pillBoxMessage = 'Hi! Don\'t forget your pillbox :)';
const pillboxWaitTime = process.env.PILLBOX_WAIT_TIME || 1800000;

const eventHandler = {

  handleEventForUser: async (eventName, user) => {
    const push = new APNProvider();
    console.log('Connected to apple push notification service');
    const category = this.getCategoryForEvent(eventName);
    switch (eventName) {
      case 'userWokeUp':
        push.send(morningMessage, user.push_token, category, 'userWokeUp');
        break;
      case 'userGotUp':
        if (user.platform === 'ios') {
          push.send(morningMessage, user.push_token, category, 'userGotUp');
        }
        setTimeout(push.send(pillBoxMessage, user.push_token, category, 'userGotUp'), pillboxWaitTime);
        break;
      case 'userIsAboutToGoToSleep':
        push.send(eveningMessage, user.push_token, category, 'userIsAboutToGoToSleep');
        break;
      default:
    }
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
