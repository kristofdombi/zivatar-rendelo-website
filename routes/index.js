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

  const services = data.hu.services;
  const requestedService = req.params.service;
  let selectedService;
  let otherServices;

  selectedService = services.filter(service =>
    service.id === requestedService
  )[0];

  otherServices = services.filter(service =>
    service.id !== requestedService
  );

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

  const colleagues = data.hu.colleagues;
  const requestedColleague = req.params.colleague;
  let selectedColleague;

  selectedColleague = colleagues.filter(colleague =>
    colleague.id === requestedColleague
  )[0];

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
