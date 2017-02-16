const apn = require('apn');

class APNProvider {
  constructor() {
    this.options = {
      pfx: 'certificates/medAdKey.p12',
      production: false,
    };

    this.apnProvider = new apn.Provider(this.options);
  }

  send(content) {
    const deviceToken = '5ec0259ae5764d066f52bfd3b4c732cc9ef93f10a57134dde45aa9389b00895f';

    const note = new apn.Notification();

    // {
    //   "messageFrom":"John Appelseed","aps":
    //   {
    //     "badge":3,"sound":"ping.aiff","alert":"\uD83D\uDCE7 \u2709 You have a new message"
    //   }
    // }
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = 'ping.aiff';
    note.alert = `\uD83D\uDCE7 \u2709 You have a new message, ${content}`;
    note.payload = { messageFrom: 'John Appleseed' };
    note.topic = 'com.neura.medicationn';

    this.apnProvider.send(note, deviceToken).then((result) => {
      // see documentation for an explanation of result
      console.log('sent:', result.sent.length);
      console.log('failed:', result.failed.length);
      console.log(result.failed);
      // debugger;
    });
  }
}

module.exports = APNProvider;
