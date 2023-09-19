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
                    echo '<span class="mr-15"><i class="fa-regular fa-calendar-days"></i></span>'.date('F').' '.date('Y').'';
                  echo '</div>';
                  echo '<div class="weekdays">';

                    foreach($weekdays as $w)
                    {
                      echo '<div class="calendar-header-day">'.$w.'</div>';
                    }

                  echo '</div>';
                  echo '<div class="days">';

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
                          echo '<div class="current-day"><p>'.date('d', strtotime($f)).'</p></div>';
                        } 
                        else 
                        {
                          echo '<div><p>'.date('d', strtotime($f)).'</p></div>';
                        }
                      }

                  echo '</div>';
                  echo '<div class="calendar-nav mt-20" id="calendar-nav">';
                      echo '<a class="main-pg-btn mr-15" id="prev-month-btn" href="#">Previous</a>';
                      echo '<a class="main-pg-btn" id="next-month-btn" href="#">Next</a>';
                  echo '</div>';
                echo '</div>';
                
              ?>
            </div>
          </section>
        </main>
        <footer>
        </footer>
    </body>
</html>