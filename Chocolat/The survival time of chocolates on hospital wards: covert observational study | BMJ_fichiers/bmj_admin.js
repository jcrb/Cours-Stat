Drupal.behaviors.bmjAdminEdit = function (context){
  $('a.bmj-edit-modalframe').click(function (e){

    function bmjAdminEditSubmitAction(args, statusMessages) {
      if (args.message) {
        setTimeout(function() { alert(args.message); }, 500);
        if (args.alert_id){
          $('.alert-id-'+args.alert_id).fadeOut();
        }
      }
        // Provide a simple feedback alert deferred a little.
      if (args.alert_id){
        if (args.op == 'delete'){
          $('.alert-id-'+args.alert_id).fadeOut();
        }
        if (args.op == 'edit'){
          $('.alert-id-'+args.alert_id+' div.first p').text(args.text);
        }
      }
    }


    var element = this;
    e.preventDefault();

    var modalOptions = {
      url: $(this).attr('href'),
      autoFit: true,
      onSubmit: bmjAdminEditSubmitAction
    };

    var regExp = /^.*bmj-edit-size\[\s*([0-9]*\s*,\s*[0-9]*)\s*\].*$/;
    if (typeof element.className == 'string' && regExp.test(element.className)) {
      var size = element.className.replace(regExp, '$1').split(',');
      modalOptions.width = parseInt(size[0].replace(/ /g, ''));
      modalOptions.height = parseInt(size[1].replace(/ /g, ''));
    }

    Drupal.modalFrame.open(modalOptions);
  });
}
