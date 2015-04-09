/**
 * Created by SOHEB.RAPATI on 10-04-2015.
 */

Meteor.subscribe('tagList');

Template.tags.helpers({
    getTags: function () {
        var noteId = Session.get('noteId');
        return tagList.find({NoteId: noteId}, {sort: {TagName: 1}});
    },

    'CreatedDate': function () {
        var me = this;
        return me.CreatedDate.toDateString();
    }
});

Template.tags.events({
    'submit form': function(event){
        event.preventDefault();
        var tagName = event.target.tagName.value;

        Meteor.call('addTag',tagName, Session.get('noteId'));
    }
});