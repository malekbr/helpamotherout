function append_before(date) {
	var entries = $('#entries').children('.entry-block').toArray();
	for(var entryIndex in entries){
		var entry = $(entries[entryIndex]);
		var entryDate = entry.attr("data-date");
		if(date<entryDate)
			return entry;
	}
	return undefined;
}
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
				$('#new-entry-time').timepicker({defaultTime:false});
				$('#new-entry').hide();
				$('#entry-block').hide();
				$('#invalid-date').hide();

				$('#addEntry').click(function(){
					$(this).hide(400);
					$('#new-entry').show(400);
				});


				$('#email-popover').popover();
				$('#sms-popover').popover();

				//New appointment input
				$('#new-entry-form').submit(function(){
					var hr = $('<hr />');
					var x =$("#entry-block").clone(true,true);
					x.attr("id", "");
					x.addClass("entry-block");	
					x.show(400);

					if ($("#new-entry-email").prop('checked')){
						console.log("hob")
						$(x.find("#envelope-gylph")).css('display','inline');
						$(x.find("#remind-by-email")).prop('checked',true);
					}
					else{
						console.log("not hob");
						$(x.find("#envelope-gylph")).css('display','none');
						$(x.find("#remind-by-email")).prop('checked',false);
					}

					if ($("#new-entry-sms").prop('checked')){
						console.log("7amada")
						$(x.find("#sms-gylph")).css('display','inline');
						$(x.find("#remind-by-sms")).prop('checked',true);
					}
					else{

						$(x.find("#sms-gylph")).css('display','none');
						$(x.find("#remind-by-sms")).prop('checked',false);
					}

					xText = x.find("#entry-text")
					xText.html(($(this).find("#new-entry-text")).val());

					console.log(($(this).find("#new-entry-text")).val());

					var time = $(this).find("#new-entry-time").val();

					date = ($(this).find("#new-entry-date")).val();
					dateInFormat = new Date(date);
					if(dateInFormat == "Invalid Date" || time.trim().length == 0){
						x.remove();
						hr.remove();
						$('#invalid-date').show();

						return false;
					}
					month = date.substring(0,2);
					day = date.substring(3,5);
					year = date.substring(6,10);

					timeperiod = time.substring(6,8);
					hour = time.substring(0,2);
					minute = time.substring(3,5);
					if(hour == "12")
						hour = "00";

					var appointmentDay = parseInt(year+month+day, 10);
					var today = new Date();
					today = today.getFullYear()*10000 + (today.getMonth()+1)*100 + today.getDate();

					var dateAttr = year+month+day+timeperiod+hour+minute;
					x.attr("data-date", dateAttr);
					if (append_before(dateAttr) == undefined) {
						hr.appendTo("#entries");
						x.appendTo("#entries");
					} else {
						append_before(dateAttr).before(x);
						append_before(dateAttr).before(hr);
					}

					switch(appointmentDay - today){
					case 0:
						x.find("#dateDescription").text('Today');
						break;
					case 1:
						x.find("#dateDescription").text('Tomorrow');
						break;

					default:
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
						xSubscript.html(subscript);

					}

					x.find("#time").text(time);
					
					$('#new-entry').hide(400);
					$('#addEntry').show(400);
					$('#invalid-date').hide();
					$("#new-entry-text").html("");
					document.getElementById("new-entry-form").reset();
					return false;
				});


				//Appointment Erase buttons
				$('#delete-btn').click(function(){
					$(this.parentElement.parentElement.parentElement.parentElement).hide(function(){
						$($(this).prev()).remove();
						$(this).remove();
					});
						
				});

				//Appointment Edit button

				$('#edit-btn').click(function(){
					x = $(this.parentElement.parentElement.parentElement.parentElement)
					//deletes the <hr> element 
					$(x.prev()).remove();
					var dateOfEntry = x.attr('data-date');
					console.log(dateOfEntry);
					xYear = dateOfEntry.substring(0,4);//(x.find("#month")).text();
					xMonth = dateOfEntry.substring(4,6);//(x.find("#year")).text();
					xDay = dateOfEntry.substring(6,8);//(x.find("#day")).text();
					xText = (x.find("#entry-text")).text();
					xPeriod = dateOfEntry.substring(8, 10);
					xHour = dateOfEntry.substring(10, 12);
					xMinute = dateOfEntry.substring(12, 14);

					if(xHour == "00")
						xHour = "12";

					if((x.find("#remind-by-email")).prop("checked")){
						$("#new-entry-email").prop("checked",true);
					}
					
					if((x.find("#remind-by-sms")).prop("checked")){
						$("#new-entry-sms").prop("checked",true);
					}


					$("#new-entry-date").val(xMonth+"/"+xDay+"/"+xYear);
					$("#new-entry-text").html(xText);
					$("#new-entry-time").val(xHour + ":" + xMinute + " " +xPeriod);


					$(x).hide(function(){
						$(this).remove();
					});

					$('#addEntry').hide(400);
					$('#new-entry').show(400);

				});

				$('#delete-appointment').click(function(){
					$('#app-today1').hide(400)
				});

				//Loging out takes you to the login page
				$('#logout').click(function(){
					window.location.href = "login.html";
				});
			});
