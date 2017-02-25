const APNProvider = require('../providers/apn');

const morningMessage = 'Good morning. It\'s Time for your morning pills :)';
const eveningMessage = 'Good evening. It\'s Time for your evening pills :)';
const pillBoxMessage = 'Hi! Don\'t forget your pillbox :)';
const pillboxWaitTime = process.env.PILLBOX_WAIT_TIME || '1800000';

const eventHandler = {

  handleEventForUser: async (eventName, user) => {
    const push = new APNProvider();
    console.log('Connected to apple push notification service');
    const waitTime = parseInt(pillboxWaitTime, 10);

    switch (eventName) {
      case 'userWokeUp':
        push.send(morningMessage, user.push_token, 'morningEventIdentifier', 'morningEventIdentifier');
        break;
      case 'userGotUp':
        if (user.platform === 'ios') {
          push.send(morningMessage, user.push_token, 'morningEventIdentifier', 'morningEventIdentifier');
        }
        setTimeout(function () { push.send(pillBoxMessage, user.push_token, 'takePillboxEventIdentifier', 'takePillboxEventIdentifier'); }, waitTime);
        break;
      case 'userIsAboutToGoToSleep':
        push.send(eveningMessage, user.push_token, 'eveningEventIdentifier', 'eveningEventIdentifier');
        break;
      default:
    }
  },
};

module.exports = eventHandler;
