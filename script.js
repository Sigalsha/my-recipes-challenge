var RecipeApp = function () {

    var recipes = [
        { 
            id: 1,
            name: 'Best Chicken Soup!', 
            image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
            ingredients: [
                { name: 'whole chicken' },
                { name: 'medium carrots'},
                { name: 'onions' },
            ] 
        }
    ];

    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 0;

    var _findRecipeById = function (id) {
        for (var i = 0; i < recipes.length; i += 1) {
          if (recipes[i].id === id) {
            return recipes[i];
          }
        }
    };

    // var _findIngredientsById = function (id, ingredients) {
    //     for (var i = 1; i < ingredients.length; i += 1) {
    //       if (ingredients[i].id === id) {
    //         return ingredients[i];
    //       }
    //     }
    //   }

    var createRecipe = function(name, image){
        var recipe = {
            name: name,
            image: image, 
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId ++; 

        recipes.push(recipe);
    };

    var createIngredients = function(name, recID){
        //add code
        var ingredient = {
            name: name,
            id: ingId
        };

        ingId++ ;

        var recipeById = _findRecipeById(recID);
        recipeById.ingredients.push(ingredient);
    };    

    

    // var _getIngredientsHTML = function(recipe){
    //     var recipesHTML = "";

    //     //add code
    //     return recipesHTML;
    // };





    
    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();

        recipesObj = {recipes: recipes}
        var source = $('#recipe-template').html();
        var template = Handlebars.compile(source);
        var newHTML = template(recipesObj);
        $('.recipes').append(newHTML);


        // for(var i = 0; i < recipes.length; i ++){
        //     //current recipe in iteration
        //     var recipe = recipes[i];

        //     //return HTML for all ingredients
        //     var ingredients = _getIngredientsHTML(); //add code

        //     $recipes.append(
        //         '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' + 
        //             '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>' +
        //             '<img class="recipe-img" src="' + recipe.image + '"/>' +
        //             '<hr>' +
        //             '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
        //             '<div class="input-group mb-3">' +
        //                 '<div class="input-group-prepend">' +
        //                     '<span class="add-ingredients input-group-text" id="basic-addon3">Add Ingredients</span>' +
        //                 '</div>' + 
        //                 '<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">' +
                        
        //             '</div>' +
        //             '<ul class="ingredients">' + ingredients + '</ul>'+
        //         '</div>'
        //     );
        // }
    };

    return {
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients,
        recipes: recipes
    }
};

var app = RecipeApp();

app.renderRecipes();
//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function(){
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();

    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

$('.recipes').on('click', '.add-ingredients', function() {
    var recID = $(this).closest('.recipe').data("id");
    var name = $(this).closest('.recipe').find('.add-ingridient').val();
    var amount = $(this).closest('.recipe').find('.add-amount').val();
    
    app.createIngredients(name, recID);
    app.renderRecipes();
}); 

$('.recipes').on('click', '.add-amount', function() {
    var recID = $(this).closest('.recipe').data("id");
    var amount = $(this).closest('.recipe').find('.add-amount').val();
    
    app.createIngredients(amount, recID);
    app.renderRecipes();
}); 
// var $clickedPost = $(this).closest('.post');
// var postID = $(this).closest('.post').data("id");
// var commentsLi = $clickedPost.find('li');
// var commentID = commentsLi.data("id");