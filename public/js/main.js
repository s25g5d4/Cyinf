var department;
var oneUI;
var fourUI;
var searchURL;

function latestRefresh() 
{
    var data = 1;
    $.post( "refreshLatestAjax", data, function(result) {
        $("#refreshArea").html( result );
    } );
    //setTimeout( latestRefresh(), 15000 );
}

function logoChangeMouseOut() 
{
    $("#logo").attr( "src", "img/facing-white.png" );
}

function countDirect( $sec ) 
{
    setTimeout( "countDirect(" +sec+ ")", 1000 ); 
}

function toHome() 
{
    location.href = "search#slide-main";
}

function mobileOnclick( $target )
{
    location.href = $target;
}

function mLogoutAjax()
{
    var data = "";
    
    $.post( "logout", data, function() {
        
    });
}

function mloginAjax() 
{
    var data = $("#loginForm").serialize();

    $.post( "login", data, function(result) {
        if( result == "success" ) {
            $("#loginForm").empty();
            $("#loginForm").append( "Welcome Back<br />" );
        }
        else if ( result == "fail" ) {
            var message = '* Wrong Information. Try Again.';
            $("#loginMessage").html( message );
            $("#password").val('');
        }
    } ); 
}

function loginAjax() 
{
    var data = $("#loginForm").serialize();
    
    $.post( "/login", data, function(result) {
        if( result == "success" ) {
            $("#loginForm").empty();
            $("#loginForm").append( "<legend>Welcome Back</legend><br /><a href='#' onclick='toHome()'>點擊跳轉...</a>" );
        }
        else if ( result == "fail" ) {
            var message = '* Wrong Information. Try Again.';
            $("#loginMessage").html( message );
            $("#password").val('');
        }
    } ); 
}

function showNsysuForm()
{
    $("#registerForm").fadeIn();
    $("#forgetForm").fadeIn();
    $("#registerBack").fadeIn();
    $("#checkIdentity").hide();
}

function showTeacherForm()
{
    $("#teacherForm").fadeIn();
    $("#registerBack").fadeIn();
    $("#checkIdentity").hide();
}

function showOtherForm()
{
    $("#othersForm").fadeIn();
    $("#registerBack").fadeIn();
    $("#checkIdentity").hide();
}

function registerBack()
{
    $("#registerForm").hide();
    $("#teacherForm").hide();
    $("#othersForm").hide();
    $("#forgetForm").hide();
    $("#checkIdentity").fadeIn();
    $("#registerBack").hide();
}

function registerAjax( $register ) 
{
    $("#registerBtn").attr("disabled",true);
    
	var target , datas;
	
    if( $register == 1 )
        target = $("#registerForm");
    else if( $register == 2 )
        target = $("#teacherForm");
    else if( $register == 3 )
        target = $("#othersForm");
    else{
        location.href = "register";
    } 
    
	datas = target.serialize() + "&type=" + $register;
    var login = "#loginMessage" + $register;
    $.post( "registerAjax", datas, function(json) {
        
        $.each( json.data, function() {
            if ( this['status'] == "fail" ) {
                $("#registerBtn").attr("disabled",false);
                $(login).empty();
                $(login).html( this['message'] );
            }
            else if ( this['status'] == "success" ) {
                $("#registerBack").hide();
                $(".registerLaw").empty();
                target.empty();
                target.html( this['message'] );
            }
        } );
        
    }, "json" );
}

function setDepartment( $value ) 
{
    department = $value;
    $("#back").attr( "href", "#slide-3" );
    
    // Web
    
    var general = '<a href="#searching" onclick="departmentSearch(6)">全年級</a>';
    var total = '<a href="#searching" onclick="departmentSearch(1)">一年級</a><a href="#searching" onclick="departmentSearch(2)">二年級</a><a href="#searching" onclick="departmentSearch(3)">三年級</a><a href="#searching" onclick="departmentSearch(4)">四年級</a><a href="#searching" onclick="departmentSearch(5)">研究所</a><a href="#searching" onclick="departmentSearch(6)">全年級</a>';
    
    if ( ($value >= 0 && $value <= 4) || ($value >= 6 && $value <= 17) ) {
        // General Class
        $("#gradeContent").empty();
        $("#gradeContent").html( general );
    }
    else if ( $value == 22 || $value == 25 || $value == 30 || $value == 31 || $value == 36 || $value == 40 || $value == 41 || $value == 43 || $value == 44 || $value == 45 || $value == 47 || $value == 48 || ($value >= 53 && $value <= 59) ) {
        // Master
        $("#gradeContent").empty();
        $("#gradeContent").html( general );   
    }
    else {
        $("#gradeContent").empty();
        $("#gradeContent").html( total ); 
    }
    
    // Mobile
    $("#four").css( "visibility", "visible" );
    $("#one").parent().append(fourUI);
    oneUI = $("#one");
    $("#one").remove();
}

