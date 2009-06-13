function FirstAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

FirstAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */

	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */

	/* setup widgets here */

	/* add event handlers to listen to events from widgets */
	this.count = 0;
	var attributes = {
     textFieldName: 'RSS Feed URL',
     //hintText: 'Enter A URL',
     property: 'value'
    };

    this.model = {
    value: "http://www.pinmonkey.com/pages/1.rss"
    };

    this.controller.setupWidget('rssAddress', attributes, this.model);

    this.buttonModel = {
     buttonLabel : "Button"
    };
    this.controller.setupWidget('button', {}, this.buttonModel);
    //add a listener
    this.controller.listen('button', Mojo.Event.tap, this.getFeed.bind(this));
}

FirstAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


FirstAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

FirstAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
}


FirstAssistant.prototype.getFeed = function(event) {
    Mojo.Log.info("In the getDeed function.");

  url = this.model.value
if(this.count == 0){
  var request = new Ajax.Request(url, {
     method: 'get',
     evalJSON: 'false',
     onSuccess: this.showFeed.bind(this),
     onFailure: this.failure.bind(this)
  });
  Mojo.Log.info("Started");
  }else{
  this.showFeed(this.response);
  }

}

FirstAssistant.prototype.showFeed = function(response) {
    this.response = response;
	  this.count++
	    var parser = new DOMParser();

      var xmlDoc = parser.parseFromString(this.response.responseText, "text/xml");


      var contentIterator = xmlDoc.evaluate('//channel/item/description', xmlDoc, null, XPathResult.ANY_TYPE, null);


    var description;

      for(i=0;i<this.count;i++){

        description= contentIterator.iterateNext();
      }

        jeep = description.textContent || "wtf";

        this.controller.get('content').update(jeep);


}
FirstAssistant.prototype.failure = function(event) {
  this.controller.get('content').update('failure');
}

