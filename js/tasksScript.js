$(function(){
				$('.date').datepicker({});
				$('#new-entry').hide();
				$('#entry-block').hide();

				$('#addEntry').click(function(){
					$(this).hide(400);
					$('#new-entry').show(400);
				});

				//New task input
				$('#new-entry-form').submit(function(){
					var hr = $('<hr />');
					var x =$("#entry-block").clone(true,true);		
					hr.appendTo("#entries");
					x.appendTo("#entries");
					x.show(400);

					xText = x.find("#entry-text")
					xText.html(($(this).find("#new-entry-text")).val());

					console.log(($(this).find("#new-entry-text")).val());

					$('#new-entry').hide(400);
					$('#addEntry').show(400);
					$("#new-entry-text").html("");
					document.getElementById("new-entry-form").reset();
					return false;
				});

				//Task Erase buttons
				$('#delete-btn').click(function(){
					x = $(this.parentElement.parentElement)
					//deletes the <hr> element 
					$(x.prev()).remove();
					x.remove();
				});

				//Task Check buttons
				$('#check-btn').click(function(){
					x = $(this.parentElement.parentElement).find("#entry-text");
					if(x.css("text-decoration")=="line-through"){
						x.css("text-decoration","none");
					}else{
						x.css("text-decoration", "line-through");
					}	
				});

				//Task Edit button
				$('#edit-btn').click(function(){
					x = $(this.parentElement.parentElement)
					//deletes the <hr> element 
					$(x.prev()).remove();
					xText = (x.find("#entry-text")).text();

					$("#new-entry-text").html(xText);

					$(x).hide(function(){
						$(this).remove();
					});

					$('#addEntry').hide(400);
					$('#new-entry').show(400);

				});

				//Loging out takes you to the login page
				$('#logout').click(function(){
					window.location.href = "login.html";
				});
			});