function returnLastPage() 
{
    location.href = document.referrer;
}

function mMemberAjax() 
{
    var data = $("#memberForm").serialize();
    
    $.post( "memberUpdateAjax", data, function(json) {
        
        $.each( json.data, function() {
            if ( this['status'] == "fail" ) {
                alert(this['message']);
                $("#loginMessage").empty();
                $("#loginMessage").html( this['message'] );
            }
            else if ( this['status'] == "login" ) {
                
            }
            else if ( this['status'] == "success" ) {
                location.href= "mmember";
            }
        } );
    }, "json" );
}

function memberAjax() 
{
    var data = $("#memberForm").serialize();
    $.post( "memberUpdateAjax", data, function(json) {

        $.each( json.data, function() {
            if ( this['status'] == "fail" ) {
                $("#loginMessage").empty();
                $("#loginMessage").html( this['message'] );
            }
            else if ( this['status'] == "login" ) {
                alert(this['message']);
                location.href = "loginView";
            }
            else if ( this['status'] == "success" ) {
                location.reload();
                alert("更新成功!");
            }
        } );
    }, "json" );
}

function commentJudge ( $course, $comment, $option ) 
{
    var data = "id=" + $course + "&comment=" + $comment + "&option=" + $option;

    $.post( "loveAjax", data, function(json) {
        $.each( json.data, function() {
            if ( this['status'] == "fail" ) {
                alert(this['message']);
            }
            else if ( this['status'] == "login" ) {
                alert(this['message']);
            }
            else if ( this['status'] == "success" ) {
                if ( $option == 1 ) {
                    var count = document.getElementById('loveArea'+$comment).innerHTML;
                    $("#loveArea" + $comment).empty();
                    $("#loveArea" + $comment).html( (parseInt( count, 10 ) + 1) );
                }
                else {
                    var count = document.getElementById('dislikeArea'+$comment).innerHTML;
                    $("#dislikeArea" + $comment).empty();
                    $("#dislikeArea" + $comment).html( (parseInt( count, 10 ) + 1) );
                }
            }
        } );
    }, "json" );
}

function favoriteAjax( $course ) 
{
    var data = "id=" + $course;
    
    $.post( "favoriteAjax", data, function(json) {
        
        $.each( json.data, function() {
            if( this['status'] == "fail" ) {
                alert(this['message']);
            }
            else if ( this['status'] == "success" ) {
                $("#courseArea"+$course).remove();
            }
        } );
        
    }, "json" );
}

function pinAjax( $course, $option ) 
{
    var data = "id=" + $course;
    var success = "<a href='#searching' class='glyphicon glyphicon-ok' onclick='pinAjax(" + $course + ", 0)'></a>";
    var cancel = "<a href='#searching' class='glyphicon glyphicon-pushpin' onclick='pinAjax(" + $course + ", 1)'></a>";
    
    $(this).html("<img src='../img/ajax-loader.gif' alt='loading...' />");
    
    if ( $option == 1 ) {
        $.post( "pinAjax", data, function(json) {

            $.each( json.data, function() {
                if ( this['status'] == "fail" ) {
                    alert(this['message']);
                }
                else if ( this['status'] == "hack" ) {
                    alert(this['message']);
                }
                else if ( this['status'] == "success" ) {
                    $("#pinArea"+$course).empty();
                    $("#pinArea"+$course).html( success );
                }
            } );
            
        }, "json" );
    }
    else if ( $option == 0 ) {
        $.post( "unPinAjax", data, function(json) {

            $.each( json.data, function() {
                if ( this['status'] == "fail" ) {
                    alert(this['message']);
                }
                else if ( this['status'] == "hack" ) {
                    alert(this['message']);
                }
                else if ( this['status'] == "success" ) {
                    $("#pinArea"+$course).empty();
                    $("#pinArea"+$course).html( cancel );
                }
            } );
            
        }, "json" );
    }

}

