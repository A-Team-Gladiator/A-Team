/**
 * Created by SOHEB.RAPATI on 08-04-2015.
 */

Session.setDefault('noteMode','addNote');
Session.setDefault('noteId', '');

Meteor.subscribe('noteList');

Template.notes.events({
    'click .btnSaveNote': function () {
        var objHistory= new clsHistory();

        var nTit = $('#noteTitle')[0].value;
        var nDet = $('textarea#noteDetails').editable("getHTML", true, true); //$('#noteDetails')[0].value;
        Meteor.call('addNote', Session.get('noteMode'), Session.get('noteId'), nTit, nDet, function (error, response) {
            if (error) {
                console.log('ERROR :', error);
            } else {
                console.log('response:', response);

                //add History  for Update if NoteId exist in session else create history for insert
                if(Session.get('noteId')!="")
                {
                    objHistory.createHistoryForNote(Session.get('noteId'),Status.Update, nTit, nDet)
                }
                else
                {
                    objHistory.createHistoryForNote(response,Status.Insert, nTit, nDet)
                }
            }
            $('#noteTitle')[0].value = "";
            $('textarea#noteDetails').editable("setHTML", "", false);

            Session.set('noteMode','addNote');
            Session.set('noteId', '');

            Session.set('oldTitle','');
            Session.set('oldNoteDetails', '');
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