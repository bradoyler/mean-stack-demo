// TwilioService

var config = require('sails').config;

var ACCOUNT_SID = config.account_sid || process.env.ACCOUNT_SID;
var AUTH_TOKEN = config.auth_token || process.env.AUTH_TOKEN;
var FROM_SMS = config.FROM_SMS || process.env.FROM_SMS;
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

exports.sendSMS = function(options) {

      console.log('SMS:',options.phoneTo, FROM_SMS, ACCOUNT_SID, options.updatedRecord.title);

      client.sendMessage({
          to: options.phoneTo, // Any number Twilio can deliver to
          from: FROM_SMS, // A number you bought from Twilio and can use for outbound communication
          body: "'"+ options.updatedRecord.title + "' task has been marked as done" // body of the SMS message
      }, function(err, responseData) { //this function is executed when a response is received from Twilio
        
        if (!err) { // "err" is an error received during the request, if any
            console.log(responseData.body); // outputs "word to your mother."
        }
        else{
           console.log('error: ', err);
        }

    });

};