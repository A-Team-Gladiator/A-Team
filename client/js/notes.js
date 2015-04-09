/**
 * Created by SOHEB.RAPATI on 08-04-2015.
 */

Session.setDefault('noteMode','addNote');
Session.setDefault('noteId', '');

Meteor.subscribe('noteList');

Template.notes.events({
    'click .btnSaveNote': function () {
        var nTit = $('#noteTitle')[0].value;
        var nDet = $('textarea#noteDetails').editable("getHTML", true, true); //$('#noteDetails')[0].value;
        Meteor.call('addNote', Session.get('noteMode'), Session.get('noteId'), nTit, nDet, function (error, response) {
            if (error) {
                console.log('ERROR :', error);
            } else {
                console.log('response:', response);
            }
            $('#noteTitle')[0].value = "";
            $('textarea#noteDetails').editable("setHTML", "", false);
            Session.set('noteMode','addNote');
            Session.set('noteId', '');
        });
    },

    'click .btnCreateNote': function(){
        $('#noteTitle')[0].value = "";
        $('textarea#noteDetails').editable("setHTML", "", false);
        Session.set('noteMode','addNote');
        Session.set('noteId', '');
        $('#noteTitle').focus();
    },

    'click .btnSaveTag': function () {
        var tagName = $('#txtTag')[0].value;
    }


});