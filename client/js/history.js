/**
 * Created by sumit on 4/9/2015.
 */
var Status = {
    Insert: "Inserted",
    Update: "Updated",
    Delete: "deleted"

};
var Type = {
    Note: "Note",
    Tag: "Tag",
    Group: "Group",
    Share: "Share"

};
var clsHistory = function () {
    historyDataId: null;
    this.historyDetails = null;
    this.changedby = "";
    this.changedate = "";
    this.status = "";
}

Template.history.helpers({

    createHistoryForNote:function(noteId,status,title,noteDetails){
        var userId = Meteor.userId();
        var objHistoryData = new clsHistory();

        var randomNo = 1 + Math.floor(Math.random() * 6);
        var Id = 'history-' + randomNo + '-' + new Date().getTime();

        objHistoryData.historyData=Id;
        objHistoryData.changedBy = userId;
        objHistoryData.ChangeDate = new Date();
        objHistoryData.status = status;
        objHistoryData.type = Type.Note;
        objHistoryData.historyDetails={};
        if(status==Status.Insert)
        {
            objHistoryData.historyDetails.title=title;
            objHistoryData.historyDetails.noteDetails=noteDetails;
        }
        else if(status==Status.Update)
        {
            objHistoryData.historyDetails.oldtitle=Session.get('oldTitle');
            objHistoryData.historyDetails.newtitle=title;
            objHistoryData.historyDetails.oldNoteDetails=Session.get('oldNoteDetails');
            objHistoryData.historyDetails.newNoteDetails=noteDetails;
        }
        else if(status==Status.Delete)
        {
            objHistoryData.historyDetails.reason=title;
        }
        Meteor.call('addHistory', noteId , objHistoryData);
    },
    createHistoryForTag:function(noteId,tagId,status,tagName,details){
        var userId = Meteor.userId();
        var objHistoryData = new clsHistory();

        var randomNo = 1 + Math.floor(Math.random() * 6);
        var Id = 'history-' + randomNo + '-' + new Date().getTime();

        objHistoryData.historyData=Id;

        objHistoryData.changedBy = userId;
        objHistoryData.ChangeDate = new Date();
        objHistoryData.status = status;
        objHistoryData.type = Type.Tag;
        objHistoryData.historyDetails={};
        objHistoryData.historyDetails.tagId=tagId;

        if(status==Status.Insert)
        {
            objHistoryData.historyDetails.name=tagName;
        }
        else if(status==Status.Update)
        {
            objHistoryData.historyDetails.oldTagName=Session.get('oldTagName');
            objHistoryData.historyDetails.newTagName=tagName;
        }
        else if(status==Status.Delete)
        {
            objHistoryData.historyDetails.reason=details;
        }
        Meteor.call('addHistory', noteId , objHistoryData);
    },
    createHistoryForShare:function(noteId,shareId,status,shareWith){
        var userId = Meteor.userId();
        var objHistoryData = new clsHistory();

        var randomNo = 1 + Math.floor(Math.random() * 6);
        var Id = 'history-' + randomNo + '-' + new Date().getTime();

        objHistoryData.historyData=Id;

        objHistoryData.changedBy = userId;
        objHistoryData.ChangeDate = new Date();
        objHistoryData.status = status;
        objHistoryData.type = Type.Share;
        objHistoryData.historyDetails={};
        objHistoryData.historyDetails.shareId=shareId;

        if(status==Status.Insert)
        {
            objHistoryData.historyDetails.shareBy=userId;
            objHistoryData.historyDetails.shareWith=shareWith;
        }
        else if(status==Status.Delete)
        {
            objHistoryData.historyDetails.reason=details;
        }
        Meteor.call('addHistory', noteId , objHistoryData);
    },
    createHistoryForGroup:function(status,groupId,groupName,groupDescription){
        var userId = Meteor.userId();
        var objHistoryData = new clsHistory();

        var randomNo = 1 + Math.floor(Math.random() * 6);
        var Id = 'history-' + randomNo + '-' + new Date().getTime();

        objHistoryData.historyData=Id;
        objHistoryData.changedBy = userId;
        objHistoryData.ChangeDate = new Date();
        objHistoryData.status = status;
        objHistoryData.type = Type.Group;
        objHistoryData.historyDetails={};
        if(status==Status.Insert)
        {
            objHistoryData.historyDetails.groupName=groupName;
            objHistoryData.historyDetails.groupDescription=groupDescription;
        }
        else if(status==Status.Update)
        {
            objHistoryData.historyDetails.oldGroupName=Session.get('oldGroupName');
            objHistoryData.historyDetails.newGroupName=groupName;
            objHistoryData.historyDetails.oldGroupDescription=Session.get('groupDescription');
            objHistoryData.historyDetails.newGroupDescription=groupDescription;
        }
        else if(status==Status.Delete)
        {
            objHistoryData.historyDetails.reason=groupName;
        }

    }

})