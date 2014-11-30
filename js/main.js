(function(){
    
window.App = {
    Models: {},
    Collections: {},
    Views: {}
};

// helper method to render templates
window.template = function( id ){
    return _.template( $( '#' + id ).html() );
};

// Model
App.Models.Task = Backbone.Model.extend({
    validate: function( attrs ){
        if( ! $.trim( attrs.title ) ){
            return 'A task requires a valid title';
        }
    }
});

// Collection
App.Collections.Tasks = Backbone.Collection.extend( {model: App.Models.Task} );

// Views Plural
App.Views.Tasks = Backbone.View.extend({

    tagName: 'ul',

    render: function(){
        this.collection.each( this.addOne, this );
        return this;
    },

    addOne: function( task ){
        taskView = new App.Views.Task({ model: task } );
        this.$el.append( taskView.render().el );
    }

});

// View Single
App.Views.Task = Backbone.View.extend({

    tagName: 'li',

    template: template( 'taskTemplate' ),

    events: {
        'click .edit': 'editTask',
        'click .delete': 'destroyTask'
    },

    initialize: function(){

        this.model.on( 'change', this.render, this );
        this.model.on( 'destroy', this.remove, this );

    },

    editTask: function(){

        var newTaskTitle = prompt( 'What would you like to change the text to?', this.model.get( 'title' ) );

        if( !newTaskTitle ) return;

        this.model.set( 'title', newTaskTitle, { validate: true } );
    },

    destroyTask: function(){
        this.model.destroy();
    },

    // better to use events to track removal - accounts for db failures as it waits for confirmation.
    remove: function(){
        this.$el.remove();
    },

    render: function(){
        var template = this.template( this.model.toJSON() );
        this.$el.html( template );
        return this;
    }

});

var task = new App.Collections.Tasks([
    {
        title: 'Go to the Store',
        priority: 4
    },
    {
        title: 'Go to the Mall',
        priority: 2
    },
    {
        title: 'Go to the Bed',
        priority: 1
    }
]);

var tasksView = new App.Views.Tasks({ collection: task });

$( '.tasks' ).html( tasksView.render().el )

})();