const express = require('express');
const router = express.Router();
const data = require('../data.json');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('index-en', {
    title: 'Zivatar',
    menu: data.en.menu,
    home: '/en',
    isEnglish: true,
    services: data.en.services,
    switchLanguage: {
      url: '/',
      value: 'Magyar'
    }
  });
});

router.get('/services', function(req, res){
  res.render('services-en', {
    menu: data.en.menu,
    title: 'Services | Zivatar',
    home: '/en',
    isEnglish: true,
    services: data.en.services,
    switchLanguage: {
      url: '/',
      value: 'Magyar'
    }
  });
});

router.get('/services/:service', function(req, res, next) {
  const services = data.en.services;
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
    res.render('service-description-en', {
      title: `${selectedService.name} | Services`,
      menu: data.en.menu,
      home: '/en',
      otherServices: otherServices,
      service: selectedService,
      isEnglish: true,
      switchLanguage: {
        url: '/',
        value: 'Magyar'
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

router.get('/colleagues', function(req, res){
  res.render('colleagues-en', {
    menu: data.en.menu,
    title: 'Colleagues | Zivatar',
    home: '/en',
    switchLanguage: {
      url: '/',
      value: 'Magyar'
    }
  });
});

router.get('/colleagues/:colleague', function(req, res, next){

  const colleagues = data.en.colleagues;
  const requestedColleague = req.params.colleague;
  let selectedColleague;

  selectedColleague = colleagues.filter(colleague =>
    colleague.id === requestedColleague
  )[0];

  if (selectedColleague && selectedColleague !== undefined) {
    res.render('colleague-description-en', {
      title: `${selectedColleague.name} | Colleagues`,
      menu: data.en.menu,
      home: '/en',
      isEnglish: true,
      colleague: selectedColleague,
      services: data.en.services,
      switchLanguage: {
        url: '/',
        value: 'Magyar'
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


router.get('/contact', function(req, res){
  res.render('contact-en', {
    menu: data.en.menu,
    title: 'Contact | Zivatar',
    home: '/en',
    switchLanguage: {
      url: '/',
      value: 'Magyar'
    }
  });
});

module.exports = router;
