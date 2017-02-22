const apn = require('apn');

class APNProvider {
  constructor(appName) {
    const certPath = process.env.CERT_PATH || 'certificates/';
    const certName = process.env.CERT_NAME || 'medAdKey.p12';
    this.appName = appName;

    this.options = {
      pfx: `${certPath}${certName}`,
      production: false,
    };

    this.apnProvider = new apn.Provider(this.options);
  }

  send(content, deviceToken) {
    const note = new apn.Notification();
    console.log('apn send:', content, deviceToken);
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    note.sound = 'ping.aiff';
    note.alert = content;
    note.payload = { messageFrom: 'Med Adherence Server' };
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
