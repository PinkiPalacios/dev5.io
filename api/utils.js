const ECT = require('ect')({ root : __dirname + '/templates', ext : '.ect' })

const apiKey = 'key-93063d51b87e2e98f6a973e7aae85ae2';
const domain = 'dev5.io';
const mailgun = require('mailgun-js')({ apiKey, domain });

function sendEmail (form){
var data = {
  from: 'dev5 <hello@dev5.io>',
  to: form.email,
  subject: 'Thank you for contacting us'
  text: 'Testing some Mailgun awesomness!'
};

mailgun.messages().send(data, function (error, body) {
    if (error) console.log(error)
   if (error) return reject(error);
  console.log(body);
});
}


// function sendEmail(template, form) {
//   return new Promise((resolve, reject) => {
//     ECT.render(template, { name: form.name, message: form.message }, (err, finalHtml) => {
//       if (err) reject(err);
//       const data = {
//         from: 'dev5 <hello@dev5.io>',
//         to: `${form.name} <${form.email}>`,
//         subject: 'Thank you for contacting us',
//         text: "finalHtml",
//       };
//       mailgun.messages().send(data, (error, body) => {
//         if (error) return reject(error);
//         resolve(body);
//       });
//     });
//   });
// }

function contacto(form) {
  return sendEmail('contacto', form)
}

/* ======= Agrega Lead a PipeDrive ======= */



module.exports =contacto
