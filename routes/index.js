var express = require('express');
var router = express.Router();
var data = require('../data.json');

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

  var service = req.params.service;
  var selectedService;
  var selectedServiceIndex;
  var otherServices;

  for (var i = 0; i < data.hu.services.length; i++) {
    if (service === data.hu.services[i].id) {
      selectedService = data.hu.services[i];
      selectedServiceIndex = i;
    }
  }

  if (selectedServiceIndex === 0) {
    otherServices = data.hu.services.slice(selectedServiceIndex + 1, data.hu.services.length);
  } else if (selectedServiceIndex !== 0 && selectedServiceIndex !== data.hu.services.length - 1) {
    var firstHalf = data.hu.services.slice(0, selectedServiceIndex);
    var otherHalf = data.hu.services.slice(selectedServiceIndex + 1, data.hu.services.length);
    otherServices = firstHalf.concat(otherHalf);
  } else if (selectedServiceIndex === data.hu.services.length - 1) {
    otherServices = data.hu.services.slice(0, selectedServiceIndex);
  }

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
