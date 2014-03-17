
module.exports = {

  attributes: {
  	title: {
      type: 'string',
      required: true
    },

    body:'string',
    
    isComplete: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  // Lifecycle Callbacks
  afterUpdate: function(updatedRecord, next) {

    console.log('updatedRecord isComplete', updatedRecord.isComplete);

    User.findOne(1).done(function(err, user) {
      if(updatedRecord.isComplete){
        TwilioService.sendSMS({phoneTo:user.phone, updatedRecord:updatedRecord});
      }
    });
    next();
  }

};