function mPinAjax( $course, $option ) 
{
    var data = "id=" + $course;
    var success = "PIN：<a href='#searching' class='glyphicon glyphicon-ok' onclick='mPinAjax(" + $course + ", 0)'></a>";
    var cancel = "PIN：<a href='#searching' class='glyphicon glyphicon-pushpin' onclick='mPinAjax(" + $course + ", 1)'></a>";
    
    $(this).html("<img src='../img/ajax-loader.gif' alt='loading...' />");
    
    if ( $option == 1 ) {
        $.post( "pinAjax", data, function(json) {

            $.each( json.data, function() {
                if ( this['status'] == "fail" ) {
                    alert(this['message']);
                }
                else if ( this['status'] == "hack" ) {
                    alert(this['message']);
                }
                else if ( this['status'] == "success" ) {
                    $("#pinArea"+$course).empty();
                    $("#pinArea"+$course).html( success );
                }
            } );
            
        }, "json" );
    }
    else if ( $option == 0 ) {
        $.post( "unPinAjax", data, function(json) {

            $.each( json.data, function() {
                if ( this['status'] == "fail" ) {
                    alert(this['message']);
                }
                else if ( this['status'] == "hack" ) {
                    alert(this['message']);
                }
                else if ( this['status'] == "success" ) {
                    $("#pinArea"+$course).empty();
                    $("#pinArea"+$course).html( cancel );
                }
            } );
            
        }, "json" );
    }

}

/* by Ding */
/* THIS SHOULD IMPROVE IN THE FUTURE !!!! */
function courseSearch( $num , $click )
{
    var course = $("#courseForm").serialize();
    var searchCourse = course.substr(11);
    if( searchCourse )
        saveCourse( searchCourse );
    
    var data = "courseName=" + $tmpCourse + "&num=" + $num + "&click=" + $click;
    
    $.post( "courseAjax", data, function(result) {
        $("#courseShow").empty();
        $("#courseShow").append( result );
        $("#courseInput").val('');
    location.href = "search#searching"; 

    });
    
        var update_th = $("th");
    var this_th = update_th.eq($num);
    var img_up = "<i class='glyphicon glyphicon-chevron-up'></i>";
    var img_down = "<i class='glyphicon glyphicon-chevron-down'></i>";
    
    $("th i").remove();
    
    
    if($click == 1){
        this_th.append(img_up);
        this_th.attr("onclick","courseSearch(" + $num + ",0)");
    }
    else if($click == 0){
        this_th.append(img_down);
        this_th.attr("onclick","courseSearch(" + $num + ",1)");
    }
    else{
        $("th").eq(4).append(img_down);
        for( i = 1 ; i <= 6 ; i++ ){
            $("th").eq(i).attr("onclick" ,"courseSearch(" + i + ",1)");
        }
    }
}

function saveCourse( searchCourse )
{
    $tmpCourse = searchCourse;
}

/* THIS SHOULD IMPROVE IN THE FUTURE !!!! */
function professorSearch(  $num , $click )
{
    var professor = $("#professorForm").serialize();
    var searchProfessor = professor.substr(14);
    if( searchProfessor )
        saveProfessor(searchProfessor);
    
    var data = "professorName=" + $tmpProfessor + "&num=" + $num + "&click=" + $click;
    
    $.post( "professorAjax", data, function(result) {
        $("#courseShow").empty();
        $("#courseShow").append( result );
        $("#professorInput").val('');
	location.href = "search#searching";
    
    } );
    
    var update_th = $("th");
    var this_th = update_th.eq($num);
    var img_up = "<i class='glyphicon glyphicon-chevron-up'></i>";
    var img_down = "<i class='glyphicon glyphicon-chevron-down'></i>";
    
    $("th i").remove();
    
    
    if($click == 1){
        this_th.append(img_up);
        this_th.attr("onclick","professorSearch(" + $num + ",0)");
    }
    else if($click == 0){
        this_th.append(img_down);
        this_th.attr("onclick","professorSearch(" + $num + ",1)");
    }
    else{
        $("th").eq(4).append(img_down);
        for( i = 1 ; i <= 6 ; i++ ){
            $("th").eq(i).attr("onclick" ,"professorSearch(" + i + ",1)");
        }
    }
}

