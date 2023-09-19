const mainCalendar = document.querySelector('#load-main-calendar');

let loadingSymbol = document.createElement('div');
loadingSymbol.setAttribute('class', 'basic-loader-wrapper');
loadingSymbol.innerHTML += '<div class="basic-loader"></div>';

if( mainCalendar ){

    let date = new Date();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    var day = String(date.getDate()).padStart(2, '0');
    var formattedDate = `${year}-${month}-${day}`;

    function loadMainCalendar(month, year){

        mainCalendar.appendChild(loadingSymbol);

        fetch('ajax/calendar.php', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                request: 'buildCalendar',
                month: month,
                year: year
            })
            }).then((res) => res.json())
            .then(response => {

                setTimeout(function(){
                
                    mainCalendar.textContent = '';

                    var calendarContainer = document.createElement('div');
                    calendarContainer.setAttribute('class', 'calendar');

                    var calendarHeader = document.createElement('div');
                    calendarHeader.setAttribute('class', 'calendar-header');
                    calendarHeader.innerHTML += '<span class="mr-15"><i class="fa-regular fa-calendar-days"></i></span>'+ numberToMonthName(month) +' '+year;

                    var weekdaysHeader = document.createElement('div');
                    weekdaysHeader.setAttribute('class', 'weekdays');

                    calendarContainer.appendChild(calendarHeader);
                    calendarContainer.appendChild(weekdaysHeader);

                    var weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                    weekdays.forEach(function(w){
                        weekdaysHeader.innerHTML += '<div class="calendar-header-day">'+w+'</div>';
                    });

                    var days = document.createElement('div');
                    days.setAttribute('class', 'days');

                    var days = document.createElement('div');
                    days.setAttribute('class', 'days');

                    if( response['first'] > 0 ){
                        for( var i = 0; i < response['first']; i++ ){
                            days.innerHTML += '<div class="blank"></div>';
                        }
                    }

                    response['main'].forEach(function(d){
                        
                        var dayNumber = d.substr(-2); 
                        var calendarDay = document.createElement('div');
                        calendarDay.setAttribute('data-date', d);

                        if( formattedDate == d ){
                            calendarDay.setAttribute('class', 'current-day');
                        }

                        calendarDay.innerHTML += '<p class="mb-20">'+dayNumber+'</p>';
                        days.appendChild(calendarDay);

                    });

                    calendarContainer.appendChild(days);
                    mainCalendar.appendChild(calendarContainer);

                    // Navigation 
                    var calendarNav = document.createElement('div');
                    calendarNav.setAttribute('class', 'mt-20');
                    calendarNav.setAttribute('class', 'calendar-nav');
                    calendarNav.setAttribute('id', 'calendar-nav');

                    calendarNav.innerHTML += '<a class="main-pg-btn mr-15" id="prev-month-btn" href="#">Previous</a>';
                    calendarNav.innerHTML += '<a class="main-pg-btn" id="next-month-btn" href="#">Next</a>';

                    mainCalendar.appendChild(calendarNav);
                    calendarNavigation();

                }, 650);

            })
        .catch(
            error => console.log(error)
        );

    }

    function calendarNavigation(){

        var prevBtn = document.getElementById('prev-month-btn');
        var nextBtn = document.getElementById('next-month-btn');

        if( prevBtn ){

            prevBtn.addEventListener('click', function(e){
                e.preventDefault();
                month = Number(month) - 1;
                if( month == 0 ){
                    month = 12;
                    year = Number(year) - 1;
                }
                loadMainCalendar(month, year);
            });

        }

        if( nextBtn ){

            nextBtn.addEventListener('click', function(e){
                e.preventDefault();
                month = Number(month) + 1;
                if( month == 13 ){
                    month = 1;
                    year = Number(year) + 1;
                }
                loadMainCalendar(month, year);
            });

        }

    }

    function numberToMonthName(number) {
        
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
      
        if (number >= 1 && number <= 12) {
          return monthNames[number - 1];
        } else {
          throw new Error("Invalid month number. Month number should be between 1 and 12.");
        }

    }

    loadMainCalendar(month, year);

}