var express = require('express');
var router = express.Router();
var data = require('../data.json');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('index-en', {
    title: 'Zivatar',
    menu: data.en.menu,
    home: '/en',
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
  var service = req.params.service;
  var selectedService;
  var selectedServiceIndex;
  var otherServices;

  for (var i = 0; i < data.en.services.length; i++) {
    if (service === data.en.services[i].id) {
      selectedService = data.en.services[i];
      selectedServiceIndex = i;
    }
  }

  if (selectedServiceIndex === 0) {
    otherServices = data.en.services.slice(selectedServiceIndex + 1, data.en.services.length);
  } else if (selectedServiceIndex !== 0 && selectedServiceIndex !== data.en.services.length - 1) {
    var firstHalf = data.en.services.slice(0, selectedServiceIndex);
    var otherHalf = data.en.services.slice(selectedServiceIndex + 1, data.en.services.length);
    otherServices = firstHalf.concat(otherHalf);
  } else if (selectedServiceIndex === data.en.services.length - 1) {
    otherServices = data.en.services.slice(0, selectedServiceIndex);
  }

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

  var colleague = req.params.colleague;
  var selectedColleague;

  for (var i = 0; i < data.en.colleagues.length; i++) {
    if (colleague === data.en.colleagues[i].id) {
      selectedColleague = data.en.colleagues[i];
    }
  }

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
