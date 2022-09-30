module.exports.ageCalculator = function (fecha_nacimiento) {  
    
    var dob = new Date(fecha_nacimiento);  

    //extract the year, month, and date from user date input  
    var dobYear = dob.getYear();  
    var dobMonth = dob.getMonth();  
    var dobDate = dob.getDate();  
      
    //get the current date from the system  
    var now = new Date();  
    //extract the year, month, and date from current date  
    var currentYear = now.getYear();  
    var currentMonth = now.getMonth();  
    var currentDate = now.getDate();  
      
    //declare a variable to collect the age in year, month, and days  
    var age = {};  
    var ageString = "";  
    
    //get years  
    var yearAge = currentYear - dobYear;  
      
    //get months  
    var monthAge = 0
    if (currentMonth >= dobMonth)  
        //get months when current month is greater  
        monthAge = currentMonth - dobMonth;  
    else {  
        yearAge--;  
        monthAge = 12 + currentMonth - dobMonth;  
    }  
    var dateAge = 0
    //get days  
    if (currentDate >= dobDate)  
        //get days when the current date is greater  
        dateAge = currentDate - dobDate;  
    else {  
        monthAge--;  
        dateAge = 31 + currentDate - dobDate;  
  
        if (monthAge < 0) {  
            monthAge = 11;  
            yearAge--;  
        }  
    }  
    //group the age in a single variable  
    age = {  
        years: yearAge,  
        months: monthAge,  
        days: dateAge  
    };  
        
        
    if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )  
        ageageString = age.years + " years, " + age.months + " months, and " + age.days + " days old.";  
    else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )  
        ageString = "Only " + age.days + " days old!";  
        //when current month and date is same as birth date and month  
    else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )  
        ageageString = age.years +  " years old. Happy Birthday!!";  
    else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )  
        ageageString = age.years + " years and " + age.months + " months old.";  
    else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )  
        ageageString = age.months + " months and " + age.days + " days old.";  
    else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )  
        ageageString = age.years + " years, and" + age.days + " days old.";  
    else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )  
        ageageString = age.months + " months old.";  
        //when current date is same as dob(date of birth)  
    else ageString = "Welcome to Earth! <br> It's first day on Earth!";   
  
    //display the calculated age  
    return document.getElementById("result").innerHTML = ageString;   
               
    
}  