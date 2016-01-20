<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {

	Route::get('/', 'HomeController@index');

	Route::get('/course/{course}' , 'CourseController@showCourse');
    
    Route::group(['middleware' => 'guest'], function () {

		Route::get( '/users/login', function() {
    		return view( 'usersLogin' );
		});

		Route::post('/login', 'UserController@login');

	});

	Route::group(['middleware' => 'auth'], function () {

		Route::get('/users/logout', 'UserController@logout');
		
	});
});
