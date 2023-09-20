const mainBody = document.querySelector('body');
const mainCalendar = document.querySelector('#load-main-calendar');

let loadingSymbol = document.createElement('div');
loadingSymbol.setAttribute('class', 'basic-loader-wrapper');
loadingSymbol.innerHTML += '<div class="basic-loader"></div>';

// let loadingSymbol = document.createElement('div');
// loadingSymbol.setAttribute('class', 'basic-loader');

if( mainCalendar ){

    let date = new Date();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    var day = String(date.getDate()).padStart(2, '0');
    var formattedDate = `${year}-${month}-${day}`;

    function loadMainCalendar(month, year){

        // mainBody.appendChild(loadingSymbol);

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
                    // mainBody.removeChild(loadingSymbol);

                    var calendarContainer = document.createElement('div');
                    calendarContainer.setAttribute('class', 'calendar');

                    var calendarHeader = document.createElement('div');
                    calendarHeader.setAttribute('class', 'calendar-header');
                    calendarHeader.innerHTML += '<div>\
                    <a class="main-pg-btn" id="prev-month-btn" href="#">&#10094;</a>\
                    </div>';
                    calendarHeader.innerHTML += '<div class="header-title">'+ numberToMonthName(month) +' '+year+'</div>';
                    calendarHeader.innerHTML += '<div class="align-right">\
                    <a class="main-pg-btn" id="next-month-btn" href="#">&#10095;</a>\
                    </div>';

                    var weekdaysHeader = document.createElement('div');
                    weekdaysHeader.setAttribute('class', 'weekdays');

                    calendarContainer.appendChild(calendarHeader);
                    calendarContainer.appendChild(weekdaysHeader);

                    var weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                    weekdays.forEach(function(w){
                        weekdaysHeader.innerHTML += '<div class="calendar-header-day">'+w+'</div>';
                    });

                    var days = document.createElement('div');
                    days.setAttribute('class', 'days fade-in-results');

                    if( response['first'] > 0 ){
                        for( var i = 0; i < response['first']; i++ ){
                            days.innerHTML += '<div class="blank"></div>';
                        }
                    }

                    response['main'].forEach(function(d){
                        
                        var dayNumber = d.substr(-2); 
                        var calendarDay = document.createElement('div');
                        calendarDay.setAttribute('class', 'calendar-day');
                        calendarDay.setAttribute('data-date', d);

                        if( formattedDate == d ){
                            calendarDay.setAttribute('class', 'calendar-day current-day');
                        }

                        if( formattedDate > d ){
                            calendarDay.setAttribute('class', 'past-day');
                        }

                        calendarDay.innerHTML += '<p class="mb-20">'+dayNumber+'</p>';
                        days.appendChild(calendarDay);

                    });

                    calendarContainer.appendChild(days);
                    mainCalendar.appendChild(calendarContainer);

                    // Load current day
                    response['main'].forEach(function(d){
                        
                        var currentDay = document.createElement('div');
                        currentDay.setAttribute('class', 'current-day-schedule');

                        if( formattedDate == d ){
                            currentDay.innerHTML += '<p class="mb-10">'+ numericDateToWordedDate(formattedDate) +'</p>\
                            <hr>';
                            document.querySelector('.calendar').appendChild(currentDay);
                        }

                    });

                    calendarNavigation();
                    chosenDate();

                }, 350);

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

    function chosenDate(){

        let calendarDays = document.querySelectorAll('.calendar-day');

        calendarDays.forEach(function(d){

            d.addEventListener('click', function(e){
                
                e.preventDefault();

                calendarDays.forEach(function(d){
                    d.classList.remove('current-day');
                });
                
                let currentSchedule = document.querySelector('.current-day-schedule');
                let currentDate = this.dataset.date;
                
                if( currentSchedule ){

                    this.classList.add('current-day');
                    currentSchedule.textContent = '';
                    currentSchedule.innerHTML += '<p class="mb-10">'+ numericDateToWordedDate(this.dataset.date) +'</p>\
                    <hr>';

                } else {

                    var currentDay = document.createElement('div');
                    currentDay.setAttribute('class', 'current-day-schedule');
                    currentDay.innerHTML += '<p class="mb-10">'+ numericDateToWordedDate(currentDate) +'</p>\
                    <hr>';
                    document.querySelector('.calendar').appendChild(currentDay);
                    this.classList.add('current-day');

                }

            });

        });

    }

    function numericDateToWordedDate(dateStr) {

        const days = [
          'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];

        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
      
        const numericDate = new Date(dateStr);
      
        if (isNaN(numericDate)) {
          return 'Invalid date';
        }
      
        // Extract day, month, and year components
        const day = days[numericDate.getDay()];
        const month = months[numericDate.getMonth()];
        const year = numericDate.getFullYear();
      
        // Construct the worded date
        const wordedDate = `${day}, ${numericDate.getDate()} ${month} ${year}`;
      
        return wordedDate;

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

    calendarNavigation();
    chosenDate();

}