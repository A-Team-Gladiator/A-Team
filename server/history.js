/**
 * Created by sumit on 4/9/2015.
 */

Meteor.publish('historyList', function(){
    return historyList.find();
});

Meteor.methods({
    'addHistory': function( noteId, historyData ){

        var history = historyList.find({NoteId: noteId});

        if(history.count()>0){
            history.HistoryData.push(historyData);
            historyList.update(history.historyId, {$inc: {NoteId: noteId, HistoryData: history.HistoryData} });
        }
        else
        {
            historyList.insert({
                NoteId: noteId,
                HistoryData: historyData
            });

        }
    }

});



