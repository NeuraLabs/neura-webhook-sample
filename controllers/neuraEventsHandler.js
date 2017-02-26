/**
 * The eventHandler object is a specific inplementation used in the med adherence app
 * sample in https://github.com/NeuraLabs/NeuraMedsReminderIOS
 *
 * @requires apn provider for apple push which uses the apn npm
 */

const APNProvider = require('../providers/apn');

const morningMessage = 'Good morning. It\'s Time for your morning pills :)';
const eveningMessage = 'Good evening. It\'s Time for your evening pills :)';
const pillBoxMessage = 'Hi! Don\'t forget your pillbox :)';
const pillboxWaitTime = process.env.PILLBOX_WAIT_TIME || '1800000'; // 30 minutes delay

/**
 * eventHandler
 * @type {Object}
 */
const eventHandler = {

  /**
   * Handle an event sent to the webhook making sure the correct message is sent
   * @param  {String} eventName the event name extracted from the request sent to the webhook
   * @param  {user}   user      the user object from the database
   */
  handleEventForUser: async (eventName, user) => {
    const push = new APNProvider();
    console.log('Connected to apple push notification service');
    const waitTime = parseInt(pillboxWaitTime, 10);

    /**
     * Handles the events subscribed to in the sample application
     * @param  {Sring} eventName the event name extracted from the request sent to the webhook
     * iOS devices might have some issues with 'userWokeUp' so 'userGotUp' will serve similar
     * functionality for the morning reminder as well
     */
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
