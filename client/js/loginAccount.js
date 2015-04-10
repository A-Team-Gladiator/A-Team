/**
 * Created by SOHEB.RAPATI on 08-04-2015.
 */
Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'first-name',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    }, {
        fieldName: 'last-name',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    },
    /*{
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false
    }*/]
});

accountsUIBootstrap3.logoutCallback = function(error) {
    //if(error) console.log("Error:" + error);
<<<<<<< HEAD



    Router.go('home');
=======
    //Router.go('imageSlider');
    Router.route('home', {name: 'home'});
>>>>>>> 81d6b8838fdbae0f78d2113940061eff4a8005a9
    Session.set('selectedPlayer','');

}