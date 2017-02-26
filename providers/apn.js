/**
 * implements the needed steps to send a push notification to an apple device
 * @requires apn npm
 */
const apn = require('apn');

class APNProvider {
  /**
   * sets the needed properties to allow push notifications
   */
  constructor() {
    const certPath = process.env.CERT_PATH || 'certificates/';
    const certName = process.env.CERT_NAME || 'medAdKey.p12';

    this.options = {
      pfx: `${certPath}${certName}`,
      production: false,
    };

    this.apnProvider = new apn.Provider(this.options);
  }

  /**
   * Sends a push notification to an apple device
   * @param  {String} content     the message that appears on the user's device
   * @param  {String} deviceToken the push token
   * @param  {String} category    the actions category on the apple device
   * @param  {String} event       the event type
   */
  send(content, deviceToken, category, event) {
    const note = new apn.Notification();
    console.log('apn send:', content, deviceToken);
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    note.sound = 'ping.aiff';
    note.alert = content;
    note.payload = { messageFrom: 'Med Adherence Server', event_type: event };
    note.topic = 'com.neura.medicationn';
    note.category = category;

    this.apnProvider.send(note, deviceToken).then((result) => {
      console.log('sent:', result.sent.length);
      console.log('failed:', result.failed.length);
      console.log(result.failed);
    });
  }
}

module.exports = APNProvider;
