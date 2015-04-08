/**
 * Created by SOHEB.RAPATI on 08-04-2015.
 */

Meteor.subscribe('noteList');

Template.centerList.helpers({
    getNotes: function () {
        var currentUserId = Meteor.userId();
        return noteList.find({}, {sort: {NoteTitle: 1}});
    }
});

Template.notes.events({
    'click .btnNoteSave': function () {
        //var me=this;
        Meteor.call('addNotes', 'add', $('#noteTitle')[0].value, $('#noteDetails')[0].value);
    }
});