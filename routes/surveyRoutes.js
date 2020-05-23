const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const sendMail = require('../services/sendMail');
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    // get all surveys created by the current user, without the recipients field
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (_req, res) => {
    res.send('Thanks for voting!'); // what the user sees after clicking any link in an email survey
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map(({ email, url }) => {
        // match will be { survey, choice } if the pathname is well-formed, and null if not
        const match = p.test(new URL(url).pathname);
        if (match) return { ...match, email }; // return the matched object + the email, or undefined
      })
      .compact() // removes undefined
      .uniqBy('email', 'surveyId') // removes duplicate events by checking both email and surveyId properties
      .each(({ choice, email, surveyId }) => {
        // for each event, update our Mongo database
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false } // finds the matching survey
            }
          },
          {
            $inc: { [choice]: 1 }, // increment either yes/no by 1
            $set: { 'recipients.$.responded': true }, // says the recipients have responded, so we don't update again
            lastResponded: new Date()
          }
        ).exec(); // execute the query
      })
      .value();
    res.send({}); // optional: SendGrid doesn't really care if we respond or not b/c it's a webhook
  });

  // need to be logged in and have at least one credit to send a survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body; // deconstruct fields off of body
    // create a new Survey model
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date().now
    });

    try {
      await sendMail(survey); // email the survey
      await survey.save(); // save it to Mongo
      req.user.credits -= 1;
      const updatedUser = await req.user.save(); // update user

      res.send(updatedUser);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
