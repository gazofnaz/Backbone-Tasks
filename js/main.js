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

});

// Collection
App.Collections.Tasks = Backbone.Collection.extend(
    { 
        model: App.Models.Task
});

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

    render: function(){
        this.$el.html( this.model.get( 'title' ) );
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

$('.tasks').html( tasksView.render().el )

})();