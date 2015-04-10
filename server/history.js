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
            console.log(history.count());
            history.fetch()[0].HistoryData.push(historyData);

            historyList.update({_id: history.fetch()[0]._id}, {$set: {NoteId: noteId, HistoryData: history.fetch()[0].HistoryData} });
        }
        else
        {
            var arr=[]
            arr.push(historyData)
            historyList.insert({
                NoteId: noteId,
                HistoryData: arr
            });

        }
    }

});



