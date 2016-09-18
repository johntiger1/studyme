/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample shows how to create a Lambda function for handling Alexa Skill requests that:
 *
 * - Custom slot type: demonstrates using custom slot types to handle a finite set of known values
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Minecraft Helper how to make paper."
 *  Alexa: "(reads back recipe for paper)"
 */

'use strict';

var currSubject = null;
//var Firebase = require("firebase");
//var myFirebaseRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/"); 

var AlexaSkill = require('./AlexaSkill');

var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

/** amzn1.echo-sdk-ams.app.
/**amzn1.ask.skill.da975cb8-7007-458a-b512-926f36696b4a

 * MinecraftHelper is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var HowTo = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HowTo.prototype = Object.create(AlexaSkill.prototype);
HowTo.prototype.constructor = HowTo;

HowTo.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to Project Mom";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

HowTo.prototype.intentHandlers = {
    //we can have multiple intents here, each with different intent.slots
    
    /*
    "StartStudying": function(intent, session, response){
        itemSlot.value.toLowerCase()
        var subjectName = intent.slots.subject.value.toLowerCase();
        speechOutput = {
                speech: "The subject is" + subjectName,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            //response.tellWithCard("speechOutput", "hard code", "hard code");
            response.tellWithCard(speechOutput, "hard code", "hard code");

    },*/

    "StartStudying": function(intent, session, response){
        var subjectName = intent.slots.subject.value.toLowerCase();
        currSubject = subjectName;
        var speechOutput = {
                speech: "The subject is " + subjectName,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            var repromptOutput = {
                speech: "                                       a ",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            //var total = {speech:"how long will i wait", type: AlexaSkill.speechOutputType.PLAIN_TEXT};
            
            //the solution is to simply use ssml and wait for a long time
            //response.say("OK, i will wait");
            response.ask(speechOutput, repromptOutput);
            
            //response.tellWithCard(speechOutput, "hard code", "hard code");

            //we should also create an associative array so that we know how many 
            //hours per each subject

            //we could also just have a currently studying variable
    },

    "StopStudying": function(intent, session, response){
        var speechOutput = {
                speech: "OK, you can stop studying " + currSubject,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            var repromptOutput = {
                speech: " OK ",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };



            /*
            "outputSpeech": {
    "type": "SSML",
    "ssml": "<speak>This output speech uses SSML.</speak>"
}

            <speak>
    There is a three second pause here <break time="3s"/> 
    then the speech continues.
</speak>
            */

            response.ask(speechOutput, repromptOutput);

    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions such as, what's the recipe, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, what's the recipe, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var howTo = new HowTo();
    howTo.execute(event, context);
};
