process.env.NODE_ENV = process.env.NODE_ENV || 'TEST';
var db = require('../api/db.js');

describe("Test Pages", function() {

  beforeEach(function() {
    db.serialize(function() {
      db.run('DELETE FROM urls');
    });
  });

  var ROOT = "http://localhost:7777/#";

  function createUrlEntry(title, url) {
    browser.get(ROOT + "/new");
    element(by.model('formCtrl.form.title')).sendKeys(title);
    element(by.model('formCtrl.form.url')).sendKeys(url);
    return element(by.css('input[type=submit]')).click();
  }

  // it('should have no listings on the index page and show a special message', function() {
  //   browser.get(ROOT + "/");
  //   expect(element.all(by.css('.url-listing')).count()).toBe(0);

  //   expect(element.all(by.css('.empty-url-listing')).count()).toBe(1);
  //   expect(element(by.css('.empty-url-listing')).getText()).toMatch(/no URL listings/);
  // });

  // it('should create a new URL listing', function() {
  //   var customTitle = 'title-' + Math.random();
  //   var customUrl = 'http://my-new-website.com/' + Math.random();

  //   createUrlEntry(customTitle, customUrl).then(function() {
  //     browser.getLocationAbsUrl().then(function(url) {
  //       expect(url).toMatch(/#\/urls/);
  //       expect(element.all(by.css('.url-listing')).count()).toBe(1);

  //       expect(element(by.css('.url-listing .listing-title')).getText()).toContain(customTitle);
  //       expect(element(by.css('.url-listing .listing-url')).getText()).toContain(customUrl);

  //       expect(element.all(by.css('.empty-url-listing')).count()).toBe(0);
  //     });
  //   });
  // });

  // it('should search based off of the URL', function() {
  //   createUrlEntry("url one", "http://url-one.com")
  //   createUrlEntry("url two", "http://url-two.com");
  //   createUrlEntry("url three", "http://url-three.com");

  //   browser.get(ROOT + "/");
  //   expect(element.all(by.css('.url-listing')).count()).toBe(3);

  //   browser.get(ROOT + "/?q=one");
  //   expect(element.all(by.css('.url-listing')).count()).toBe(1);

  //   browser.get(ROOT + "/?q=x");
  //   expect(element.all(by.css('.url-listing')).count()).toBe(0);
  // });

//1. create one entry, 
//2. click edit button, 
//3. check the page is edit page and check the content of the form
  it('should show edit form when edit button is clicked',function(){
    var customTitle = 'title-' + Math.random();
    var customUrl = 'http://my-new-website.com/' + Math.random();

    createUrlEntry(customTitle, customUrl);
    element(by.css('.listing-actions .btn-primary')).click();
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toMatch(/#\/edit/);
      expect(element(by.model('formCtrl.form.title')).getAttribute('value')).toBe(customTitle);
      expect(element(by.model('formCtrl.form.url')).getAttribute('value')).toBe(customUrl);
    });

  });

//1. create one entry 
//2. click delete button, 
//3. check the page is url page and it shows empty string
it('shoud show empty listing message when the url entry is deleted',function(){
  var customTitle = 'title-' + Math.random();
  var customUrl = 'http://my-new-website.com/' + Math.random();

    createUrlEntry(customTitle, customUrl);
    element(by.css('.listing-actions .btn-danger')).click();
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toMatch(/#\/urls/);
      expect(element.all(by.css('.empty-url-listing')).count()).toBe(1);
      expect(element.all(by.css('.url-listing')).count()).toBe(0);
    });
});

});
