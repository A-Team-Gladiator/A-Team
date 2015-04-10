/**
 * Created by SOHEB.RAPATI on 09-04-2015.
 */



Template.centerList.helpers({
    getNotes: function () {
        //var currentUserId = Meteor.userId();
        return noteList.find({}, {sort: {NoteTitle: 1}});
    },

    'CreatedDate': function () {
        var me = this;
        return me.CreatedDate.toDateString();
    }
});

Template.centerList.events({
    'click .deleteNote': function(){
        var noteId = this._id;

        var nTit = noteList.findOne(noteId).NoteTitle;
        var r = confirm("Are you sure you want delete \"" + nTit + "\"");
        if (r == true) {
            //PlayersList.remove(selectedPlayer);
            Meteor.call('removeNote', noteId, function (error, response) {
                if (error) {
                    console.log('ERROR :', error);
                } else {
                    var objHistory= new clsHistory();

                    //add History  for delete
                    objHistory.createHistoryForNote(noteId,Status.Delete, nTit)
                    console.log('response:', response);
                }
            });
        }
    },

    'click .editNote': function(){
        var noteId = this._id;
        var note = noteList.findOne(noteId);

        $('#noteTitle')[0].value = note.NoteTitle;
        $('textarea#noteDetails').editable("setHTML", note.NoteDetails, false);
        Session.set('noteMode','editNote');
        Session.set('noteId', noteId);

        Session.set('oldTitle', note.NoteTitle);
        Session.set('oldNoteDetails', note.NoteDetails);

        $('textarea#noteDetails').editable("focus");
        $('#noteTitle').focus();
    },
    'click .searchNote':function(){
        var strToSearch=$("#txtSearch")[0].value;
        var strParam="";

        if(strToSearch!="")
        {
            if($("#cmbSearch")[0].value=="By Tag")
            {
                strParam= strToSearch +"@@@"+"Tag";
            }
            else if($("#cmbSearch")[0].value=="By Notes")
            {
                strParam=strToSearch +"@@@"+"Note";
            }
        }
        if (noteSubscription != null) {
            noteSubscription.stop();
        }
        noteSubscription=  Meteor.subscribe('noteList',strParam);

    }
});