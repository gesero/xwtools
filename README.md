# xwtools.js

> The JS library for sending web form and web calls to lirax.net (Phone Cloud System)


## Download

[Full build](https://cdn.jsdelivr.net/npm/xwtools@latest/dist/xwtools.js)


## Installation

In a browser:
```html
<script src="dist/xwtools.js"></script>
```

CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/xwtools@latest/dist/xwtools.js"></script>
```

Using npm:
```shell
npm install xwtools --save
```

## Usage

### Initialization

ES6 
```js
import tools from 'xwtools';
```

### Base markup web phone
add class from targetClass (see below) to buttons and link inside it (if needed)

```js
<button type="submit" class="waves-effect waves-light btn lirax-make-call">Make Call</button>
```

### Base markup web form
add class from targetClass (see below) to form and link inside it (if needed)
input filds with attribute name = 'name' and attribute name = 'phone' are required
name must be more then 3 letters
phone must be more then 8 digits

```js
<form class="col s12 lirax-custom-form">
  <div class="row">
    <div class="input-field col s12">
      <input id="name" type="text" name="name" class="validate" value="">
      <label for="name">Name</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input id="phone" type="tel" name="phone" class="validate" value="">
      <label for="phone">Phone</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input id="lirax_pipeline_status_id" type="text" name="lirax_pipeline_status_id" class="validate" value="">
      <label for="lirax_pipeline_status_id">lirax_pipeline_status_id</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input id="lirax_deal_name" type="text" name="lirax_deal_name" class="validate" value="">
      <label for="lirax_deal_name">lirax_deal_name</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input id="lirax_deal_sum" type="text" name="lirax_deal_sum" class="validate" value="">
      <label for="lirax_deal_sum">lirax_deal_sum</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input id="lirax_deal_task" type="text" name="lirax_deal_task" class="validate" value="">
      <label for="lirax_deal_task">lirax_deal_task</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input id="lirax_deal_tag" type="text" name="lirax_deal_tag" class="validate" value="">
      <label for="lirax_deal_tag">lirax_deal_tag</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input id="lirax_contact_task" type="text" name="lirax_contact_task" class="validate" value="">
      <label for="lirax_contact_task">lirax_contact_task</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input id="lirax_contact_tag" type="text" name="lirax_contact_tag" class="validate" value="">
      <label for="lirax_contact_tag">lirax_contact_tag</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" class="datepicker" name="date">
      <label for="phone">Date</label>
    </div>
  </div>
  <div class="row">
     <div class="input-field col s12">
                <select>
                  <option value="" disabled selected>Choose your option</option>
                  <option selected value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                </select>
                <label>Materialize Select</label>
              </div>
  </div>
  <div class="row">
    <div class="col s12">
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label for="checkbox">Red</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
            <button type="submit" class="waves-effect waves-light btn"><i class="material-icons left">send</i>Send</button>
    </div>
    <div class="input-field col s12">
        <a href="#" class="button lirax-custom-form">send</a>
    </div>
  </div>
</form>
```
### Base markup web call
add class from targetClass (see below) to form and link inside it (if needed)
input filds with attribute name = 'phone' is required
phone must be more then 8 digits

```js
<form class="col s12 lirax-custom-callback-form">
  <div class="row">
    <div class="input-field col s12">
      <input id="phone" type="tel" name="phone" class="validate" value="">
      <label for="phone">Phone</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
            <button type="submit" class="waves-effect waves-light btn"><i class="material-icons left">send</i>Book the call</button>
    </div>
    <div class="input-field col s12">
        <a href="#" class="button lirax-custom-callback-form">Book</a>
    </div>
  </div>
</form>
```

### Base usage
widgetId, targetClass, scriptUrl are required
if prefix is empty, last 9 digits will be sent
if prefix is not empty, phone will be sent by mask: prefix+last 9 digits

```js
var tool = new xwtools();  
tool.liraxWebPhoneInit({
  widgetId: "",
  targetClass: "lirax-make-call",
  scriptUrl: ""
});
tool.liraxWebFormInit({
  widgetId: "",
  targetClass: "lirax-custom-form",
  scriptUrl: "",
  prefix: '+380',
  infoMessage: 'Message from web site: ',  //for chat dialog
  successMessage: 'Data sent successfully!',
  errorMessage: 'Data sent error!',
  nameError: 'must be not empty and more then 3 letters',
  phoneError: 'must be not empty and more then 8 digits',
  onSubmit: function() {
    console.log('submit');
  },
  onSuccess: function() {
    console.log('success');
  },
  onError: function() {
    console.log('error');
  }
});
tool.liraxWebCallInit({
  widgetId: "",
  targetClass: "lirax-custom-callback-form",
  scriptUrl: "",
  prefix: '+380',
  successMessage: 'Data sent successfully!',
  errorMessage: 'Data sent error!',
  phoneError: 'must be not empty and more then 8 digits',
  onSubmit: function() {
    console.log('submit');
  },
  onSuccess: function() {
    console.log('success');
  },
  onError: function() {
    console.log('error');
  }
});

```

## Official Site

[http://www.lirax.net](http://www.lirax.net)