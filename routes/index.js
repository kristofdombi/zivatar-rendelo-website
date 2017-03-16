const express = require('express');
const router = express.Router();
const data = require('../data.json');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Zivatar rendelő',
    menu: data.hu.menu,
    home: '/',
    isEnglish: false,
    services: data.hu.services,
    switchLanguage: {
      url: '/en',
      value: 'English'
    }
  });
});

router.get('/szolgaltatasaink', function(req, res){
  res.render('services', {
    title: 'Szolgáltatásaink | Zivatar',
    menu: data.hu.menu,
    home: '/',
    isEnglish: false,
    services: data.hu.services,
    switchLanguage: {
      url: '/en',
      value: 'English'
    }
  });
});

router.get('/szolgaltatasaink/:service', function(req, res, next) {

  let services = data.hu.services;
  let requestedService = req.params.service;
  let selectedService;
  let otherServices;

  const newSelectedService = services.filter(service =>
    service.id === requestedService
  );

  otherServices = services.filter(service =>
    service.id !== requestedService
  );

  for (var i = 0; i < services.length; i++) {
    if (requestedService === services[i].id) {
      selectedService = services[i];
    }
  }

  console.log('--------------------------');
  console.log(newSelectedService);
  console.log('--------------------------');
  console.log(selectedService);
  console.log('--------------------------');

  if (selectedService && selectedService !== undefined) {
    res.render('service-description', {
      title: `${selectedService.name} | Szolgáltatásaink`,
      menu: data.hu.menu,
      home: '/',
      isEnglish: false,
      service: selectedService,
      otherServices: otherServices,
      switchLanguage: {
        url: '/en',
        value: 'English'
      }
    });
  } else {
    next(
      new Error('Invalid URL'),
      res.status(404),
      res.render('404')
    );
  }

});

router.get('/munkatarsaink', function(req, res){
  res.render('colleagues', {
    title: 'Munkatársaink | Zivatar',
    menu: data.hu.menu,
    home: '/',
    isEnglish: false,
    switchLanguage: {
      url: '/en',
      value: 'English'
    }
  });
});

router.get('/munkatarsaink/:colleague', function(req, res, next){

  var colleague = req.params.colleague;
  var selectedColleague;

  for (var i = 0; i < data.hu.colleagues.length; i++) {
    if (colleague === data.hu.colleagues[i].id) {
      selectedColleague = data.hu.colleagues[i];
    }
  }

  if (selectedColleague && selectedColleague !== undefined) {
    res.render('colleague-description', {
      title: `${selectedColleague.name} | Munkatársaink`,
      menu: data.hu.menu,
      home: '/',
      isEnglish: false,
      colleague: selectedColleague,
      services: data.hu.services,
      switchLanguage: {
        url: '/en',
        value: 'English'
      }
    });

  } else {
    next(
      new Error('Invalid URL'),
      res.status(404),
      res.render('404')
    );
  }
});

router.get('/elerhetosegeink', function(req, res){
  res.render('contact', {
    title: 'Elérhetőségeink | Zivatar',
    menu: data.hu.menu,
    home: '/',
    isEnglish: false,
    switchLanguage: {
      url: '/en',
      value: 'English'
    }
  });
});

module.exports = router;
