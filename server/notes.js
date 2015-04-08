/**
 * Created by SOHEB.RAPATI on 08-04-2015.
 */

Meteor.publish('noteList', function(){
    var currentUserId = this.userId;
    return noteList.find({CreatedBy: currentUserId});
});

Meteor.methods({
    'addNotes': function( type, noteTitle, noteDetails ){
        var currentUserId = Meteor.userId();
        if(type == 'add') {
            noteList.insert({
                NoteTitle: noteTitle,
                NoteDetails: noteDetails,
                CreatedBy: currentUserId,
                CreatedDate: new Date(),
                LastUpdated: new Date()
            });
        }else{
            //PlayersList.update(selectedPlayer, {$set: {
            //    NoteTitle: noteTitle, NoteDetails: noteDetails, LastUpdated: new Date()}
            //});
        }
    },

    'removePlayer': function (selectedPlayer) {
        PlayersList.remove(selectedPlayer);
    },

    'modifyScore': function(selectedPlayer, score){
        PlayersList.update(selectedPlayer, {$inc: {score: score} });
    }
});


