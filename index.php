<?php include 'functions/functions.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calendar</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script defer src="js/app.js"></script>
    </head>
    <body>
        <header>
            <nav>
            </nav>
        </header>
        <main>
          <section class="main-content">
            <div class="main-calender" id="load-main-calendar">
              <?php
                
                $dates = buildCalendar((object)['month' => date('m'), 'year' => date('Y')]);
                $weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

                echo '<div class="calendar">';
                  echo '<div class="calendar-header">';
                    echo '<div>';
                      echo '<a class="main-pg-btn" id="prev-month-btn" href="#">&#10094;</a>';
                    echo '</div>';
                    echo '<div class="header-title">'.date('F').' '.date('Y').'</div>';
                    echo '<div class="align-right">';
                      echo '<a class="main-pg-btn" id="next-month-btn" href="#">&#10095;</a>';
                    echo '</div>';
                  echo '</div>';
                  echo '<div class="weekdays">';

                    foreach($weekdays as $w)
                    {
                      echo '<div class="calendar-header-day">'.$w.'</div>';
                    }

                  echo '</div>';
                  echo '<div class="days fade-in-results">';

                      if(!empty($dates['first']))
                      {
                        for( $i = 0; $i < $dates['first']; $i++ ){
                          echo '<div class="blank"></div>';
                        }
                      }

                      foreach($dates['main'] as $f)
                      { 
                        if( $f == date('Y-m-d') )
                        {
                          echo '<div class="calendar-day current-day" data-date="'.$f.'"><p>'.date('d', strtotime($f)).'</p></div>';
                        }
                        else if( date('Y-m-d') > $f ){
                          echo '<div class="past-day" data-date="'.$f.'"><p>'.date('d', strtotime($f)).'</p></div>';
                        } 
                        else 
                        {
                          echo '<div class="calendar-day" data-date="'.$f.'"><p>'.date('d', strtotime($f)).'</p></div>';
                        }
                      }

                  echo '</div>';
                  
                  // Current day - schedule
                  foreach($dates['main'] as $f)
                  {
                    if( $f == date('Y-m-d') )
                    {
                      echo '<div class="current-day-schedule">';
                        echo '<p class="mb-10">'.date('l, j F Y', strtotime($f)).'</p>';
                        echo '<hr class="mb-10">';
                        // echo '<label class="date-label" for="chosen-time">Time (<span class="blue-txt">*</span>)</label>';
                        // echo '<select id="chosen-time" class="chosen-time" name="time">';
                        //   echo '<option value="">-- Select a time --</option>';
                        //   echo '<option value="09:00">09:00</option>';
                        //   echo '<option value="10:00">10:00</option>';
                        //   echo '<option value="11:00">11:00</option>';
                        //   echo '<option value="12:00">12:00</option>';
                        //   echo '<option value="13:00">13:00</option>';
                        //   echo '<option value="14:00">14:00</option>';
                        //   echo '<option value="15:00">15:00</option>';
                        //   echo '<option value="16:00">16:00</option>';
                        // echo '</select>';
                        // echo '<label class="date-label" for="notes">Notes (optional)</label>';
                        // echo '<textarea class="booking-notes" id="notes" placeholder="Enter notes here"></textarea>';
                      echo '</div>';
                    }
                  }
                  
                echo '</div>';
                
              ?>
            </div>
          </section>
        </main>
        <footer>
        </footer>
    </body>
</html>