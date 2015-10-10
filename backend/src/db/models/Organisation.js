var Bookshelf = require('../');
var uuid = require('node-uuid');
var User = require('./User');
var OrganisationUser = require('./OrganisationUser');
var ProjectUser = require('./ProjectUser');
var Project = require('./Project');

var Organisation = Bookshelf.model('Organisation', {
    tableName: 'organisation',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    hidden: [ ],
    virtuals: {
    },

    // On creation, set uuid
    initialize: function(params) {
        this.on('saving', this._generateUUID);
    },

    _generateUUID: function (model, attrs, options) {
        if (model.isNew()) {
            model.set('uuid', uuid.v4());
        }
    },

    owner: function () {
        return this.belongsTo('User');
    },
    created_by: function() {
        return this.belongsTo('User');
    },
    projects: function () {
        return this.hasMany('Project');
    },
    users: function () {
        return this.belongsToMany('User', 'organisation_user', 'user_id');
    }
});

module.exports = Organisation;
