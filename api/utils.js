const ECT = require('ect')({ root : __dirname + '/templates', ext : '.ect' })
const Pipedrive = require('pipedrive');

const pipedrive = new Pipedrive.Client('1192dd31dd4f4d08ce93cdbead2ad396f610d607');
const apiKey = 'key-223e5070502ee318dc3feddbc93878d7';
const domain = 'mg.plataforma5.la';
const mailgun = require('mailgun-js')({ apiKey, domain });

function sendEmail(template, form) {
  return new Promise((resolve, reject) => {
    if (!form.curso) return reject('No es un curso válido');
    const bcc = 'contacto@plataforma5.la' + (form.curso === 'Curso Introductorio - Tucumán' ? ', matiassosas@gmail.com' : '');
    ECT.render(template, { nombre: form.nombre, curso: form.curso, consulta: form.consulta }, (err, finalHtml) => {
      if (err) reject(err);
      const data = {
        from: 'Plataforma 5 <contacto@plataforma5.la>',
        to: `${form.nombre} <${form.email}>`,
        bcc,
        subject: 'Gracias por Contactarte',
        html: finalHtml,
      };
      mailgun.messages().send(data, (error, body) => {
        if (error) return reject(error);
        resolve(body);
      });
    });
  });
}

/* ======= Agrega Lead a PipeDrive ======= */

function addPipedrive(form, pipeline) {
  let stageId;
  let value;

  switch (pipeline) {
    case 'intro':
      stageId = 1;
      value = 6500;
      break;
    case 'bootcamp':
      stageId = 12;
      value = 3900;
      break;
    case 'introTucuman':
      stageId = 25;
      value = 5500;
      break;
    default:
  }
  return new Promise((resolve, reject) => {
    pipedrive.Persons.add({
      name: form.nombre,
      email: form.email,
      phone: form.telefono,
    }, (err, person) => {
      if (err) reject(err);
      pipedrive.Deals.add(
        {
          title: `${form.nombre} Deal`,
          value,
          person_id: person.id,
          stage_id: stageId,
        }, (error, deals) => {
        if (error) return reject(error);
        return resolve(deals);
      });
    });
  });
}

function aplicar(form, pipeline) {
  switch (pipeline) {
    case 'intro':
      form.curso = 'Curso Introductorio';
      break;
    case 'bootcamp':
      form.curso = 'Coding Bootcamp';
      break;
    case 'introTucuman':
      form.curso = 'Curso Introductorio - Tucumán';
      break;
    default:
      form.curso = null;
  }
  return sendEmail('aplicar', form).then(addPipedrive(form, pipeline));
}

function contacto(form) {
  form.curso = 'cualquiera';
  return sendEmail('contacto', form).then(addPipedrive(form));
}

module.exports = {
  aplicar,
  contacto,
};