function saveProfessor( searchProfessor )
{
    $tmpProfessor = searchProfessor;
}


function mDepartmentSearch( $grade ) 
{
    // Reset UI
    fourUI = $("four");
    $("#four").parent().append( oneUI );
    $("#four").remove();
    location.href = "mSearchResult?department=" + department + "&grade=" + $grade + "&type=3";
}

function departmentSearch( $grade , $num , $click )
{
    var i;
    var data = "department=" + department + "&grade=" + $grade + "&num=" + $num + "&click=" + $click;
 
    $.post( "departmentAjax", data, function(result) {
        $("#courseShow").empty();
        $("#courseShow").append( result );
    } );
    
    var update_th = $("th");
    var this_th = update_th.eq($num);
    var img_up = "<i class='glyphicon glyphicon-chevron-up'></i>";
    var img_down = "<i class='glyphicon glyphicon-chevron-down'></i>";
    
    $("th i").remove();
    
    
    if($click == 1){
        this_th.append(img_up);
        this_th.attr("onclick","departmentSearch(" + $grade + "," + $num + ",0)");
    }
    else if($click == 0){
        this_th.append(img_down);
        this_th.attr("onclick","departmentSearch(" + $grade + "," + $num + ",1)");
    }
    else{
        $("th").eq(4).append(img_down);
        for( i = 1 ; i <= 6 ; i++ ){
            $("th").eq(i).attr("onclick" ,"departmentSearch(" + $grade + "," + i + ",1)");
        }
    }
}

function courseJudgeAjax() 
{
    var data = $("#commentDetails").serialize();
    
    $.post( "judgeResult", data, function(json) {
        
        $.each( json.data, function() {
            if ( this['status'] == "fail" ) {
                $("#loginMessage").empty();
                $("#loginMessage").html( this['message'] );
            }
            else if ( this['status'] == "already" ) {
                alert(this['message']);
                location.href = "courseDetail?id=" + $("#course_id").val();
            }
            else if ( this['status'] == "login" ) {
                alert(this['message']);
                location.href = "courseDetail?id=" + $("#course_id").val();
            }
            else if ( this['status'] == "success" ) {
                alert(this['message']);
                location.href = "courseDetail?id=" + $("#course_id").val();
            }
        } );
        
    }, "json" );
}

function mCourseJudgeAjax() 
{
    var data = $("#commentDetails").serialize();
    
    $.post( "judgeResult", data, function(json) {
        
        $.each( json.data, function() {
            if ( this['status'] == "fail" ) {
                $("#loginMessage").empty();
                $("#loginMessage").html( this['message'] );
            }
            else if ( this['status'] == "already" ) {
                alert(this['message']);
                location.href = "mcourseDetail?id=" + $("#course_id").val();
            }
            else if ( this['status'] == "login" ) {
                alert(this['message']);
                location.href = "mcourseDetail?id=" + $("#course_id").val();
            }
            else if ( this['status'] == "success" ) {
                alert(this['message']);
                location.href = "mcourseDetail?id=" + $("#course_id").val();
            }
        } );
        
    }, "json" );
}

function backRemind() 
{
    $("#back").attr( "href", "#slide-main" );
}

/* by snowcookie */

function ranksearch()
{
	for( var number = 1 ; number <= 12 ; number++ ){
		rankAjax( number );
	}	
}

function rankAjax( $number )
{	
	var data = "rank_order=" + $number;
	$.post( "rankAjax" , data , function ( result ){
		$("table:nth-of-type("+$number+") tbody").append( result );
	} );
}

function resentmail( $id , $realname ){
    
    var message;
    message = "<p>sending mail</p>";
    $("#resent").empty();
    $("#resent").append(message);
	var data = "resent_id=" + $id + "&resent_real=" + $realname;
	$.post( "sentactivemail" , data , function( result ){
			$('#resent').empty();
			$('#resent').append( result );
	} );
}

