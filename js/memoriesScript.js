$(function(){
				var numToMonth={}
				numToMonth["01"] = "January";
				numToMonth["02"] = "February";
				numToMonth["03"] = "March";
				numToMonth["04"] = "April";
				numToMonth["05"] = "May";
				numToMonth["06"] = "June";
				numToMonth["07"] = "July";
				numToMonth["08"] = "August";
				numToMonth["09"] = "September";
				numToMonth["10"] = "October";
				numToMonth["11"] = "November";
				numToMonth["12"] = "December";

				var monthToNum={}
				monthToNum["January"] = "01";
				monthToNum["February"] = "02";
				monthToNum["March"] = "03";
				monthToNum["April"] = "04";
				monthToNum["May"] = "05";
				monthToNum["June"] = "06";
				monthToNum["July"] = "07";
				monthToNum["August"] = "08";
				monthToNum["September"] = "09";
				monthToNum["Ocotber"] = "10";
				monthToNum["November"] = "11";
				monthToNum["December"] = "12";

				$('.date').datepicker({});
				$('#new-entry').hide();
				$('#entry-block').hide();
				$('#invalid-date').hide();

				$('#addEntry').click(function(){
					$(this).hide(400);
					$('#new-entry').show(400);
				});

				$('.imageFile').change(function(){
					var filename = this.files[0].name;
					if(filename.length > 18)
						filename = filename.substr(0, 15) + "...";
					$(this).parent().find(".uploadStatus").html("<strong>"+filename+"</strong>. Change file?");
				});

				//New memory input
				$('#new-entry-form').submit(function(){
					var hr = $('<hr />');
					var x =$("#entry-block").clone(true,true);		
					hr.appendTo("#entries");
					x.appendTo("#entries");
					x.show(400);
					

					xText = x.find("#entry-text")
					xText.html(($(this).find("#new-entry-text")).val());

					date = ($(this).find("#new-entry-date")).val();
					dateInFormat = new Date(date);
					if(dateInFormat == "Invalid Date"){
						x.remove();
						hr.remove();
						$('#invalid-date').show();

						return false;
					}

					var fileUploadButton = $(this).find('.imageFile');
					if(fileUploadButton.val()){
						var image = fileUploadButton[0].files[0];
						var reader = new FileReader();
						reader.onload = function(e){
							x.find('.thumbnail img').attr("src", e.target.result);
						};
						//console.log(reader.readAsDataUrl);
						reader.readAsDataURL(image);
					}

					month = date.substring(0,2);
					day = date.substring(3,5);
					year = date.substring(6,10);
					subscript = "th"
					if (day=="01" || day=="21" || day=="31"){
						subscript = "st"
					}
					else if( day=="02" || day == "22"){
						subscript = "2nd"
					}
					else if( day=="03" || day =="23"){
						subscript= "rd"
					}



					xMonth = x.find("#month");
					xMonth.html(numToMonth[month]);
					xDay = x.find("#day");
					xDay.html(day);
					xYear = x.find("#year");
					xYear.html(year);
					xSubscript = x.find("#subscript");
					xSubscript.html(subscript)
					
					$('#new-entry').hide(400);
					$('#addEntry').show(400);
					$('#invalid-date').hide();
					document.getElementById("new-entry-form").reset();



					return false;
				});


				//Memory Erase buttons
				$('.delete-btn').click(function(){
					$(this.parentElement.parentElement.parentElement).hide(function(){
						$($(this).prev()).remove();
						$(this).remove();
					});
						
				});

				//Memory Edit button

				$('#edit-btn').click(function(){
					x = $(this.parentElement.parentElement.parentElement)
					//deletes the <hr> element 
					$(x.prev()).remove();
					xMonth = (x.find("#month")).text();
					xYear = (x.find("#year")).text();
					xDay = (x.find("#day")).text();
					xText = (x.find("#entry-text")).text();


					$("#new-entry-date").val(monthToNum[xMonth]+"/"+xDay+"/"+xYear);
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

