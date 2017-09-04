const ECT = require('ect')({ root : __dirname + '/templates', ext : '.ect' })

const apiKey = 'key-93063d51b87e2e98f6a973e7aae85ae2';
const domain = 'dev5.io';
const mailgun = require('mailgun-js')({ apiKey, domain });

function sendEmail(template, form) {
  return new Promise((resolve, reject) => {

    ECT.render(template, { name: form.name, message: form.message }, (err, finalHtml) => {
      if (err) console.log("error",err , form)
      if (err) reject(err);
      const bcc = 'hello@dev5.io'
      const data = {
        from: 'dev5 <hello@dev5.io>',
        to: `${form.name} <${form.email}>`,
        bcc,
        subject: 'Thank you for contacting us',
        text: "finalHtml",
      };
      mailgun.messages().send(data, (error, body) => {
        if (error) console.log('error 2',  error, body)
        if (error) return reject(error);
        resolve(body);
      });
    });
  });
}

function contacto(form) {
  return sendEmail('contacto', form)
}

/* ======= Agrega Lead a PipeDrive ======= */



module.exports =contacto
