/**
 * Created by SOHEB.RAPATI on 08-04-2015.
 */

Meteor.publish('noteList', function(){
    var currentUserId = this.userId;
    return noteList.find({CreatedBy: currentUserId});
});

Meteor.methods({
    'addNote': function( type, noteId, noteTitle, noteDetails ){
        var currentUserId = Meteor.userId();
        if(type == 'addNote') {
          var ret =  noteList.insert({
                NoteTitle: noteTitle,
                NoteDetails: noteDetails,
                CreatedBy: currentUserId,
                CreatedDate: new Date(),
                LastUpdated: new Date()
            });
            return ret;
        }else{
            noteList.update(noteId, {$set: {
                NoteTitle: noteTitle, NoteDetails: noteDetails, LastUpdated: new Date()}
            });

        }
    },

    'removeNote': function (noteId) {
        noteList.remove(noteId);
    }
});