function forgetAjax( $type ) 
{
    if( $type == 1 )
        target = $("#forgetForm");
    else if( $type == 2 )
        target = $("#teacherForm");
    else if( $type == 3 )
        target = $("#othersForm");
    else{
        location.href = "register";
    } 
    
	datas = target.serialize() + "&type=" + $type;
    var login = "#loginMessage" + $type;
    
    if( $type == 1){
        $("#sentPasswd").attr("disabled",true);
    
        $.post( "forgetAjax", datas, function(json) {
            
            $.each( json.data, function() {
                if ( this['status'] == "fail" ) {
                    $("#sentPasswd").attr("disabled",false);
                    $(login).empty();
                    $(login).html( this['message'] );
                }
                else if ( this['status'] == "success" ) {
                    $(target).empty();
                    $("#registerBack").hide();
                    $(target).html( this['message'] );
                }
            } );
            
        }, "json" );
    }
    else if( $type == 2 || $type == 3){
        alert(datas);
        $.post( "forgetOthersAjax", datas, function(json) {
            
            $.each( json.data, function() {
                if ( this['status'] == "fail" ) {
                    $("#sentPasswd").attr("disabled",false);
                    $(login).empty();
                    $(login).html( this['message'] );
                }
                else if ( this['status'] == "success" ) {
                    $(target).empty();
                    goResetPwd( this['email']);
                    $("#resetForm").show();
                    $("#registerBack").hide();
                }
            } );
            
        }, "json" );
    }
    else{
        location.href = "register";
    }
}

function goResetPwd( $email ){
    tmp_email = $email;
}

function resetOthers(){
    var data = $("#resetForm").serialize() + "&email=" + tmp_email;
    
    $.post( "resetOthersAjax", data, function(json) {
            $.each( json.data, function() {
                if ( this['status'] == "fail" ) {
                    $("#sentPasswd").attr("disabled",false);
                    $("#loginView").empty();
                    $("#loginView").html( this['message'] );
                }
                else if ( this['status'] == "success" ) {
                    alert("更改密碼成功!!");
                    location.href = "loginView";
                }
            } );
            
        }, "json" );
}
               
/* by yao-ming */

function goReset(){
	location.href = "resetPassword";
}

function resetPassword(){
	var data = $("#resetForm").serialize();

    $.post( "resetPasswordFunc", data, function(json) {
		$.each( json.data, function() {
            if ( this['status'] == "fail" ) {
                $("#loginMessage").empty();
                $("#loginMessage").html( this['message'] );
            }else if ( this['status'] == "login" ) {
                alert(this['message']);
                location.href = "loginView";
            }
            else if ( this['status'] == "success" ) {
                location.href = "logout";
            }
        } );
    } , "json" );
}

/* by ding */
function addToPK( courseID ){
    var data = "courseID=" + courseID;
    var btn = $("#PKbtn");
    $.post( "addToPK", data , function(json) {
        $.each( json, function(){
            alert( this['msg'] );
            console.log( this['status']);
            if( this['status'] === "notlogin"){

                location.href = "loginView";
            }
            else{
                btn.removeClass('btn-danger');
                btn.addClass('btn-warning');
                btn.attr('onclick','deleteFromPK(' + courseID + ')');
                btn.text('從P.K.列表中移除');
            }
        }); 
    } , "json");
}

function deleteFromPK( courseID ){
    var data = "courseID=" + courseID;
    var btn = $("#PKbtn");
    $.post( "deleteFromPK", data , function(json) {
        $.each( json, function(){
            alert( this['msg'] );
            btn.removeClass('btn-warning');
            btn.addClass('btn-danger');
            btn.attr('onclick','addToPK(' + courseID + ')');
            btn.text('新增至P.K.列表中');
        });
    } , "json");
}

function deleteFromPKonPage( courseID ){
    var data = "courseID=" + courseID;
    var btn = $("#PKbtn");
    $.post( "deleteFromPK", data , function(json) {
        $.each( json, function(){
            alert( this['msg'] );
            if( this['status'] === 'success'){
                if( this['empty'] === true ){
                    $('table').remove();
                    $('#errors').html('<h3>目前並沒有任何課程存於列表中，快去<a href="search#slide-main">評鑑系統</a>中挑選吧！</h3>');
                }
                else{
                    $('.' + courseID).remove();
                }
            }
            else
                location.reload();
        });
    } , "json");
}

/* moving page */

var url = document.URL;

if( ( url.match('140.117.202.154') || url.match('studio.cdpa.tw') ) && url.match('moving') == null ){
	location.href = "http://140.117.202.154/moving";
}